const themes = {
  light: {
    "--primary-color": "#ffffff",
    "--secondary-color": "#000000",
    "--tertiary-color": "#dfe8ee",
    "--accent-color": "#d5c0c5",
    "--reverse-accent-color": "#52242f",
    "--theme-icon": 'url("../../assets/icons/moon.svg")',
    "--close-icon": 'url("../../assets/icons/close-dark.svg")',
  },
  dark: {
    "--primary-color": "#000000",
    "--secondary-color": "#ffffff",
    "--tertiary-color": "#0e0e0e",
    "--accent-color": "#52242f",
    "--reverse-accent-color": "#d5c0c5",
    "--theme-icon": 'url("../../assets/icons/sun.svg")',
    "--close-icon": 'url("../../assets/icons/close-light.svg")',
  },
};

export function setTheme(theme) {
  const root = document.documentElement;
  const selectedTheme = themes[theme];

  for (const [property, value] of Object.entries(selectedTheme)) {
    root.style.setProperty(property, value);
  }
}

export function getUserPreferredTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
}
export async function getSavedTheme() {
  const { theme = false } = await chrome.storage.local.get(["theme"]);
  return theme;
}
