const req = JSON.parse(localStorage.getItem("express_delivery_tracking_request") || "{}");

const route = [
  { place: "Zagreb, Croatia", time: "Day 1 • 09:15", lat: 45.8150, lng: 15.9819, note: "Shipment received and registered at origin facility" },
  { place: "Vienna, Austria", time: "Day 3 • 13:40", lat: 48.2082, lng: 16.3738, note: "Departed regional sorting center" },
  { place: "Munich, Germany", time: "Day 5 • 11:20", lat: 48.1351, lng: 11.5820, note: "Arrived at European cargo processing hub" },
  { place: "Frankfurt, Germany", time: "Day 7 • 18:30", lat: 50.1109, lng: 8.6821, note: "Awaiting international cargo departure" },
  { place: "Amsterdam, Netherlands", time: "Day 9 • 09:05", lat: 52.3676, lng: 4.9041, note: "Package processed at EU distribution facility" },
  { place: "London, United Kingdom", time: "Day 11 • 16:50", lat: 51.5072, lng: -0.1276, note: "Transferred to transatlantic cargo route" },
  { place: "Reykjavik, Iceland", time: "Day 13 • 07:40", lat: 64.1466, lng: -21.9426, note: "Technical cargo stop and inspection" },
  { place: "Halifax, Canada", time: "Day 15 • 14:10", lat: 44.6488, lng: -63.5752, note: "Arrived in North America • Customs inspection" },
  { place: "Montreal, Canada", time: "Day 17 • 10:30", lat: 45.5017, lng: -73.5673, note: "Cleared customs and transferred to regional hub" },
  { place: "New York, USA", time: "Day 19 • 11:45", lat: 40.7128, lng: -74.0060, note: "Arrived at U.S. import gateway and customs facility" },
 { place: "Chicago, Illinois, USA", time: "Day 21 • 15:30", lat: 41.8781, lng: -87.6298, note: "Transferred to Midwest regional distribution hub" },
  { place: "Kansas City, Missouri, USA", time: "Day 23 • 09:10", lat: 39.0997, lng: -94.5786, note: "Shipment arrived at destination region facility" },
  { place: "St. Joseph, Missouri, USA", time: "Day 24 • 14:25", lat: 39.7675, lng: -94.8467, note: "Out for delivery • Courier approaching destination north of Kansas City" }
]; 

// CHANGE THIS ANYTIME TO SET CURRENT LOCATION
const currentIndex = 3;

const summaryKv = document.getElementById("summaryKv");
const timeline = document.getElementById("timeline");

const safe = (v, fallback = "—") => (v && String(v).trim()) ? v : fallback;

const summary = [
  ["Order ID", safe(req.orderId)],
  ["Email", safe(req.email)],
  ["Status", safe(req.status, "In Transit")],
  ["Service", safe(req.service, "Express Air")],
  ["Sender", safe(req.sender, "Sender Name")],
  ["Receiver", safe(req.receiver, "Receiver Name")],
  ["Weight", safe(req.weight, "—")],
  ["ETA", safe(req.eta, "—")],
];

summaryKv.innerHTML = summary
  .map(([k, v]) => `<div><b>${k}</b><span>${v}</span></div>`)
  .join("");

// Timeline with passed/current/upcoming classes
timeline.innerHTML = route.map((r, index) => {
  let statusClass = "upcoming";

  if (index < currentIndex) {
    statusClass = "passed";
  }
  if (index === "warning"){
    statusClass = "warning";
  } else if (index === currentIndex) {
    statusClass = "current";
  }else if (index === currentIndex) {
  fillColor = "red";
  popupStatus = "Current location";
}

  return `
    <div class="step ${statusClass}">
      <div class="bullet"></div>
      <div>
        <b>${r.place}</b>
        <small>${r.time} • ${r.note}</small>
      </div>
    </div>
  `;
}).join("");

const currentStop = route[currentIndex];

const map = L.map("map", { zoomControl: true }).setView([currentStop.lat, currentStop.lng], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "&copy; OpenStreetMap"
}).addTo(map);

// Split line into passed and upcoming
const passedLatLngs = route.slice(0, currentIndex + 1).map(r => [r.lat, r.lng]);
const upcomingLatLngs = route.slice(currentIndex).map(r => [r.lat, r.lng]);

if (passedLatLngs.length > 1) {
  L.polyline(passedLatLngs, {
    color: "green",
    weight: 4
  }).addTo(map);
}

if (upcomingLatLngs.length > 1) {
  L.polyline(upcomingLatLngs, {
    color: "gray",
    weight: 4,
    dashArray: "8, 8"
  }).addTo(map);
}

map.fitBounds(L.latLngBounds(route.map(r => [r.lat, r.lng])), { padding: [20, 20] });

// Add colored markers
route.forEach((r, index) => {
  let fillColor = "gray";
  let popupStatus = "Yet to reach";

  if (index < currentIndex) {
    fillColor = "green";
    popupStatus = "Passed";
  } else if (index === currentIndex) {
    fillColor = "blue";
    popupStatus = "Current location";
  }

  L.circleMarker([r.lat, r.lng], {
    radius: 7,
    color: "#ffffff",
    weight: 2,
    fillColor: fillColor,
    fillOpacity: 1
  })
    .addTo(map)
    .bindPopup(`
      <b>${r.place}</b><br>
      ${r.time}<br>
      ${r.note}<br>
      <b>Status:</b> ${popupStatus}
    `);
});

// Blinking current marker
const blinkIcon = L.divIcon({
  className: "",
  html: `<div class="blinkDot"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

const current = L.marker([currentStop.lat, currentStop.lng], { icon: blinkIcon }).addTo(map);
current.bindPopup(`<b>Current Location</b><br>${currentStop.place}`).openPopup();
