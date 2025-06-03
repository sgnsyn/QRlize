// Remove previously genrated QR
const pBody = document.getElementById("qr-body");
if (pBody) {
  pBody.remove();
}

// Create new Element
const body = document.createElement("div");
body.setAttribute("id", "qr-body");

const strHTML = `
    <nav>
      <button class="icon-btn" id="close"></button> 
      <button class="icon-btn" id="theme"></button>
    </nav>
    <div id="qrcode"></div>
    <input
      type="text"
      id="link-input"
      disabled
      spellcheck="false"
      autocorrect="off"
      autocapitalize="off"
    />
    <div class="btn-container">
      <button class="proper-btn" id="copy-btn">
        <span>copy</span>
        <div class="spinner"></div>
      </button>
      <button class="proper-btn" id="edit-btn" data-state="edit">edit</button>
    </div>
    <button id="about-btn" class="proper-btn">about</button>
    <script src="../qrcode.min.js"></script>
    <script src="./popup.js" type="module"></script>
  </body>
`;

body.innerHTML = strHTML;
document.body.append(body);
console.log("succesfully attached");
