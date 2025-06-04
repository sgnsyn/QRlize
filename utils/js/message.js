export function notifyThemeChange(theme) {
  chrome.runtime.sendMessage({ action: "themeChange", theme });
}
