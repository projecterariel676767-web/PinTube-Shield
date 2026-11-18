const statusElement = document.getElementById("status");
const toggleButton = document.getElementById("toggle");

async function refresh() {
  const { enabled } = await chrome.storage.local.get("enabled");
  const isEnabled = enabled !== false;

  statusElement.textContent = isEnabled
    ? "Protection is active"
    : "Protection is disabled";

  toggleButton.textContent = isEnabled
    ? "Disable protection"
    : "Enable protection";

  toggleButton.classList.toggle("off", !isEnabled);
  toggleButton.disabled = false;
}

toggleButton.addEventListener("click", async () => {
  toggleButton.disabled = true;
  statusElement.textContent = "Updating protection…";

  try {
    const { enabled } = await chrome.storage.local.get("enabled");
    const response = await chrome.runtime.sendMessage({
      action: "toggle",
      enabled: enabled === false
    });

    if (!response?.success) {
      throw new Error(response?.error || "Could not update rules");
    }

    await refresh();
  } catch (error) {
    statusElement.textContent = "Error: " + error.message;
    toggleButton.disabled = false;
  }
});

refresh().catch((error) => {
  statusElement.textContent = "Could not load status: " + error.message;
  toggleButton.disabled = true;
});
