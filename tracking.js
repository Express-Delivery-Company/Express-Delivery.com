const storedTrackingRequest = JSON.parse(localStorage.getItem("express_delivery_tracking_request") || "{}");
const pageName = window.location.pathname.split("/").pop() || "tracking.html";
const trackingRecords = {
  "tracking.html": {
    orderId: "EXD-2048-9921",
    receiver: "Pamela F.Campbell",
    sender: "Anthony Francis",
    status: "In Transit",
    eta: "14 - 21 Business Days",
    weight: "26 kg",
    service: "International Cargo"
  },
  "tracking2.html": {
    orderId: "EXD-4587-1204",
    receiver: "Martin Gauthier",
    sender: "Iva Trogrlic",
    status: "In Transit",
    eta: "24 Business Days",
    weight: "23 kg",
    service: "Express Ground"
  },
  "tracking3.html": {
    orderId: "EXD-7812-3345",
    receiver: "Michael Stone",
    sender: "Grace Wilson",
    status: "Out for Delivery",
    eta: "Today",
    weight: "1.5 kg",
    service: "Same Day Express"
  },
  "tracking4.html": {
    orderId: "EXD-9901-7742",
    receiver: "Emily Brown",
    sender: "Daniel Scott",
    status: "In Transit",
    eta: "4 - 6 Business Days",
    weight: "5.1 kg",
    service: "International Air"
  },
  "tracking5.html": {
    orderId: "EXD-6633-1188",
    receiver: "Sophia White",
    sender: "James Walker",
    status: "Arrived at Hub",
    eta: "1 - 2 Business Days",
    weight: "3.7 kg",
    service: "Priority Express"
  },
  "tracking6.html": {
    orderId: "EXD-4402-5567",
    receiver: "Olivia Green",
    sender: "Chris Adams",
    status: "Customs Clearance",
    eta: "5 - 7 Business Days",
    weight: "6.0 kg",
    service: "International Cargo"
  },
  "tracking7.html": {
    orderId: "EXD-8754-2219",
    receiver: "Ethan Hall",
    sender: "Victoria Lee",
    status: "Delivered",
    eta: "Completed",
    weight: "2.2 kg",
    service: "Express Air"
  }
};
const pageRecord = trackingRecords[pageName] || trackingRecords["tracking.html"];
const storedMatchesPage = storedTrackingRequest.page === pageName || storedTrackingRequest.orderId === pageRecord.orderId;
const req = {
  ...pageRecord,
  email: storedMatchesPage ? storedTrackingRequest.email : "-"
};

const defaultRoute = [
  { place: "Zagreb, Croatia", time: "Day 1 - 09:15", lat: 45.8150, lng: 15.9819, note: "Shipment received and registered at origin facility" },
  { place: "Vienna, Austria", time: "Day 3 - 13:40", lat: 48.2082, lng: 16.3738, note: "Departed regional sorting center" },
  { place: "Munich, Germany", time: "Day 5 - 11:20", lat: 48.1351, lng: 11.5820, note: "Arrived at European cargo processing hub" },
  { place: "Frankfurt, Germany", time: "Day 7 - 18:30", lat: 50.1109, lng: 8.6821, note: "Awaiting international cargo departure" },
  { place: "Amsterdam, Netherlands", time: "Day 9 - 09:05", lat: 52.3676, lng: 4.9041, note: "Package processed at EU distribution facility" },
  { place: "London, United Kingdom", time: "Day 11 - 16:50", lat: 51.5072, lng: -0.1276, note: "Transferred to transatlantic cargo route" },
  { place: "Reykjavik, Iceland", time: "Day 13 - 07:40", lat: 64.1466, lng: -21.9426, note: "Technical cargo stop and inspection" },
  { place: "Halifax, Canada", time: "Day 15 - 14:10", lat: 44.6488, lng: -63.5752, note: "Arrived in North America for customs inspection" },
  { place: "Montreal, Canada", time: "Day 17 - 10:30", lat: 45.5017, lng: -73.5673, note: "Cleared customs and transferred to regional hub" },
  { place: "New York, USA", time: "Day 19 - 11:45", lat: 40.7128, lng: -74.0060, note: "Arrived at U.S. import gateway and customs facility" },
  { place: "Chicago, Illinois, USA", time: "Day 21 - 15:30", lat: 41.8781, lng: -87.6298, note: "Transferred to Midwest regional distribution hub" },
  { place: "Kansas City, Missouri, USA", time: "Day 23 - 09:10", lat: 39.0997, lng: -94.5786, note: "Shipment arrived at destination region facility" },
  { place: "St. Joseph, Missouri, USA", time: "Day 24 - 14:25", lat: 39.7675, lng: -94.8467, note: "Courier approaching destination north of Kansas City" }
];

