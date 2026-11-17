# CADViewer Conversion Server — Source Token Security Documentation

## 1. Overview

Source Token Security provides signed URL access control and expiration enforcement for CAD drawings, SVG content streams, and PDF generation.

When enabled (`requireSourceToken: true`), incoming drawing requests must present an unexpired Unix timestamp and an HMAC-SHA256 signature generated with a shared secret (`sourceSystemSharedSecret`). Requests with missing, expired, or invalid signatures are rejected before any drawing conversion or file read occurs.

When disabled (`requireSourceToken: false`), the server retains its standard behavior without requiring source tokens.

---

## 2. Configuration Settings

Settings can be specified in `CADViewer_config.json` or overridden via environment variables.

### `CADViewer_config.json`
```json
{
  "folderLocation": "/nodejs/cadviewer-conversion-server-nextgen/content",
  "requireSourceToken": false,
  "sourceSystemSharedSecret": "your-secure-shared-secret-key"
}
```

### Configuration Settings
| Setting / Variable | Type | Default | Description |
|---|---|---|---|
| `folderLocation` | String | `"/nodejs/cadviewer-conversion-server-nextgen/content"` | Absolute physical root directory on the server where drawing content resides. |
| `requireSourceToken` / `CADVIEWER_REQUIRE_SOURCE_TOKEN` | Boolean (`true`/`false`) | `false` | Enables or disables mandatory source token validation on drawing/conversion endpoints. |
| `sourceSystemSharedSecret` / `CADVIEWER_SOURCE_SYSTEM_SHARED_SECRET` | String | `""` | The shared secret key used to generate and verify HMAC-SHA256 signatures. Kept strictly on the backend and authorization system. |

---

## 3. Protected Endpoints

When `requireSourceToken` is enabled, the following routes validate the signature and expiration:

| Route | HTTP Methods | Purpose |
|---|---|---|
| `/callapiconversion` | `POST`, `GET` | Initiates AutoXChange drawing-to-SVG conversion. |
| `/loadfile` | `POST`, `GET` | Loads converted drawing assets and SVG streams. |
| `/getcadviewercontent` | `GET` | Retrieves cached converted drawing content. |
| `/makesinglepagepdf` | `POST` | Generates single-page and multi-page vector PDF exports. |

---

## 4. How Source Token Verification Works

### 4.1. Expiration Validation
* The expiration value must be a valid Unix epoch timestamp in **seconds** (10 digits) or **milliseconds** (13 digits).
* Millisecond timestamps are automatically normalized to seconds.
* If `currentTimeInSeconds > expires`, the server rejects the request with HTTP **`401 Unauthorized`**:
  ```json
  { "error": "Source token has expired" }
  ```

### 4.2. Signature Verification
* The signature is verified using **HMAC-SHA256** with `sourceSystemSharedSecret`.
* Timing-attack-safe comparison (`crypto.timingSafeEqual`) is used to prevent side-channel timing analysis.
* The message payload signed is:
  ```
  <drawing>:<expires>
  ```
  *(Alternative delimiters `<drawing>|<expires>` and query string format `drawing=<drawing>&expires=<expires>` are also supported).*
* Both the full filename (e.g. `S949-1.dwg`) and the basename without extension (e.g. `S949-1`) are validated.
* The signature can be passed in **hex** (64 hex characters), **base64**, or **base64url** format.
* If the signature does not match or is malformed, the server returns HTTP **`403 Forbidden`**:
  ```json
  { "error": "Invalid source token signature" }
  ```

### 4.3. Drawing Path Matching
* The requested drawing is extracted from the URL, request body, or `fileName` parameter.
* The filename requested must match the authorized drawing in the signature. If a token signed for `S949-1.dwg` is re-used to request `S601-1.dwg`, the server returns HTTP **`403 Forbidden`**:
  ```json
  { "error": "Drawing mismatch with authorized source token" }
  ```

---

## 5. Credential Transmission

Credentials can be passed via HTTP request headers (standard for frontend AJAX requests) or URL query parameters (for direct browser navigation/GET requests):

### HTTP Headers
```http
X-Source-Token: <signature>
X-Source-Expires: <unix-timestamp>
X-Source-Drawing: <drawing-name>   (optional)
```

### URL Query Parameters
```
?drawing_name=/svg/campus/S601-LP1.svg&expires=1794854048&token=c4a169b5fa08f2e4...
```
or for DWG:
```
?drawing_name=/dwg/S949-1.dwg&expires=1794854048&token=c4a169b5fa08f2e4...
```

