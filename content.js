const proxyUrl = "https://script.google.com/macros/s/AKfycbyczmCu42RSyTvP2Cr_P7BwN09YyVf9WRfYyN7Hu6ciz0aUVGFRZRD9OUgtG6bJrfR6/exec";

// The "SPA Fix": Listen for YouTube's internal navigation
window.addEventListener('yt-navigate-finish', () => {
  if (window.location.pathname === '/watch') {
    // Small delay to ensure the DOM is ready
    setTimeout(injectSkepticButton, 1000);
  }
});

function injectSkepticButton() {
  if (document.getElementById('skeptic-btn')) return;

  const target = document.querySelector('#title h1');
  if (!target) return;

  const btn = document.createElement('button');
  btn.id = 'skeptic-btn';
  btn.innerText = '🧐 Skeptic Check';
  btn.style.cssText = 'margin-left:15px; padding:8px; cursor:pointer; background:#f00; color:#fff; border:none; border-radius:4px; font-weight:bold; font-size: 14px;';

  btn.onclick = async () => {
    const videoTitle = target.innerText;
    btn.innerText = 'Checking Logic...';
    
    try {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        body: JSON.stringify({ videoTitle: videoTitle }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      });
      
      const data = await response.json();
      
      if (data.critique) {
        alert("SKEPTIC ANALYSIS:\n\n" + data.critique);
      } else if (data.error) {
        alert("API Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Connection Error. Check Console (F12) for details.");
    } finally {
      btn.innerText = '🧐 Skeptic Check';
    }
  };

  target.appendChild(btn);
}