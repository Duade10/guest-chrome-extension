// Force Chrome Extension to reload on changes
if (import.meta.hot) {
  import.meta.hot.accept();
  chrome.runtime.reload();
}