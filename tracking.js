const pageName = window.location.pathname.split("/").pop() || "tracking.html";
const params = new URLSearchParams(window.location.search);
const legacyPageCodes = {
  "tracking.html": "EXD-2048-9921",
  "tracking2.html": "EXD-4587-1204",
  "tracking3.html": "EXD-7812-3345",
  "tracking4.html": "EXD-9901-7742",
  "tracking5.html": "EXD-6633-1188",
  "tracking6.html": "EXD-4402-5567",
  "tracking7.html": "EXD-8754-2219"
};
const requestedCode = (params.get("code") || legacyPageCodes[pageName] || "EXD-2048-9921").trim().toUpperCase();

const routeSwedenMissouri = [
  { place: "Stockholm, Sweden", time: "Day 1 - 08:45", lat: 59.3293, lng: 18.0686, note: "Cargo received and registered at origin facility" },
  { place: "Gothenburg, Sweden", time: "Day 2 - 13:30", lat: 57.7089, lng: 11.9746, note: "Shipment processed for international export" },
  { place: "Hamburg, Germany", time: "Day 4 - 09:50", lat: 53.5511, lng: 9.9937, note: "Arrived at European cargo hub for transatlantic dispatch" },
  { place: "Reykjavik, Iceland", time: "Day 6 - 07:20", lat: 64.1466, lng: -21.9426, note: "Technical cargo stop and flight transfer completed" },
  { place: "Halifax, Nova Scotia, Canada", time: "Day 8 - 12:10", lat: 44.6488, lng: -63.5752, note: "Shipment entered North American logistics network and completed customs pre-clearance" },
  { place: "Chicago, Illinois, USA", time: "Day 10 - 10:40", lat: 41.8781, lng: -87.6298, note: "Processed through Midwest regional distribution center" },
  { place: "Kansas City, Missouri, USA", time: "Day 12 - 14:15", lat: 39.0997, lng: -94.5786, note: "Transferred to final regional delivery network" },
  { place: "St. Joseph, Missouri, USA", time: "Day 14 - 11:30", lat: 39.7675, lng: -94.8467, note: "Shipment successfully delivered after customs clearance and regional distribution" }
];

const routeCroatiaAustria = [
  { place: "Zagreb, Croatia", time: "Day 1 - 09:15", lat: 45.8150, lng: 15.9819, note: "Shipment received and registered at origin facility" },
  { place: "Vienna, Austria", time: "Day 3 - 13:40", lat: 48.2082, lng: 16.3738, note: "Departed regional sorting center" },
  { place: "Munich, Germany", time: "Day 5 - 11:20", lat: 48.1351, lng: 11.5820, note: "Arrived at European cargo processing hub" },
  { place: "Frankfurt, Germany", time: "Day 7 - 18:30", lat: 50.1109, lng: 8.6821, note: "Awaiting international cargo departure" },
  { place: "Amsterdam, Netherlands", time: "Day 9 - 09:05", lat: 52.3676, lng: 4.9041, note: "Package processed at EU distribution facility" },
  { place: "London, United Kingdom", time: "Day 11 - 16:50", lat: 51.5072, lng: -0.1276, note: "Transferred to transatlantic cargo route" },
  { place: "Reykjavik, Iceland", time: "Day 13 - 07:40", lat: 64.1466, lng: -21.9426, note: "Technical cargo stop and inspection" },
  { place: "Halifax, Canada", time: "Day 15 - 14:10", lat: 44.6488, lng: -63.5752, note: "Arrived in North America for customs inspection" },
  { place: "New York, USA", time: "Day 19 - 11:45", lat: 40.7128, lng: -74.0060, note: "Arrived at U.S. import gateway and customs facility" },
  { place: "Chicago, Illinois, USA", time: "Day 21 - 15:30", lat: 41.8781, lng: -87.6298, note: "Transferred to Midwest regional distribution hub" }
];

