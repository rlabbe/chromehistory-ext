const textarea = document.getElementById("domainList");
const statusDiv = document.getElementById("status");

chrome.storage.sync.get("blockedDomains", (data) => {
  if (data.blockedDomains) {
    textarea.value = data.blockedDomains.join("\n");
  }
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const domains = textarea.value
    .split(/\s+/)
    .map(d => d.trim().toLowerCase())
    .filter(Boolean);
  chrome.storage.sync.set({ blockedDomains: domains }, () => {
    statusDiv.textContent = "Saved.";
  });
});
