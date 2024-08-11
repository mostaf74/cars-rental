function initMap() {
    const defaultLocation = { lat: -25.344, lng: 131.036 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: defaultLocation,
    });

    const marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
    });

    const input = document.getElementById('pickup-location');
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
            alert("No details available for input: '" + place.name + "'");
            return;
        }

        map.setCenter(place.geometry.location);
        map.setZoom(15);

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
}

function mapError() {
    alert('Google Maps failed to load. Please check your API key and internet connection.');
}

