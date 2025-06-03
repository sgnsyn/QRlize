import { getUserPreferredTheme, setTheme } from "../../utils/js/theme.js";

console.log(getUserPreferredTheme());
function getUserPreferredTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
}
