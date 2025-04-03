function deleteIfBlocked(url) {
  let hostname;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return;
  }

  chrome.storage.sync.get("blockedDomains", (data) => {
    const list = data.blockedDomains || [];
    if (list.some(domain => hostname.endsWith(domain))) {
      console.log("Matched blocked domain:", hostname);
      setTimeout(() => {
        chrome.history.deleteUrl({ url }, () => {
          console.log("Deleted:", url);
        });
      }, 500);
    }
  });
}

chrome.webNavigation.onCommitted.addListener((details) => {
  console.log("onCommitted:", details.url);
  deleteIfBlocked(details.url);
}, { url: [{ schemes: ["http", "https"] }] });

chrome.webNavigation.onCompleted.addListener((details) => {
  console.log("onCompleted:", details.url);
  deleteIfBlocked(details.url);
}, { url: [{ schemes: ["http", "https"] }] });
