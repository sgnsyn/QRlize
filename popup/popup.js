import { setTheme } from "../utils/js/theme.js";
import { copyToClipboard } from "../utils/js/clipboard.js";
import { getTabLink } from "../utils/js/tabLink.js";
import { getFromStorage, saveToStorage } from "../utils/js/storage.js";
import { notifyThemeChange } from "../utils/js/message.js";

const linkInp = document.getElementById("link-input");
const qrEl = document.getElementById("qrcode");
const themeBtn = document.getElementById("theme");
const copyBtn = document.getElementById("copy-btn");
const editBtn = document.getElementById("edit-btn");
const aboutBtn = document.getElementById("about-btn");
const pColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--secondary-color")
  .trim();

let link = null;
let theme = "light";
let qrBg = pColor || "#000000";

let qrcode = null;

async function init() {
  const savedTheme = await getFromStorage(["theme"]);
  theme = savedTheme.theme;
  qrBg = theme === "light" ? "#000000" : "#ffffff";
  setTheme(theme);

  link = await getTabLink();
  if (link) {
    qrcode = generateNewQr(link);
    linkInp.value = link;
  } else {
    qrEl.innerHTML = `
        <p class ="error-p">Unable to generate QR for this tab</p>
        <p class ="error-p">Use the input field below</p>
        `;
    editBtn.click();
  }
}

function generateNewQr(link) {
  qrEl.innerHTML = "";
  return new QRCode(qrEl, {
    text: link,
    width: 163,
    height: 163,
    colorDark: qrBg,
    colorLight: "transparent",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

function editQR() {
  link = linkInp.value;
  if (qrcode) {
    qrcode.clear();
    qrcode.makeCode(link);
  } else {
    generateNewQr(link);
  }
}

// >>> Event listeners>>>

window.addEventListener("load", init);
themeBtn.addEventListener("click", themeHandler);
copyBtn.addEventListener("click", copyHandler);
editBtn.addEventListener("click", editHandler);
linkInp.addEventListener("keydown", inputHandler);
aboutBtn.addEventListener("click", loadAboutPage);
// <<< Event listeners <<<

// >>> Handler Functions >>>

function themeHandler() {
  theme = theme === "light" ? "dark" : "light";
  qrBg = theme === "light" ? "#000000" : "#e1e1e1";

  setTheme(theme);
  saveToStorage({ theme });
  notifyThemeChange(theme);

  qrcode.clear();
  qrcode._htOption.colorDark = qrBg;
  qrcode.makeCode(link);
}

async function copyHandler() {
  if (editBtn.dataset.state === "generate") {
    editBtn.click();
  }
  copyBtn.textContent = "copying...";
  copyBtn.setAttribute("disabled", "disabled");
  const text = linkInp.value;
  const res = await copyToClipboard(text);
  setTimeout(() => {
    if (res) {
      copyBtn.textContent = "copied";
    } else {
      copyBtn.textContent = "failed";
    }
    copyBtn.removeAttribute("disabled");
    setTimeout(() => {
      copyBtn.textContent = "copy";
    }, 2000);
  }, 1000);
}

function editHandler() {
  let state = editBtn.dataset.state;

  if (state === "edit") {
    linkInp.removeAttribute("disabled");
    linkInp.focus();
    linkInp.classList.add("active");
  } else {
    linkInp.setAttribute("disabled", "disabled");
    linkInp.classList.remove("active");
    editQR();
  }

  state = state === "edit" ? "generate" : "edit";

  editBtn.textContent = state;
  editBtn.dataset.state = state;
}

function inputHandler(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    let state = "edit";

    editBtn.textContent = state;
    editBtn.dataset.state = state;
    linkInp.setAttribute("disabled", "disabled");
    linkInp.classList.remove("active");

    editQR();
  }
}
function loadAboutPage() {
  chrome.tabs.create({
    url: chrome.runtime.getURL("./pages/about/index.html"),
  });
}

// <<< Handler Functions <<<