const routeSarajevoOttawaOcean = [
  { place: "Sarajevo, Bosnia and Herzegovina", time: "Day 1 - 09:15", lat: 43.8563, lng: 18.4131, note: "Heavy cargo received and prepared for inland transfer to port" },
  { place: "Port of Ploce, Croatia", time: "Day 3 - 13:40", lat: 43.0525, lng: 17.4327, note: "Cargo checked in at Adriatic export port" },
  { place: "Port of Venice, Italy", time: "Day 7 - 10:20", lat: 45.4408, lng: 12.3155, note: "Container transferred through northern Adriatic freight terminal" },
  { place: "Port of Marsaxlokk, Malta", time: "Day 11 - 16:35", lat: 35.8419, lng: 14.5431, note: "Mediterranean transshipment stop completed" },
  { place: "Port of Valencia, Spain", time: "Day 15 - 09:50", lat: 39.4484, lng: -0.3167, note: "Container processed through western Mediterranean cargo hub" },
  { place: "Port of Sines, Portugal", time: "Day 19 - 14:25", lat: 37.9500, lng: -8.8667, note: "Atlantic crossing departure confirmed" },
  { place: "Port of Montreal, Quebec, Canada", time: "Day 30 - 11:10", lat: 45.5600, lng: -73.5400, note: "Arrived at Canadian ocean freight gateway for import processing" },
  { place: "Ottawa, Ontario, Canada", time: "Day 34 - 15:50", lat: 45.4215, lng: -75.6972, note: "Final inland delivery region after customs release" }
];

const routeUsDomestic = [
  { place: "Los Angeles, California, USA", time: "08:00", lat: 34.0522, lng: -118.2437, note: "Package received by same-day dispatch" },
  { place: "Riverside, California, USA", time: "10:15", lat: 33.9806, lng: -117.3755, note: "Sorted for local courier transfer" },
  { place: "Phoenix, Arizona, USA", time: "13:40", lat: 33.4484, lng: -112.0740, note: "Loaded for final delivery route" },
  { place: "Scottsdale, Arizona, USA", time: "16:20", lat: 33.4942, lng: -111.9261, note: "Courier approaching delivery area" }
];

const routeShanghaiSacramento = [
  { place: "Shanghai, China", time: "Day 1 - 09:20", lat: 31.2304, lng: 121.4737, note: "Shipment received and registered at Shanghai origin facility" },
  { place: "Shanghai Pudong International Airport, China", time: "Day 1 - 18:45", lat: 31.1443, lng: 121.8083, note: "Export screening completed and cargo loaded for international air transfer" },
  { place: "Anchorage, Alaska, USA", time: "Day 3 - 06:30", lat: 61.1744, lng: -149.9964, note: "Pacific air cargo stop completed and shipment transferred toward California" },
  { place: "Los Angeles, California, USA", time: "Day 4 - 14:10", lat: 33.9416, lng: -118.4085, note: "Arrived at U.S. import gateway for customs review" },
  { place: "Ontario, California, USA", time: "Day 5 - 11:25", lat: 34.0633, lng: -117.6509, note: "Released to California regional freight network" },
  { place: "Oakland, California, USA", time: "Day 6 - 09:50", lat: 37.8044, lng: -122.2712, note: "Transferred through Northern California sorting hub" },
  { place: "Sacramento, California, USA", time: "Day 7 - 16:40", lat: 38.5816, lng: -121.4944, note: "Destination city delivery region" }
];


const routeNewYorkLyonEconomy = [
  { place: "New York City, New York, USA", time: "Day 1 - 09:10", lat: 40.7128, lng: -74.0060, note: "Shipment received and registered for economy international freight service" },
  { place: "John F. Kennedy International Airport (JFK), New York, USA", time: "Day 3 - 15:25", lat: 40.6413, lng: -73.7781, note: "Cargo security screening completed and placed into consolidated export storage awaiting scheduled departure" },
  { place: "Shannon Airport Cargo Centre, Ireland", time: "Day 16 - 08:40", lat: 52.7019, lng: -8.9248, note: "Shipment processed through international cargo hub and transferred to consolidated European freight network" },
  { place: "Liège Airport Cargo Terminal, Belgium", time: "Day 34 - 12:15", lat: 50.6374, lng: 5.4432, note: "Cargo temporarily warehoused pending scheduled regional forwarding and customs documentation review" },
  { place: "Charles de Gaulle Airport (CDG), Paris, France", time: "Day 57 - 10:30", lat: 49.0097, lng: 2.5479, note: "Shipment arrived at French import gateway and entered customs clearance procedures" },
  { place: "Lyon Regional Distribution Centre, Lyon, France", time: "Day 73 - 14:50", lat: 45.7640, lng: 4.8357, note: "Released from customs and transferred to local distribution network for final delivery scheduling" },
  { place: "Lyon, France", time: "Day 82 - 11:20", lat: 45.7640, lng: 4.8357, note: "Shipment delivered successfully to the consignee after completion of economy freight transit process" }
];


