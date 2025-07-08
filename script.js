console.log("Script loaded");
const map = L.map('map').setView([22.9734, 78.6569], 5);
console.log("MarkerClusterGroup available?", typeof L.markerClusterGroup);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


function populateStateDropdown(states) {
    const dropdown = document.getElementById("stateFilter");
    states.sort().forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.text = state;
        dropdown.appendChild(option);
    });
}

const marker = L.markerClusterGroup();
let allIncidents = [];
let incidentMarkers = [];
const markers = L.markerClusterGroup();

function loadIncidents(typeFilter = "all", dateFilter = "") {
    // Clear existing markers and list
    markers.clearLayers();
    incidentMarkers.forEach(m => map.removeLayer(m));
    incidentMarkers = [];

    const list = document.getElementById("incident-list");
    list.innerHTML = "";

    allIncidents.forEach(item => {
        if (typeFilter !== "all" && item.type !== typeFilter) return;
        if (dateFilter && item.date !== dateFilter) return;

        const color = getColor(item.type);
        const marker = L.circleMarker([item.lat, item.lng], {
            radius: 8,
            color: color,
            fillColor: color,
            fillOpacity: 0.8
        }).bindPopup(`<b>${item.type}</b><br>${item.location}<br>${item.date}`);

        markers.addLayer(marker);
        incidentMarkers.push(marker);

        // Add to list
        const li = document.createElement("li");
        li.textContent = `${item.type} - ${item.location}`;
        li.style.cursor = "pointer";
        li.onclick = () => {
            map.setView([item.lat, item.lng], 7);
            marker.openPopup();
        };
        list.appendChild(li);
    });

    map.addLayer(markers);
}

fetch('incidents.json')
    .then(res => res.json())
    .then(data => {
        allIncidents = data;
        displayIncidents(); // Display initially
    });

function displayIncidents() {
    if (window.markersLayer) {
        map.removeLayer(window.markersLayer); // remove old markers
    }

    const markers = L.markerClusterGroup();
    const selectedType = document.getElementById("filter").value;
    const selectedState = document.getElementById("stateFilter").value;
    const selectedDate = document.getElementById("date").value;

    const filtered = allIncidents.filter(item => {
        const typeMatch = selectedType === "all" || item.type === selectedType;
        const stateMatch = selectedState === "all" || item.state === selectedState;
        const dateMatch = !selectedDate || item.date === selectedDate;
        return typeMatch && stateMatch && dateMatch;
    });

    filtered.forEach(item => {
        const color = getColor(item.type);
        const marker = L.circleMarker([item.lat, item.lng], {
            radius: 8,
            color,
            fillColor: color,
            fillOpacity: 0.8
        }).bindPopup(`
      <b>${item.type}</b><br>
      ${item.location}<br>
      <b>Date:</b> ${item.date}
    `);
        markers.addLayer(marker);
    });

    window.markersLayer = markers;
    map.addLayer(markers);

    // Zoom to state
    if (selectedState !== "all" && stateBoundaries[selectedState]) {
        map.fitBounds(stateBoundaries[selectedState]);
    } else {
        map.setView([22.9734, 78.6569], 5); // Reset to India center
    }
}

function getColor(type) {
    switch (type) {
        case "Flood": return "blue";
        case "Rain": return "green";
        case "Storm": return "orange";
        default: return "red";
    }
}

const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    const types = ["Flood", "Cyclone", "Earthquake"];
    const colors = ["blue", "green", "orange"];

    div.innerHTML = "<strong>Incident Type</strong><br>";
    types.forEach((type, i) => {
        div.innerHTML +=
            `<i style="background:${colors[i]}; width:10px; height:10px; display:inline-block; margin-right:5px;"></i>${type}<br>`;
    });
    return div;
};

legend.addTo(map);
document.getElementById("filter").addEventListener("change", () => {
    const type = document.getElementById("filter").value;
    const date = document.getElementById("date").value;
    loadIncidents(type, date);
});

document.getElementById("date").addEventListener("change", () => {
    const type = document.getElementById("filter").value;
    const date = document.getElementById("date").value;
    loadIncidents(type, date);
});

document.getElementById("filter").addEventListener("change", displayIncidents);
document.getElementById("date").addEventListener("change", displayIncidents);
document.getElementById("stateFilter").addEventListener("change", displayIncidents);




