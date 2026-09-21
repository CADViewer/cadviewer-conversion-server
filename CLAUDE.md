# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # node app.js
npm run dev            # nodemon
npm test               # jest
npx jest libs/tenant.test.js          # one file
npm run type-check     # tsc --noEmit (the repo is JS; tsc checks the typed parts)
npm run lint           # eslint
```

Local infra is `docker-compose.yml`: MariaDB 10.6 + adminer + the server. Note both
database images are **Linux** images — see "Windows" below before assuming the whole
compose file can move.

## What this is

A single Express app (`app.js`, ~500 lines of wiring, routes in `routes/`) that
converts CAD drawings to SVG/PDF by shelling out to the **AutoXChange** binary,
serves the converted files back, and — in cloud mode — partitions everything by
tenant and by frontend for the CADViewer Analytic platform.

The analytic platform never deploys this server; it only calls it over HTTP
(`X-Tenant-Key` for the admin surface, the request Origin for anonymous traffic).

## Multi-tenancy — read `libs/tenant.js` before touching any path

`cloudMode()` is gated on `CONVERSION_MASTER_KEY`. When off, every isolation gate
below is a strict no-op and the box behaves like the old single-tenant server.

Two identities are resolved per request, and they are not the same thing:

| what | where from | trust |
|---|---|---|
| **tenant** | `X-Tenant-Key` (admin), else the Origin/Referer host via `agent_targets` | the key is trusted; Origin is not |
| **app** (frontend) | `X-App-Folder` (only alongside a tenant key), else the same `agent_targets` row | selects a folder *inside* an already-established tenant |

`resolveTenant` → `resolveAppFromRequest` run globally; `resolveTenantFromOrigin`
is mounted per route for anonymous traffic. `appFolder(req)` returns '' unless a
tenant AND an app were resolved AND they agree.

Paths: `folderKey(tenant)` = **storage key, else slug**. Content is
`content/<folderKey>/apps/<app>/`, uploads and converter output likewise.
`assertUnderRoots` / `assertTenantPathScope` confine every serving route.

### The failure this causes most often

A frontend whose fqdn is missing from `agent_targets` resolves to **no tenant**.
`POST /auth/login` then looks for the account among the tenant-less ones and
answers "Invalid email or password" for a password that is right, with the account
sitting in plain view in the platform's Users tab. Check `agent_targets` first:
`GET /tenant-admin/agent-targets/:target` says whether an address is registered
and to which frontend.

The mirror image: the platform publishing `content/<slug>/…` for a tenant this
server keys by storage key. The gate refuses it — **403 on the site's own
drawings**. `GET /tenants/me` returns the storage key this server actually uses;
that is the authority, not the slug.

## The converter

`CADViewer_config.json` names the executable per platform. **It is rewritten at
runtime** (`libs/config.js` `patchConfigAndSave`, autodetect of platform and
location) and therefore survives the image that shipped it — a config can name a
release this image no longer carries.

- `app.js` extracts `<executable>.tar.xz` at boot when the binary is missing
  (Linux only — there is no Windows equivalent).
- `libs/converter-pick.js` falls back to whatever converter the image *does*
  carry when the configured one is absent, and says so in the log. It ignores
  `.exe`, so it does not cover Windows.
- **Licences are per platform.** `converters/autoxchange/linux/axlic.key` and
  `windows/axlic.key` are different files even at the same version; a Windows key
  does not work on Linux. An upgrade that renews one side only leaves the other
  running a binary it is not licensed for.

### Reading the failure modes

These three look alike from the browser and mean different things:

| symptom | cause |
|---|---|
| `errorCode: "ENaN"` | the converter ran and **declined** — no exit code. Usually the licence. |
| `errorCode: "E0"` + ENOENT on the follow-up read | the converter is **absent**, or the answer came from a cache entry whose file is gone |
| `Input file does not exist` | the **source** could not be fetched. A missing file is served as **HTTP 200** with 19 bytes of `Error-directload-01`, and the size check below 25 bytes rejects it |

Start at the container's boot log: it prints which binary it chose
(`AX converter: …`) and whether it found it.

`libs/conversion-cache.js` guards the cache: an entry naming a file that is gone
is a miss, not a hit. Without it one missing output poisons a drawing for good,
because the cache keeps answering with a name nothing can read.

## Windows

The Windows path is maintained (binaries and config are committed from Windows
machines) but has only ever run **locally**, never in a container and never in
cloud mode. Before proposing it:

- the `.tar.xz` extraction and the converter fallback are Linux-only;
- five `exec()` calls go through `cmd.exe`, which refuses an executable path
  written with `/` (`routes/licence.js`, `routes/makesinglepagepdf.js`);
- `folderLocation` in the config is an absolute Linux path and is never
  recalculated by autodetect, unlike `ServerLocation`;
- `physicalId` (`libs/tenant.js`) identifies a directory by inode, and Windows
  reports 0 on some setups — the guard that detects `content/`, `uploads/` and
  `converters/files/` being bind-mounted onto **one** host folder then sees
  nothing. Separate those volumes explicitly before running there;
- `mariadb`/`adminer` in the compose file are Linux images.

## Conventions and traps

- **Test a pure helper, not the route.** Requiring a route pulls in the config,
  the database and the CADViewer bundle, and jest hangs. `libs/conversion-cache.js`
  and `libs/converter-pick.js` exist in `libs/` for exactly that reason — put the
  rule there and test it.
- `routes/callapiconversion.js` is ~5 000 lines of conversion engine with the
  original commented-out samples still in it. Those comments are the best record
  of what a real request looks like; read them before guessing a parameter shape.
- `paramcheck3` in the cache comparison is hardcoded `true`: the source freshness
  check is disabled. Re-enabling it is a behaviour change, not a fix.
- The tenant-admin surface (`routes/tenant-admin.js`) is what the analytic Cloud
  menu drives. Every route there is scoped by `requireTenant` plus the app
  header — keep new ones the same shape.
