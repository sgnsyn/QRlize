export function getTabLink() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (
        chrome.runtime.lastError ||
        !tabs ||
        tabs.length === 0 ||
        !tabs[0].url
      ) {
        reject(false);
      } else {
        resolve(tabs[0].url);
      }
    });
  });
}
