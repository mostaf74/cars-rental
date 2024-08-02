document.addEventListener('DOMContentLoaded', function () {
    const pickupDate = document.getElementById('pickup-date');
    const dropoffDate = document.getElementById('dropoff-date');

    const now = new Date().toISOString().split('T')[0];
    pickupDate.setAttribute('min', now);
    dropoffDate.setAttribute('min', now);

    pickupDate.addEventListener('change', function () {
        dropoffDate.setAttribute('min', this.value);
    });
});
