function initMap() {
    const defaultLocation = { lat: -25.344, lng: 131.036 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: defaultLocation,
    });

    const marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        draggable: true,
    });

    const pickupInput = document.getElementById('pickup-location');
    const dropoffInput = document.getElementById('dropoff-location');
    const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
    const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput);

    pickupAutocomplete.addListener('place_changed', function () {
        const place = pickupAutocomplete.getPlace();

        if (!place.geometry) {
            alert("No details available for input: '" + place.name + "'");
            return;
        }

        map.setCenter(place.geometry.location);
        map.setZoom(15);

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });

    dropoffAutocomplete.addListener('place_changed', function () {
        const place = dropoffAutocomplete.getPlace();

        if (!place.geometry) {
            alert("No details available for input: '" + place.name + "'");
            return;
        }

        // Optionally, you can handle dropoff location with different marker
    });

    marker.addListener('dragend', function () {
        const position = marker.getPosition();
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: position }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    pickupInput.value = results[0].formatted_address;
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    });

    // Optionally: Add geolocation to set the map to the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            map.setCenter(userLocation);
            map.setZoom(15);
            marker.setPosition(userLocation);
        }, function () {
            alert('Geolocation service failed.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function mapError() {
    alert('Google Maps failed to load. Please check your API key and internet connection.');
}
