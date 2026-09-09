<p align="center">
  <img src="https://img.shields.io/badge/NEON%20PULSE-ACTIVE-ff00ff?style=for-the-badge&logo=neovim&logoColor=00ffff&labelColor=000000" alt="Neon Status: ACTIVE">
  <img src="https://img.shields.io/badge/CYBERPUNK-2077-ff3366?style=for-the-badge&logo=cyberpunk2077&logoColor=00ffff&labelColor=000000" alt="Cyberpunk vibes">
  <img src="https://img.shields.io/badge/CHROME|BRAVE-EXTENSION-00ffff?style=for-the-badge&logo=googlechrome&logoColor=ff00ff&labelColor=000000" alt="Chrome/Brave Extension">
</p>

<h1 align="center">NEON IP BADGE</h1>
<p align="center">
  <i>Your public IP — always visible in the toolbar</i><br>
  <b>Badge • Hover tooltip • Neon popup • Auto-refresh</b>
</p>

<p align="center">
  Real-time public IPv4 display with aggressive cyberpunk styling.
</p>

<hr>

## ✨ Features

- **Toolbar Badge**: Shows the first part of your IP (e.g. `123.123.…`) in glowing magenta/cyan
- **Hover Tooltip**: Full public IP address on mouse-over
- **Popup**: Click the icon for a large neon-styled display with:
  - Full IP in huge glowing text
  - Last update timestamp
  - Manual "Refresh Now" button
- **Auto-Refresh**: Updates every 60 seconds
- **Error Handling**: Shows `ERR` badge if the fetch fails
- **Lightweight**: Manifest V3, vanilla JS, no dependencies, no icons needed

Powered by the free `api.ipify.org` endpoint.

## 🖥️ Screenshots

*(Add your own screenshots/GIFs here later)*
- Badge: `192.168…` (magenta background, cyan text)
- Hover: "Your public IP: 192.168.1.42"
- Popup: Large glowing IP with refresh button and timestamp

## 📂 Project Files
extension/
├── manifest.json       ← Core manifest (Manifest V3)
├── service-worker.js   ← Background logic: fetch IP, update badge/tooltip/storage
├── popup.html          ← Neon-styled popup UI
├── popup.js            ← Popup script: display IP, handle refresh button
└── README.md           ← This file


No custom icons included → Chrome shows default puzzle piece (add your own later if desired).

## 🚀 How to Install (Developer Mode)

1. Download or clone this folder
2. Open Chrome or Brave → go to `chrome://extensions/` or `brave://extensions/`
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked**
5. Select this `extension/` folder
6. Pin the extension to your toolbar (click the puzzle icon → pin this extension)

The badge will immediately start fetching and displaying your IP.

## ⚙️ Customization Ideas

- Change badge length: edit `BADGE_MAX_CHARS` in `service-worker.js`
- Switch to full IP on badge (not recommended — too long)
- Use IPv6: change `IP_API` to `https://api64.ipify.org?format=json`
- Add geolocation/ISP: fetch from another API (e.g. ipapi.co) in `service-worker.js`
- Add copy-to-clipboard button in popup
- More neon glow: tweak CSS in `popup.html`

## 📜 License

[MIT License](LICENSE) — fork it, mod it, jack into the grid.

> *“Your address is always watching.”*

Made with ♥ and too much magenta glow  
January 2026 — still pulsing
