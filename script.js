// Initialize the map
const map = L.map('map').setView([22.9734, 78.6569], 5);

// Add OpenStreetMap baselayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load India boundary GeoJSON

fetch('india_states.json')
    .then(res => res.json())
    .then(data => {
        L.geoJSON(data, {
            style: { color: '#0074D9', fillColor: '#7FDBFF', fillOpacity: 0.3 },
            onEachFeature: (feature, layer) => {
                layer.bindTooltip(feature.properties.st_nm || "Unknown");
            }
        }).addTo(map);
    });


// Load dummy incident markers
fetch('incidents.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            L.circleMarker([item.lat, item.lng], {
                radius: 8,
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.8
            }).addTo(map)
                .bindPopup(`<b>${item.type}</b><br>${item.location}`);
        });
    });



