


    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const carType = getQueryParam('car');
    if (carType) {
        document.getElementById('car-type').value = carType;
    }


document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const pickupLocation = document.getElementById('pickup-location').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const carTypeElement = document.getElementById('car-type');
    const rentalDaysElement = document.getElementById('rental-days');
    const price = carTypeElement.options[carTypeElement.selectedIndex].getAttribute('data-price');
    const rentalDays = rentalDaysElement.value;

    if (!pickupLocation) {
        alert('Please enter a pick-up location.');
        return;
    }

    if (!pickupDate) {
        alert('Please select a pick-up date.');
        return;
    }

    if (!carTypeElement.value) {
        alert('Please select a car type.');
        return;
    }

    if (!rentalDays || rentalDays < 1) {
        alert('Please enter a valid number of rental days.');
        return;
    }

    document.getElementById('price').value = price;
    document.getElementById('total-rental-days').value = rentalDays;

    const formData = new FormData(this);
    const queryParams = new URLSearchParams(formData).toString();
    window.location.href = 'payment.ejs?' + queryParams;
});