chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && !tab.url.startsWith("https://dashboard.hostaway.com/")) {
      chrome.sidePanel.setOptions({ enabled: false });
    } else {
      chrome.sidePanel.setOptions({ enabled: true, path: "sidepanel.html" });
    }
  });
});
