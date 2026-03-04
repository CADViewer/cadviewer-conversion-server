# Azure Blob Storage — Flat File Navigation & Cache Structure

## Overview

Azure Blob Storage is a **flat key-value store** with no real folders. The `/` in blob names is purely a naming convention that simulates hierarchy. This document covers how to build a navigation structure and use a cache/temp layer within Blob Storage.

---

## Container Layout

```
Container: my-files
  ├── _index.json                     ← navigation manifest (root)
  ├── source/                         ← original source files (DWG, PDF, etc.)
  │     └── drawings/building-a.dwg
  ├── converted/                      ← permanent converted outputs
  │     └── drawings/building-a.svg
  └── temp/                           ← cache / temporary converted files
        └── <job-id>/
              ├── building-a.png
              └── building-a_thumb.png
```

---

## 1. Navigation Index File (`_index.json`)

Store a manifest at the container root to represent the navigation tree explicitly.

```json
{
  "version": "1.0",
  "generated": "2026-02-23T13:00:00Z",
  "tree": [
    {
      "id": "drawings",
      "label": "Drawings",
      "type": "folder",
      "children": [
        {
          "id": "building-a",
          "label": "Building A",
          "type": "file",
          "path": "source/drawings/building-a.dwg",
          "url": "https://<account>.blob.core.windows.net/<container>/source/drawings/building-a.dwg"
        }
      ]
    }
  ]
}
```

---

## 2. Uploading Files & the Index

### Azure CLI

```bash
# Upload a source file
az storage blob upload \
  --account-name <yourAccount> \
  --container-name my-files \
  --name "source/drawings/building-a.dwg" \
  --file "C:/local/building-a.dwg"

# Upload/refresh the index
az storage blob upload \
  --account-name <yourAccount> \
  --container-name my-files \
  --name "_index.json" \
  --file "C:/local/_index.json" \
  --overwrite
```

### Node.js SDK

```js
const { BlobServiceClient } = require("@azure/storage-blob");

const container = BlobServiceClient
  .fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
  .getContainerClient("my-files");

// Upload a file
await container.getBlockBlobClient("source/drawings/building-a.dwg")
  .uploadFile("C:/local/building-a.dwg");

// Upload index JSON
const indexContent = JSON.stringify(navigationTree);
await container.getBlockBlobClient("_index.json")
  .upload(indexContent, Buffer.byteLength(indexContent), {
    blobHTTPHeaders: { blobContentType: "application/json" }
  });
```

---

## 3. Access Control

| Method | Use Case |
|---|---|
| **Public container** | Open/public files, no auth needed |
| **SAS Token** | Time-limited, scoped access (recommended for clients) |
| **Managed Identity** | Secure server-to-server |
| **Connection String** | Development only — never expose to clients |

### Generate a SAS URL

```js
const {
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  StorageSharedKeyCredential
} = require("@azure/storage-blob");

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const sasToken = generateBlobSASQueryParameters({
  containerName: "my-files",
  blobName: "source/drawings/building-a.dwg",
  permissions: BlobSASPermissions.parse("r"),    // read-only
  expiresOn: new Date(Date.now() + 3600 * 1000)  // 1 hour
}, sharedKeyCredential).toString();

const sasUrl = `https://${accountName}.blob.core.windows.net/my-files/source/drawings/building-a.dwg?${sasToken}`;
```

---

## 4. Cache / Temp Layer

Use a `temp/` prefix as a cache for converted outputs (SVG, PNG, tiles, etc.).

### Write to Cache

```js
async function saveToCacheBlob(jobId, filename, fileBuffer, mimeType) {
  const blobPath = `temp/${jobId}/${filename}`;
  const blockBlob = container.getBlockBlobClient(blobPath);

  await blockBlob.upload(fileBuffer, fileBuffer.length, {
    blobHTTPHeaders: { blobContentType: mimeType },
    tags: { cache: "true", created: new Date().toISOString() }
  });

  return blobPath;
}
```

### Cache-Hit Check Before Converting

```js
async function getCachedOrConvert(jobId, filename) {
  const blobPath = `temp/${jobId}/${filename}`;
  const blockBlob = container.getBlockBlobClient(blobPath);

  if (await blockBlob.exists()) {
    console.log("Cache HIT:", blobPath);
    return generateSasUrl(blobPath);
  }

  // Cache MISS — convert and store
  const convertedBuffer = await runConversion(filename);
  await saveToCacheBlob(jobId, filename, convertedBuffer, "image/png");
  return generateSasUrl(blobPath);
}
```

### Manual Cache Invalidation

```js
// Clear a specific job's cache
async function invalidateCache(jobId) {
  for await (const blob of container.listBlobsFlat({ prefix: `temp/${jobId}/` })) {
    await container.deleteBlob(blob.name);
  }
}

// Clear all temp blobs
async function clearAllCache() {
  for await (const blob of container.listBlobsFlat({ prefix: "temp/" })) {
    await container.deleteBlob(blob.name);
  }
}
```

---

## 5. Auto-Cleanup via Lifecycle Policy

Azure can automatically delete `temp/` blobs after N days — no cron jobs needed.

**Portal**: Storage Account → Data management → Lifecycle management → Add rule

### JSON Policy

```json
{
  "rules": [
    {
      "name": "DeleteTempFiles",
      "enabled": true,
      "type": "Lifecycle",
      "definition": {
        "filters": {
          "blobTypes": ["blockBlob"],
          "prefixMatch": ["my-files/temp/"]
        },
        "actions": {
          "baseBlob": {
            "delete": { "daysAfterModificationGreaterThan": 2 }
          }
        }
      }
    }
  ]
}
```

---

## 6. API Server Pattern (Express.js)

Keep Azure credentials server-side. The API reads the index and issues scoped SAS tokens to clients.

```js
const express = require("express");
const app = express();

// Return the navigation tree
app.get("/api/navigation", async (req, res) => {
  const blob = container.getBlockBlobClient("_index.json");
  const download = await blob.download();
  const content = await streamToString(download.readableStreamBody);
  res.json(JSON.parse(content));
});

// Return a SAS URL for a file (with cache-hit logic)
app.get("/api/file-url", async (req, res) => {
  const { path, jobId } = req.query;
  const url = await getCachedOrConvert(jobId, path);
  res.json({ url });
});
```

---

## 7. Full Request Flow

```
Client Request
     │
     ▼
  API Server
     │
     ├──► Check temp/<jobId>/<file> in Blob Storage
     │         │
     │    EXISTS? ──YES──► Return SAS URL  (cache hit)
     │         │
     │         NO
     │         │
     ├──► Fetch source/<file> from Blob Storage
     ├──► Run conversion (SVG, PNG, etc.)
     ├──► Save result to temp/<jobId>/<file>
     └──► Return SAS URL to client
              │
              ▼
         Azure Lifecycle Policy
         auto-deletes temp/ after 2 days
```

---

## 8. Why Blob Storage Beats Web App Local Cache

| | **Local Web App Cache** | **Blob Storage Cache** |
|---|---|---|
| Persistent across restarts | ❌ No | ✅ Yes |
| Shared across multiple instances | ❌ No | ✅ Yes |
| Auto-expiry | Manual cron needed | ✅ Built-in lifecycle rules |
| Cost | App compute/disk | ✅ Cheap blob storage tier |
| Survives deployment | ❌ No | ✅ Yes |
| Scalable | Limited | ✅ Unlimited |

> **Key rule**: Never expose your Azure connection string or account key to clients. Always let your API generate SAS tokens on demand.