const routeRecords = {
  "tracking.html": [
    { place: "Stockholm, Sweden", time: "Day 1 - 08:45", lat: 59.3293, lng: 18.0686, note: "Cargo received and registered at origin facility" },
    { place: "Gothenburg, Sweden", time: "Day 2 - 14:20", lat: 57.7089, lng: 11.9746, note: "Processed for international cargo transfer" },
    { place: "Copenhagen, Denmark", time: "Day 4 - 10:35", lat: 55.6761, lng: 12.5683, note: "Departed Nordic regional hub" },
    { place: "Hamburg, Germany", time: "Day 6 - 16:10", lat: 53.5511, lng: 9.9937, note: "Arrived at European cargo handling center" },
    { place: "Rotterdam, Netherlands", time: "Day 8 - 12:05", lat: 51.9244, lng: 4.4777, note: "Package processed for transatlantic movement" },
    { place: "London, United Kingdom", time: "Day 10 - 19:30", lat: 51.5072, lng: -0.1276, note: "Transferred to international cargo route" },
    { place: "Reykjavik, Iceland", time: "Day 12 - 07:50", lat: 64.1466, lng: -21.9426, note: "Technical cargo stop completed" },
    { place: "Halifax, Canada", time: "Day 15 - 13:25", lat: 44.6488, lng: -63.5752, note: "Arrived in North America for customs inspection" },
    { place: "New York, USA", time: "Day 17 - 11:15", lat: 40.7128, lng: -74.0060, note: "Awaiting U.S. import gateway processing" },
    { place: "Chicago, Illinois, USA", time: "Day 19 - 15:40", lat: 41.8781, lng: -87.6298, note: "Scheduled for Midwest regional distribution" },
    { place: "Kansas City, Missouri, USA", time: "Day 21 - 09:30", lat: 39.0997, lng: -94.5786, note: "Destination region facility" },
    { place: "St. Joseph, Missouri, USA", time: "Day 21 - 16:10", lat: 39.7675, lng: -94.8467, note: "Final delivery region in Missouri" }
  ]
};

const route = routeRecords[pageName] || defaultRoute;
const currentIndexByPage = {
  "tracking.html": 0
};
const currentIndex = currentIndexByPage[pageName] ?? 1;
const currentStop = route[currentIndex];
const summaryKv = document.getElementById("summaryKv");
const timeline = document.getElementById("timeline");
const currentStopEl = document.getElementById("currentStop");
const safe = (value, fallback = "-") => (value && String(value).trim() ? value : fallback);

const summary = [
  ["Order ID", safe(req.orderId)],
  ["Email", safe(req.email)],
  ["Status", safe(req.status, "In Transit")],
  ["Service", safe(req.service, "Express Air")],
  ["Sender", safe(req.sender, "Sender Name")],
  ["Receiver", safe(req.receiver, "Receiver Name")],
  ["Weight", safe(req.weight)],
  ["ETA", safe(req.eta)]
];

if (summaryKv) {
  summaryKv.innerHTML = summary
    .map(([key, value]) => `<div><b>${key}</b><span>${value}</span></div>`)
    .join("");
}

if (currentStopEl && currentStop) {
  currentStopEl.innerHTML = `
    <h3>${currentStop.place}</h3>
    <p>${currentStop.note}</p>
    <div class="current-meta">
      <span>${currentStop.time}</span>
      <span>${safe(req.status, "In Transit")}</span>
    </div>
  `;
}

if (timeline) {
  timeline.innerHTML = route.map((stop, index) => {
    const statusClass = index < currentIndex ? "passed" : index === currentIndex ? "current" : "upcoming";
    return `
      <div class="step ${statusClass}">
        <div class="bullet"></div>
        <div>
          <b>${stop.place}</b>
          <small>${stop.time} - ${stop.note}</small>
        </div>
      </div>
    `;
  }).join("");
}

if (window.L) {
  const map = L.map("map", { zoomControl: true }).setView([currentStop.lat, currentStop.lng], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  const passedLatLngs = route.slice(0, currentIndex + 1).map(stop => [stop.lat, stop.lng]);
  const upcomingLatLngs = route.slice(currentIndex).map(stop => [stop.lat, stop.lng]);

  if (passedLatLngs.length > 1) {
    L.polyline(passedLatLngs, { color: "#12b76a", weight: 4 }).addTo(map);
  }

  if (upcomingLatLngs.length > 1) {
    L.polyline(upcomingLatLngs, { color: "#98a2b3", weight: 4, dashArray: "8, 8" }).addTo(map);
  }

  route.forEach((stop, index) => {
    const isPassed = index < currentIndex;
    const isCurrent = index === currentIndex;
    const fillColor = isPassed ? "#12b76a" : isCurrent ? "#2035d9" : "#98a2b3";
    const popupStatus = isPassed ? "Passed" : isCurrent ? "Current location" : "Yet to reach";

    L.circleMarker([stop.lat, stop.lng], {
      radius: 7,
      color: "#ffffff",
      weight: 2,
      fillColor,
      fillOpacity: 1
    })
      .addTo(map)
      .bindPopup(`
        <b>${stop.place}</b><br>
        ${stop.time}<br>
        ${stop.note}<br>
        <b>Status:</b> ${popupStatus}
      `);
  });

  const blinkIcon = L.divIcon({
    className: "",
    html: `<div class="blinkDot"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  L.marker([currentStop.lat, currentStop.lng], { icon: blinkIcon })
    .addTo(map)
    .bindPopup(`<b>Current Location</b><br>${currentStop.place}`)
    .openPopup();

  map.fitBounds(L.latLngBounds(route.map(stop => [stop.lat, stop.lng])), { padding: [22, 22] });
}
