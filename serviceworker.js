chrome.runtime.onInstalled.addListener((details) => {
  // open about page aboutn load
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("./pages/terms/index.html"),
    });
  }
  // context menu stuff
  chrome.contextMenus.create({
    id: "myExtensionLinkAction",
    title: "Do Something with This Link",
    contexts: ["link"],
  });
});