const routeBeverlyHillsFortPierceExpress = [
  { place: "Beverly Hills, California, USA", time: "Day 1 - 08:30", lat: 34.0736, lng: -118.4004, note: "Shipment collected and transferred to express freight facility" },
  { place: "Ontario Freight Distribution Center, California, USA", time: "Day 1 - 12:45", lat: 34.0633, lng: -117.6509, note: "Express sorting completed and dispatched for cross-country transport" },
  { place: "Dallas Freight Hub, Texas, USA", time: "Day 2 - 09:15", lat: 32.7767, lng: -96.7970, note: "Shipment processed through central express distribution hub" },
  { place: "Orlando Distribution Facility, Florida, USA", time: "Day 3 - 07:40", lat: 28.5383, lng: -81.3792, note: "Shipment arrived in Florida and transferred for final delivery" },
  { place: "Fort Pierce, Florida, USA", time: "Day 3 - 15:20", lat: 27.4467, lng: -80.3256, note: "Shipment successfully delivered to the receiver" }
];
  


const routeBeverlyHillsRoyseCityExpress = [
  {
    place: "Beverly Hills, California, USA",
    time: "Day 1 - 08:15",
    lat: 34.0736,
    lng: -118.4004,
    note: "Shipment collected and prepared for express transportation"
  },
  {
    place: "Ontario Freight Distribution Center, California, USA",
    time: "Day 1 - 12:30",
    lat: 34.0633,
    lng: -117.6509,
    note: "Shipment sorted and dispatched for interstate express delivery"
  },
  {
    place: "Phoenix Logistics Hub, Arizona, USA",
    time: "Day 2 - 07:50",
    lat: 33.4484,
    lng: -112.0740,
    note: "Regional transfer completed and routed toward the destination state"
  },
  {
    place: "Dallas Freight Distribution Center, Texas, USA",
    time: "Day 3 - 08:10",
    lat: 32.7767,
    lng: -96.7970,
    note: "Shipment arrived at the regional distribution hub and prepared for final dispatch"
  },
  {
    place: "Royse City, Texas, USA",
    time: "Day 3 - 15:40",
    lat: 32.9751,
    lng: -96.3325,
    note: "Shipment successfully delivered to the receiver"
  }
];


