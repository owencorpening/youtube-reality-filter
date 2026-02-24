# YouTube Reality Filter (The Skeptic Button)

### A "Zero-Infrastructure" Chrome Extension for AI-Powered Video Analysis

This project is a lightweight Chrome Extension that injects a **"Skeptic"** button directly into the YouTube interface. It uses a unique "Honesty Stack" architecture to provide AI-driven critiques of video content—focusing on logical holes, model overfitting, and "noble lies"—all for $0.00 in hosting costs.

---

## 🚀 The "Honesty Stack" Architecture
After 33 years of development, I’m doubling down on this "Cheat Code" architecture. It bypasses the need for paid servers or complex backend management:

* **Frontend:** Chrome Extension (Vanilla JS) that injects UI into YouTube’s Single Page Application (SPA).
* **The SPA Fix:** Utilizes the native `yt-navigate-finish` event to ensure the analysis button persists even when YouTube navigates internally between videos.
* **The Proxy:** **Google Apps Script (GAS)** acts as a secure, serverless middleware to protect API keys and bridge the frontend to the AI.
* **The Brain:** **Gemini 1.5 Flash** performs the logic-checking and evidence-based critiques using a "cynical scientist" persona.

## ✨ Key Features
* **One-Click Critique:** Instantly analyze video titles for logical consistency before clicking.
* **Cynical Peer Review:** Powered by a prompt designed to identify "noble lies" and lack of empirical evidence.
* **Privacy-First:** Your Gemini API key stays hidden inside your private Google Apps Script environment, not in the extension code.
* **Zero Cost:** Entirely hosted on the free tiers of Google Cloud and Google Apps Script.

## 🛠️ Installation & Setup

### 1. Backend (Google Apps Script)
1.  Go to [script.new](https://script.new) and create a new project.
2.  Paste the code from `backend.gs` (provided in this repo).
3.  Insert your `GEMINI_API_KEY`.
4.  **Deploy as Web App**:
    * **Execute as:** Me
    * **Who has access:** Anyone
5.  Copy the **Web App URL**.

### 2. Frontend (Chrome Extension)
1.  Clone this repository.
2.  Open `content.js` and paste your GAS Web App URL into the `proxyUrl` constant.
3.  Open Chrome and navigate to `chrome://extensions`.
4.  Enable **Developer Mode**.
5.  Click **Load Unpacked** and select this folder.

## 📖 How It Works
When the extension detects a YouTube video page, it injects a "Skeptic" button near the video title. Upon clicking, the extension sends the video title to your GAS proxy. The AI (Gemini) then returns a 3-bullet point critique focusing on:
1.  Potential model overfitting.
2.  Logical fallacies or "noble lies."
3.  Lack of empirical or fossil evidence (where applicable).

## 📄 License
MIT License - Feel free to fork and "skepticize" your own feed!
