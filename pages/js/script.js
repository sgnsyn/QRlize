import { getFromStorage, saveToStorage } from "../../utils/js/storage.js";
import { getUserPreferredTheme, setTheme } from "../../utils/js/theme.js";

async function init() {
  const result = await getFromStorage(["initState", "theme"]);
  const initState = result?.initState || false;
  const savedTheme = result?.theme || "light";
  if (initState) {
    const theme = getUserPreferredTheme() || "light";
    saveToStorage({ theme, initState: false });
    setTheme(theme);
    return;
  }
  setTheme(savedTheme);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "themeChange") {
    setTheme(message.theme);
  }
});

init();