const shipments = {
  "EXD-2048-9921": {
    orderId: "EXD-2048-9921",
    receiver: "Pamela F.Campbell",
    sender: "Anthony Francisco",
    status: "In Transit",
    eta: "14 Business Days",
    weight: "26 kg",
    service: "International Cargo",
    currentStop: "Stockholm, Sweden",
    // problemStop: "Halifax, Canada",
    // alertMessage: "Attention: Shipment held by customs authorities in Halifax, Canada. Please check your email for more information and instructions.",
    route: routeSwedenMissouri
  },
  "EXD-4587-1204": {
    orderId: "EXD-4587-1204",
    receiver: "Martin Gauthier",
    sender: "Iva Trogrlic",
    status: "In Transit",
    eta: "28 - 35 Days",
    weight: "10,000 kg",
    service: "International Ocean Freight",
    currentStop: "Port of Venice, Italy",
   problemStop: "Port of Venice, Italy",
    alertMessage: "Attention: Shipment held by customs authorities in Port of Venice, Italy. Please check your email for more information and instructions.",
    route: routeSarajevoOttawaOcean
  },
  "EXD-7812-3345": {
    orderId: "EXD-7812-3345",
    receiver: "Nahum Ross",
    sender: "Davinci",
    status: "In Transit",
    eta: "7 Days",
    weight: "2 kg",
    service: "International Air Cargo",
    currentStop: "Ontario, California, USA",
    // Day 4 problem stop and customer alert.
    //problemStop: "Los Angeles, California, USA",
    //alertMessage: "Attention: Shipment held at the Day 4 U.S. import gateway in Los Angeles, California. Please check your email for more information and instructions.",
    route: routeShanghaiSacramento
  },
  
  
  
  "EXD-9901-7742": {
  orderId: "EXD-9901-7742",
  receiver: "Francois Callaud",
  sender: "Ashley Perkins",
  status: "In Transit",
  eta: "60 - 90 Days",
  weight: "22 lb",
  service: "International Economy Freight",
  currentStop: "New York City, New York, USA",
  // problemStop: "Charles de Gaulle Airport (CDG), Paris, France",
  // alertMessage: "Attention: Shipment is awaiting completion of customs processing before release to the regional distribution network. Please check your email if further documentation is required.",
  route: routeNewYorkLyonEconomy
},
  
  
  "EXD-6633-1188": {
  orderId: "EXD-6633-1188",
  receiver: "Donna Raye Morgan",
  sender: "Russell Hartley",
  status: "In Transit",
  eta: "3 Days",
  weight: "5300 lb",
  service: "Domestic Express Freight",
  currentStop: "Dallas Freight Hub, Texas, USA",

  problemStop: "Dallas Freight Hub, Texas, USA",
   alertMessage: "Attention: Shipment processing has been temporarily delayed at the Dallas distribution facility. Tracking will update after the next scheduled transfer. Please check your email if further documentation is required.",

  route: routeBeverlyHillsFortPierceExpress
},


"EXD-4402-5567": {
  orderId: "EXD-4402-5567",
  receiver: "Siobhan Smith",
  sender: "Russell Hartley",
  status: "In Transit",
  eta: "3 Days",
  weight: "5300 lb",
  service: "Domestic Express Freight",
  currentStop: "Ontario Freight Distribution Center, California, USA",

  problemStop: "Phoenix Logistics Hub, Arizona, USA",
  alertMessage: "Attention: Shipment is awaiting the next scheduled dispatch from the  center due to freight consolidation. Please check your email if further documentation is required.",

  route: routeBeverlyHillsRoyseCityExpress
},

  
  "EXD-8754-2219": {
    orderId: "EXD-8754-2219",
    receiver: "Ethan Hall",
    sender: "Victoria Lee",
    status: "Delivered",
    eta: "Completed",
    weight: "2.2 kg",
    service: "Express Air",
    currentStop: "Scottsdale, Arizona, USA",
    route: routeUsDomestic
}
};

const summaryKv = document.getElementById("summaryKv");
const timeline = document.getElementById("timeline");
const currentStopEl = document.getElementById("currentStop");
const alertWrap = document.getElementById("trackAlertWrap");
const alertText = document.getElementById("trackAlertText");
const safe = (value, fallback = "-") => (value && String(value).trim() ? value : fallback);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;"
}[char]));

localStorage.removeItem("express_delivery_tracking_request");

const shipment = shipments[requestedCode];
if (!shipment) {
  renderInvalidTracking(requestedCode);
} else {
  renderShipment(shipment);
}

function renderShipment(req) {
  const route = req.route || [];
  const currentIndex = findStopIndex(route, req.currentStop);
  const currentStop = route[currentIndex] || route[0];
  const problemIndex = req.problemStop ? findStopIndex(route, req.problemStop) : -1;
  const email = sessionStorage.getItem(`express_delivery_email_${req.orderId}`) || "-";

  renderAlert(req.alertMessage);
  renderSummary(req, email);
  renderCurrentStop(req, currentStop, problemIndex === currentIndex);
  renderTimeline(route, currentIndex, problemIndex);
  renderMap(route, currentStop, currentIndex, problemIndex);
}

function renderSummary(req, email) {
  const summary = [
    ["Order ID", safe(req.orderId)],
    ["Email", safe(email)],
    ["Status", safe(req.status, "In Transit")],
    ["Service", safe(req.service, "Express Air")],
    ["Sender", safe(req.sender, "Sender Name")],
    ["Receiver", safe(req.receiver, "Receiver Name")],
    ["Weight", safe(req.weight)],
    ["ETA", safe(req.eta)]
  ];

  if (summaryKv) {
    summaryKv.innerHTML = summary
      .map(([key, value]) => `<div><b>${escapeHtml(key)}</b><span>${escapeHtml(value)}</span></div>`)
      .join("");
  }
}

function renderCurrentStop(req, currentStop, hasProblem) {
  if (!currentStopEl || !currentStop) return;

  currentStopEl.innerHTML = `
    <h3>${escapeHtml(currentStop.place)}</h3>
    <p>${escapeHtml(currentStop.note)}</p>
    <div class="current-meta">
      <span>${escapeHtml(currentStop.time)}</span>
      <span>${escapeHtml(hasProblem ? "Action required" : safe(req.status, "In Transit"))}</span>
    </div>
  `;
}

