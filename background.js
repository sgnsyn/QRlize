chrome.runtime.onInstalled.addListener((details) => {
  //set initial Theme
  const theme = "light";
  setTheme(theme);
  // open about page aboutn load
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("./pages/terms/index.html"),
    });
  }
  // context menu stuff
  chrome.contextMenus.create({
    id: "linkAction",
    title: "Generate QR",
    contexts: ["link"],
  });
});

// create small window with qr when context menu is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const link = info.linkUrl;
  const encodedLink = encodeURIComponent(link);

  if (info.menuItemId === "linkAction") {
    chrome.windows.create({
      url: chrome.runtime.getURL(
        `./pages/context window/index.html?link=${encodedLink}`,
      ),
      type: "popup",
      width: 291,
      height: 525,
    });
  }
});

function setTheme(theme) {
  chrome.storage.local.set({ theme });
}
