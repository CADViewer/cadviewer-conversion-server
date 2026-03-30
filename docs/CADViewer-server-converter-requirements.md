# AutoXchange Server Requirements

The AutoXchange conversion engine is a 64-bit command-line application available for Windows and Linux. Server requirements are primarily driven by two factors: the **size of the input DWG file** and the **complexity of the drawing content**.

## Core Drivers

| Driver | Impact |
|---|---|
| **File size** (MB) | RAM usage, I/O throughput |
| **Drawing complexity** | CPU time, peak RAM spikes |
| **Cache policy** | Storage requirements |

**Complexity factors** include: nested/external block references (XREFs), dense hatch patterns, many layers and linetypes, and embedded raster images. More complex drawings require significantly more time and memory to process, even at the same file size.

---

## Server Tiers by File Size

### 🟢 Small — DWG files under 1 MB

Typical content: Simple 2D floor plans, schematics, minimal blocks.

| Resource | Specification |
|---|---|
| CPU | 4 cores, 3.0+ GHz |
| RAM | 8 GB |
| Concurrent conversions | 4–8 |
| Per-job timeout | 15–30 seconds |

---

### 🟡 Medium — DWG files 1–20 MB

Typical content: Mixed 2D drawings, moderate XREF usage, some hatching.

| Resource | Specification |
|---|---|
| CPU | 8 cores, 3.5+ GHz |
| RAM | 16–32 GB |
| Concurrent conversions | 4–8 |
| Per-job timeout | 60–120 seconds |

---

### 🔴 Large — DWG files over 20 MB *(Very large: approaching 100 MB)*

Typical content: Detailed 2D drawings, deep block nesting, extensive hatching, many XREFs, embedded raster images.

| Resource | Specification |
|---|---|
| CPU | 16+ cores, 3.5+ GHz |
| RAM | 64–128 GB (recommended); less is viable — see note below |
| Concurrent conversions | 2–4 (throttle to prevent excessive disk cache use under concurrent load) |
| Per-job timeout | 300–600 seconds |

> **Memory vs. Speed tradeoff**: When available RAM is insufficient to hold the full drawing in memory, AutoXchange will automatically fall back to using a disk-based cache on the server. Conversion will still complete successfully, but at a significantly reduced speed. This means users can operate with less RAM than the recommended amount — the tradeoff is longer conversion times. For latency-sensitive applications, provisioning adequate RAM is strongly recommended. For batch or background processing, a lower-RAM configuration with disk cache is acceptable.

---

## Storage

Storage requirements are **directly determined by the user's cache policy** and are not fixed. There is no mandatory minimum beyond the OS and application baseline (~20 GB).

| Cache Policy | Storage Formula |
|---|---|
| **No cache** (convert on demand only) | `2–3 × max_concurrent_jobs × avg_file_size` for temp scratch space + OS baseline |
| **Partial cache** (retain last N drawings) | `N × avg_output_size_per_drawing` + OS baseline |
| **Full cache** (retain all converted outputs) | `total_drawing_count × avg_output_size_per_drawing` + OS baseline |

**Output size note**: Converted SVG/PNG output is typically **1–5× the source DWG size** depending on geometry density and output format.

**Recommendation**: Always locate temp/scratch directories on NVMe storage. Avoid network-mapped paths for temp directories, as heavy I/O during conversion will bottleneck on network latency.

---

## General Notes

- **Peak RAM** during conversion is approximately **10–20× the raw DWG file size**. A 50 MB DWG may consume 500 MB–1 GB of RAM at peak. If RAM is insufficient, AutoXchange falls back to a server-side disk cache — conversion completes, but more slowly.
- **CPU single-thread performance** (clock speed) drives individual job speed. AutoXchange conversion is largely single-threaded per job.
- **CPU core count** determines how many jobs can run concurrently.
- Always **cap `max-concurrent-jobs` based on available RAM**, not CPU core count, to prevent out-of-memory failures on large or complex files.
- On **Windows**, ensure the required Visual C++ Redistributables and system fonts are installed.
- On **Linux**, ensure required shared libraries (e.g. `libstdc++`, `libfontconfig`) are present.