function renderTimeline(route, currentIndex, problemIndex) {
  if (!timeline) return;

  timeline.innerHTML = route.map((stop, index) => {
    const statusClass = getStopStatus(index, currentIndex, problemIndex);
    const statusLabel = {
      passed: "Left location",
      current: "Current location",
      problem: "Problem stop",
      upcoming: "Upcoming"
    }[statusClass];

    return `
      <div class="step ${statusClass}">
        <div class="bullet"></div>
        <div>
          <b>${escapeHtml(stop.place)}</b>
          <small>${escapeHtml(stop.time)} - ${escapeHtml(stop.note)}</small>
          <small class="step-status">${escapeHtml(statusLabel)}</small>
        </div>
      </div>
    `;
  }).join("");
}

function renderMap(route, currentStop, currentIndex, problemIndex) {
  if (!window.L || !currentStop || !document.getElementById("map")) return;

  const map = L.map("map", { zoomControl: true }).setView([currentStop.lat, currentStop.lng], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  const reachedLatLngs = route.slice(0, currentIndex + 1).map(stop => [stop.lat, stop.lng]);
  const upcomingLatLngs = route.slice(currentIndex).map(stop => [stop.lat, stop.lng]);

  if (reachedLatLngs.length > 1) {
    L.polyline(reachedLatLngs, { color: "#12b76a", weight: 4 }).addTo(map);
  }

  if (upcomingLatLngs.length > 1) {
    L.polyline(upcomingLatLngs, { color: "#98a2b3", weight: 4, dashArray: "8, 8" }).addTo(map);
  }

  route.forEach((stop, index) => {
    const statusClass = getStopStatus(index, currentIndex, problemIndex);
    const colorMap = {
      passed: "#12b76a",
      current: "#155eef",
      problem: "#d92d20",
      upcoming: "#98a2b3"
    };
    const labelMap = {
      passed: "Left location",
      current: "Current location",
      problem: "Problem stop",
      upcoming: "Yet to reach"
    };

    L.circleMarker([stop.lat, stop.lng], {
      radius: statusClass === "current" || statusClass === "problem" ? 8 : 7,
      color: "#ffffff",
      weight: 2,
      fillColor: colorMap[statusClass],
      fillOpacity: 1
    })
      .addTo(map)
      .bindPopup(`
        <b>${escapeHtml(stop.place)}</b><br>
        ${escapeHtml(stop.time)}<br>
        ${escapeHtml(stop.note)}<br>
        <b>Status:</b> ${escapeHtml(labelMap[statusClass])}
      `);
  });

  const markerClass = problemIndex === currentIndex ? "blinkDot problem" : "blinkDot current";
  const blinkIcon = L.divIcon({
    className: "",
    html: `<div class="${markerClass}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  L.marker([currentStop.lat, currentStop.lng], { icon: blinkIcon })
    .addTo(map)
    .bindPopup(`<b>Current Location</b><br>${escapeHtml(currentStop.place)}`)
    .openPopup();

  map.fitBounds(L.latLngBounds(route.map(stop => [stop.lat, stop.lng])), { padding: [22, 22] });
}

function renderAlert(message) {
  if (!alertWrap || !alertText) return;

  if (message) {
    alertText.textContent = message;
    alertWrap.hidden = false;
  } else {
    alertWrap.hidden = true;
  }
}

function renderInvalidTracking(code) {
  renderAlert("");

  if (summaryKv) {
    summaryKv.innerHTML = `
      <div><b>Order ID</b><span>${escapeHtml(code)}</span></div>
      <div><b>Status</b><span>Not found</span></div>
    `;
  }

  if (currentStopEl) {
    currentStopEl.innerHTML = `
      <h3>Tracking code not found</h3>
      <p>Please return to the tracking page and check the Order ID.</p>
    `;
  }

  if (timeline) {
    timeline.innerHTML = "";
  }
}

function findStopIndex(route, place) {
  const index = route.findIndex(stop => stop.place.toLowerCase() === String(place || "").toLowerCase());
  return index >= 0 ? index : 0;
}

function getStopStatus(index, currentIndex, problemIndex) {
  if (index === problemIndex) return "problem";
  if (index < currentIndex) return "passed";
  if (index === currentIndex) return "current";
  return "upcoming";
}
