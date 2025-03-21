async function getCacheStats() {
  try {
    const response = await fetch("/settings/cache/stats", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      document.querySelectorAll(".cache-file-count").forEach((el) => {
        el.innerText = data.fileCount;
      });
      document.querySelectorAll(".cache-size").forEach((el) => {
        el.innerText = formatBytes(data.totalSize);
      });
    } else {
      console.error("Failed to get cache stats");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function flushCache() {
  try {
    const response = await fetch("/settings/cache/flush", {
      method: "DELETE",
    });

    if (response.ok) {
      vanillaToast.success("Cache flushed successfully.", { duration: 5000 });
      // reload the page
      location.reload();
      getCacheStats(); // Refresh stats
    } else {
      vanillaToast.error("Failed to flush cache.", { duration: 5000 });
    }
  } catch (error) {
    console.error("Error:", error);
    vanillaToast.error("An error occurred while flushing cache.", {
      duration: 5000,
    });
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Refresh stats every minute
document.addEventListener("DOMContentLoaded", () => {
  getCacheStats();
});
