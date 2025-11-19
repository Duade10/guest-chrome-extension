import "./dev-reload";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      chrome.runtime.sendMessage({ type: 'TAB_UPDATED', url: tab.url });
    }
  });
});

chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.url) {
    chrome.runtime.sendMessage({ type: 'TAB_UPDATED', url: changeInfo.url });
  }
});

export {};
