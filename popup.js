const ipEl = document.getElementById('ip');
const locationEl = document.getElementById('location');
const statusEl = document.getElementById('status');
const refreshBtn = document.getElementById('refresh');
const mapContainer = document.getElementById('map-container');

function updatePopup() {
  chrome.storage.local.get(['publicIP', 'location', 'latitude', 'longitude', 'lastUpdate'], (data) => {
    const ip = data.publicIP || '…';
    const loc = data.location || '…';
    const time = data.lastUpdate
      ? new Date(data.lastUpdate).toLocaleTimeString()
      : 'never';

    ipEl.textContent = ip;
    locationEl.textContent = loc;
    statusEl.textContent = `Last update: ${time}`;

    // Kaart maken of updaten
    if (data.latitude && data.longitude) {
      const lat = data.latitude;
      const lon = data.longitude;

      // OpenStreetMap embed (geen externe scripts nodig)
      const delta = 0.08; // zoom niveau
      const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
      
      mapContainer.innerHTML = `
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}"
          loading="lazy">
        </iframe>
      `;
    } else {
      mapContainer.innerHTML = `<div style="padding:40px;color:#ff66ff;">Geen locatie beschikbaar</div>`;
    }
  });
}

updatePopup();

// Refresh knop
refreshBtn.addEventListener('click', () => {
  ipEl.textContent = 'probing...';
  locationEl.textContent = '…';
  mapContainer.innerHTML = '';
  chrome.runtime.sendMessage({ action: 'forceFetch' }, () => {
    setTimeout(updatePopup, 900);
  });
});

// Live update wanneer data verandert
chrome.storage.onChanged.addListener((changes) => {
  if (changes.publicIP || changes.location || changes.latitude || changes.longitude || changes.lastUpdate) {
    updatePopup();
  }
});