> **Content Location Architecture**: In CADViewer, the final file location on the server filesystem is:
> $$\mathbf{Final\ Server\ File\ Location} = \mathbf{folderLocation} + \mathbf{serverSubFolder} + \mathbf{path} + \mathbf{file.ext}$$
> - `folderLocation`: configured in `CADViewer_config.json` (e.g. `"/nodejs/cadviewer-conversion-server-nextgen/content"`).
> - `serverSubFolder`: tenant subfolder (e.g. `"/custom/uic.edu/"` or `"/custom/your-organization.com/"`).
> - `path + file.ext`: passed in `drawing_name` (e.g. `/svg/campus/S601-LP1.svg`, `/dwg/S949-1.dwg`, or custom customer substructures).
> Pre-converted SVGs are served directly, while DWGs are dynamically converted.

### CORS Whitelist
The backend CORS configuration allows `X-Source-Token`, `X-Source-Expires`, and `X-Source-Drawing` and answers `OPTIONS` preflight requests with `204 No Content`.

---

## 6. Signature Generation Guide for Source Systems

The customer's source system or authorization portal generates signed URLs before redirecting users to CADViewer.

### Payload Specification
* **Drawing**: The relative drawing path or filename (e.g. `/svg/campus/S601-LP1.svg`, `/dwg/S949-1.dwg`, or `S949-1`).
* **Expires**: Unix epoch timestamp in seconds when the link should expire (e.g. `Date.now() / 1000 + 3600` for 1 hour).
* **Message String**: `${drawing}:${expires}`
* **HMAC Algorithm**: SHA-256
* **Key**: `sourceSystemSharedSecret`

---

### Implementation Examples

#### Node.js / JavaScript
```javascript
const crypto = require("crypto");

function createSignedCadViewerUrl({ baseUrl, drawingName, secret, ttlSeconds = 3600 }) {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `${drawingName}:${expires}`;
  
  const token = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `${baseUrl}?drawing_name=${encodeURIComponent(drawingName)}&expires=${expires}&token=${token}`;
}

// Example usage:
const signedUrl = createSignedCadViewerUrl({
  baseUrl: "https://cadviewer.ovcas.uic.edu/",
  drawingName: "S949-1.dwg",
  secret: process.env.SOURCE_SYSTEM_SHARED_SECRET,
  ttlSeconds: 7200 // 2 hours
});
```

#### Python 3
```python
import hmac
import hashlib
import time
import urllib.parse

def create_signed_cadviewer_url(base_url: str, drawing_name: str, secret: str, ttl_seconds: int = 3600) -> str:
    expires = int(time.time()) + ttl_seconds
    payload = f"{drawing_name}:{expires}".encode("utf-8")
    
    token = hmac.new(secret.encode("utf-8"), payload, hashlib.sha256).hexdigest()
    
    params = urllib.parse.urlencode({
        "drawing_name": drawing_name,
        "expires": expires,
        "token": token
    })
    return f"{base_url}?{params}"

# Example usage:
url = create_signed_cadviewer_url(
    base_url="https://cadviewer.ovcas.uic.edu/",
    drawing_name="S949-1.dwg",
    secret="your-secure-shared-secret-key",
    ttl_seconds=3600
)
```

#### C# / .NET
```csharp
using System;
using System.Security.Cryptography;
using System.Text;
using System.Web;

public static class CadViewerUrlSigner
{
    public static string CreateSignedUrl(string baseUrl, string drawingName, string secret, int ttlSeconds = 3600)
    {
        long expires = DateTimeOffset.UtcNow.ToUnixTimeSeconds() + ttlSeconds;
        string payload = $"{drawingName}:{expires}";

        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
        string token = BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();

        return $"{baseUrl}?drawing_name={HttpUtility.UrlEncode(drawingName)}&expires={expires}&token={token}";
    }
}
```

#### PHP
```php
<?php
function createSignedCadViewerUrl($baseUrl, $drawingName, $secret, $ttlSeconds = 3600) {
    $expires = time() + $ttlSeconds;
    $payload = "{$drawingName}:{$expires}";
    $token = hash_hmac('sha256', $payload, $secret);

    $query = http_build_query([
        'drawing_name' => $drawingName,
        'expires' => $expires,
        'token' => $token,
    ]);

    return "{$baseUrl}?{$query}";
}
?>
```

---

## 7. HTTP Status Codes & Error Responses

| Status Code | Reason | Example Response Body |
|---|---|---|
| `200 OK` | Valid signature and timestamp. Conversion/file access proceeds. | Normal file/conversion payload. |
| `401 Unauthorized` | Missing token or missing expiration timestamp. | `{"error": "Missing required source security token or expiration"}` |
| `401 Unauthorized` | Expiration timestamp has passed. | `{"error": "Source token has expired"}` |
| `403 Forbidden` | Signature verification failed against secret key. | `{"error": "Invalid source token signature"}` |
| `403 Forbidden` | Drawing name mismatch with authorized token. | `{"error": "Drawing mismatch with authorized source token"}` |
