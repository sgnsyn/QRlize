export function saveToStorage(obj) {
  chrome.storage.local.set(obj);
}

export async function getFromStorage(items) {
  const result = await chrome.storage.local.get(items);
  return result;
}
