const RULES = [
  {
    id: 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      initiatorDomains: ["youtube.com"],
      requestDomains: ["doubleclick.net"],
      resourceTypes: ["script", "xmlhttprequest", "sub_frame"]
    }
  },
  {
    id: 2,
    priority: 1,
    action: { type: "block" },
    condition: {
      initiatorDomains: ["youtube.com"],
      requestDomains: ["googlesyndication.com"],
      resourceTypes: ["script", "xmlhttprequest", "sub_frame"]
    }
  },
  {
    id: 3,
    priority: 1,
    action: { type: "block" },
    condition: {
      initiatorDomains: ["youtube.com"],
      requestDomains: ["googleadservices.com"],
      resourceTypes: ["script", "xmlhttprequest", "sub_frame"]
    }
  }
];

async function setProtection(enabled) {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULES.map((rule) => rule.id),
    addRules: enabled ? RULES : []
  });

  await chrome.storage.local.set({ enabled });
}

chrome.runtime.onInstalled.addListener(async () => {
  const { enabled } = await chrome.storage.local.get("enabled");
  await setProtection(enabled !== false);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.action !== "toggle" || typeof message.enabled !== "boolean") {
    return;
  }

  setProtection(message.enabled)
    .then(() => sendResponse({ success: true }))
    .catch((error) => sendResponse({
      success: false,
      error: error.message
    }));

  return true;
});
