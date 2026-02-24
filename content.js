const proxyUrl = "YOUR_GAS_WEB_APP_URL_HERE";

// The "SPA Fix": YouTube doesn't reload the page, so we listen for this event
window.addEventListener('yt-navigate-finish', () => {
  if (window.location.pathname === '/watch') {
    injectSkepticButton();
  }
});

function injectSkepticButton() {
  // Check if button already exists to prevent duplicates
  if (document.getElementById('skeptic-btn')) return;

  const target = document.querySelector('#title h1');
  if (!target) return;

  const btn = document.createElement('button');
  btn.id = 'skeptic-btn';
  btn.innerText = '🧐 Skeptic Check';
  btn.style.cssText = 'margin-left:15px; padding:8px; cursor:pointer; background:#f00; color:#fff; border:none; border-radius:4px; font-weight:bold;';

  btn.onclick = async () => {
    const videoTitle = target.innerText;
    btn.innerText = 'Thinking...';
    
    try {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        body: JSON.stringify({ videoTitle: videoTitle })
      });
      const data = await response.json();
      alert("Skeptic Analysis:\n\n" + data.critique);
    } catch (err) {
      alert("Error reaching the Honesty Stack.");
    } finally {
      btn.innerText = '🧐 Skeptic Check';
    }
  };

  target.appendChild(btn);
}