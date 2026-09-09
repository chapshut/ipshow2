const UPDATE_INTERVAL_MIN = 1;

async function fetchIP() {
  let currentIP = '…';
  let currentLocation = '—';
  let latitude = null;
  let longitude = null;

  try {
    // Primair: ipapi.co
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    if (!res.ok) throw new Error(`ipapi status ${res.status}`);

    const data = await res.json();
    currentIP = data.ip || 'error';

    const parts = [];
    if (data.city) parts.push(data.city);
    if (data.region) parts.push(data.region);
    if (data.country_name) parts.push(data.country_name);
    currentLocation = parts.length ? parts.join(', ') : 'Unknown';

    latitude = data.latitude || null;
    longitude = data.longitude || null;

  } catch (err1) {
    console.warn('ipapi.co failed, trying fallback…', err1);

    try {
      // Fallback: ipify + ipinfo
      const ipRes = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
      const ipData = await ipRes.json();
      currentIP = ipData.ip || 'error';

      const geoRes = await fetch(`https://ipinfo.io/${currentIP}/json`, { cache: 'no-store' });
      if (geoRes.ok) {
        const geo = await geoRes.json();
        const parts = [];
        if (geo.city) parts.push(geo.city);
        if (geo.region) parts.push(geo.region);
        if (geo.country) parts.push(geo.country);
        currentLocation = parts.length ? parts.join(', ') : 'Location unavailable';

        // ipinfo geeft "loc": "lat,lon"
        if (geo.loc) {
          const [lat, lon] = geo.loc.split(',').map(Number);
          latitude = lat;
          longitude = lon;
        }
      }
    } catch (err2) {
      console.error('All fetches failed', err2);
      currentIP = 'ERR';
      currentLocation = '—';
    }
  }

  // Badge + tooltip
  if (currentIP === 'ERR') {
    chrome.action.setBadgeText({ text: 'ERR' });
    chrome.action.setBadgeBackgroundColor({ color: '#ff3366' });
    chrome.action.setTitle({ title: 'Could not fetch IP/location – click for popup' });
  } else {
    const octets = currentIP.split('.');
    const badgeText = octets.slice(0, 2).join('.') + '..';
    chrome.action.setBadgeText({ text: badgeText });
    chrome.action.setBadgeBackgroundColor({ color: '#ff00ff' });
    chrome.action.setBadgeTextColor({ color: '#00ffff' });
    chrome.action.setTitle({
      title: `Your public IP: ${currentIP}\nLocation: ${currentLocation}`
    });
  }

  // Opslaan (inclusief lat/lon voor de kaart)
  chrome.storage.local.set({
    publicIP: currentIP,
    location: currentLocation,
    latitude,
    longitude,
    lastUpdate: Date.now()
  });
}

// Initial fetch
fetchIP();

// Periodieke update
chrome.alarms.create('fetch-ip', { periodInMinutes: UPDATE_INTERVAL_MIN });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetch-ip') {
    fetchIP();
  }
});

// Force refresh vanuit popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'forceFetch') {
    fetchIP().then(() => sendResponse({ status: 'ok' }));
    return true; // async response
  }
});