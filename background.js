chrome.runtime.onInstalled.addListener((details) => {
  //set initial Theme
  const initialState = {
    theme: "light",
    initState: true,
  };
  setStorage(initialState);
  // open about page aboutn load
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("./pages/terms/index.html"),
    });
  }
  // context menu stuff
  chrome.contextMenus.create({
    id: "show-popup",
    title: "Generate QR",
    contexts: ["link"],
  });
});

// create small window with qr when context menu is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const link = info.linkUrl;
  const encodedLink = encodeURIComponent(link);

  if (info.menuItemId === "show-popup") {
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

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "themeChange") {
    //to prevent error :recieving end don't exist
  }
});

function setStorage(obj) {
  chrome.storage.local.set(obj);
}
