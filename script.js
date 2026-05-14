// Initialize the map
const map = L.map('map').setView([-6.2, 106.816666], 10); // Jakarta as example

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add geocoder control
const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
}).addTo(map);

// Custom marker icon
const customIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%); border: 2px solid #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

// Function to get dummy NDMI value based on lat/lng
function getDummyNDMI(lat, lng) {
    // Simulate NDMI: random between -0.5 to 0.8
    return (Math.random() - 0.5) * 1.3;
}

// Function to get dummy temperature based on lat/lng
function getDummyTemperature(lat, lng) {
    // Simulate temperature: 20-35°C based on latitude
    return Math.round(20 + Math.abs(lat) * 0.5 + Math.random() * 5);
}

// Function to get crop recommendation based on NDMI
function getCropRecommendation(ndmi) {
    if (ndmi > 0.5) {
        return "Padi, Jagung (kelembaban tinggi)";
    } else if (ndmi > 0) {
        return "Kedelai, Kacang Tanah (kelembaban sedang)";
    } else {
        return "Gandum, Barley (kelembaban rendah)";
    }
}

// Handle search form
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value;
    if (query) {
        geocoder.options.geocoder.geocode(query, function(results) {
            if (results && results.length > 0) {
                const bbox = results[0].bbox;
                map.fitBounds(bbox);
                // Add a temporary marker
                L.marker(results[0].center, {icon: customIcon}).addTo(map)
                    .bindPopup(`<b>${results[0].name}</b><br>Klik untuk info lebih lanjut`)
                    .openPopup();
            }
        });
    }
});

// Add click event to map
map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const ndmi = getDummyNDMI(lat, lng);
    const temperature = getDummyTemperature(lat, lng);
    const recommendation = getCropRecommendation(ndmi);

    // Update info panel
    document.getElementById('coords').textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    document.getElementById('ndmi-value').textContent = ndmi.toFixed(2);
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('recommendation').textContent = recommendation;

    // Show info panel with animation
    const infoPanel = document.getElementById('info');
    infoPanel.classList.add('show');

    // Add animated marker
    const marker = L.marker([lat, lng], {icon: customIcon}).addTo(map);
    marker.bindPopup(`
        <div style="text-align: center;">
            <h5 style="color: #ff6b6b;">Lokasi Terpilih</h5>
            <p><strong>Koordinat:</strong> ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
            <p><strong>NDMI:</strong> ${ndmi.toFixed(2)}</p>
            <p><strong>Suhu:</strong> ${temperature}°C</p>
            <p><strong>Rekomendasi:</strong> ${recommendation}</p>
        </div>
    `).openPopup();

    // Animate marker
    setTimeout(() => {
        marker.setIcon(L.divIcon({
            className: 'custom-marker',
            html: '<div style="width: 25px; height: 25px; border-radius: 50%; background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%); border: 2px solid #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.3); animation: pulse 1s infinite;"></div>',
            iconSize: [25, 25],
            iconAnchor: [12.5, 12.5]
        }));
    }, 500);
});

// Calculator NDMI functionality
document.getElementById('calculateBtn').addEventListener('click', function() {
    const nirValue = parseFloat(document.getElementById('nirInput').value);
    const swirValue = parseFloat(document.getElementById('swirInput').value);

    if (isNaN(nirValue) || isNaN(swirValue)) {
        alert('Harap masukkan nilai NIR dan SWIR yang valid');
        return;
    }

    // Calculate NDMI: (NIR - SWIR) / (NIR + SWIR)
    const ndmi = (nirValue - swirValue) / (nirValue + swirValue);
    
    // Get interpretation
    let interpretation = '';
    if (ndmi > 0.5) {
        interpretation = 'Sangat Lembab ✓';
    } else if (ndmi > 0) {
        interpretation = 'Lembab Sedang';
    } else if (ndmi > -0.5) {
        interpretation = 'Lembab Rendah';
    } else {
        interpretation = 'Kering';
    }

    // Get recommendation
    const recommendation = getCropRecommendation(ndmi);

    // Display result
    document.getElementById('ndmiResult').textContent = ndmi.toFixed(4);
    document.getElementById('ndmiInterpretation').textContent = interpretation;
    document.getElementById('ndmiRecommendation').textContent = recommendation;
    document.getElementById('resultContainer').style.display = 'block';
});

// Add legend
const legend = L.control({position: 'bottomleft'});
legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<h4>Legenda NDMI</h4>' +
        '<i style="background: linear-gradient(135deg, #007bff 0%, #00d4ff 100%);"></i> Lembab Tinggi (NDMI > 0.5)<br>' +
        '<i style="background: linear-gradient(135deg, #28a745 0%, #20e3b2 100%);"></i> Lembab Sedang (0 < NDMI ≤ 0.5)<br>' +
        '<i style="background: linear-gradient(135deg, #ffc107 0%, #ffed4e 100%);"></i> Lembab Rendah (NDMI ≤ 0)<br>';
    return div;
};
legend.addTo(map);

// Add hover tooltip to map
map.on('mousemove', function(e) {
    const tooltip = document.getElementById('tooltip') || createTooltip();
    tooltip.style.left = e.containerPoint.x + 10 + 'px';
    tooltip.style.top = e.containerPoint.y - 30 + 'px';
    tooltip.innerHTML = `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`;
    tooltip.style.display = 'block';
});

map.on('mouseout', function() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) tooltip.style.display = 'none';
});

function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(0,0,0,0.8)';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '1001';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
    return tooltip;
}