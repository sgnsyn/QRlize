export function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    navigator.clipboard
      .writeText(text)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
}
