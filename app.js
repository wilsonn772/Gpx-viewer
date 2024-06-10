document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
     const map = L.map('map').setView([51.505, -0.09], 13);
    

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Handle GPX file input
    document.getElementById('gpxFileInput').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const gpx = e.target.result;
                new L.GPX(gpx, {
                    async: true
                }).on('loaded', function(e) {
                    map.fitBounds(e.target.getBounds());
                }).addTo(map);
            };
            reader.readAsText(file);
        }
    }
});
