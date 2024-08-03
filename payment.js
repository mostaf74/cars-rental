document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);

    const bookingDetails = {
        name: queryParams.get('name'),
        email: queryParams.get('email'),
        phone: queryParams.get('phone'),
        pickupLocation: queryParams.get('pickup-location'),
        pickupDate: queryParams.get('pickup-date'),
        carType: queryParams.get('car-type'),
        price: parseFloat(queryParams.get('price')),
        rentalDays: parseInt(queryParams.get('rental-days')),
    };

    displayBookingDetails(bookingDetails);
    calculateTotalPayment(bookingDetails.price, bookingDetails.rentalDays);

    document.getElementById('payment-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const isValid = validatePaymentForm();

        if (isValid) {
            alert('Payment completed! Thank you for your booking.');
        
            window.location.href = '';
        }
    });

    function validatePaymentForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('#payment-form [required]');

        requiredFields.forEach(field => {
            const feedbackElement = document.getElementById(`${field.id}-feedback`);
            if (!field.value.trim()) {
                isValid = false;
                feedbackElement.textContent = 'This field is required';
            } else {
                feedbackElement.textContent = '';
            }
        });

        if (!isValidExpiryDate(document.getElementById('expiry-date').value)) {
            isValid = false;
            document.getElementById('expiry-date-feedback').textContent = 'Please enter a valid date';
        }

        if (!isValidCreditCardNumber(document.getElementById('card-number').value)) {
            isValid = false;
            document.getElementById('card-number-feedback').textContent = 'Please enter a valid credit card number';
        }

        if (!isValidCVV(document.getElementById('cvv').value)) {
            isValid = false;
            document.getElementById('cvv-feedback').textContent = 'Please enter a valid CVV';
        }

        if (!validateName(document.getElementById('Nameoncard').value)) {
            isValid = false;
            document.getElementById('Nameoncard-feedback').textContent = 'Please enter a valid name';
        }

        return isValid;
    }

    function displayBookingDetails(details) {
        const detailsContainer = document.getElementById('booking-details');
        detailsContainer.innerHTML = `
            <h3>Booking Details</h3>
            <p><strong>Name:</strong> ${details.name}</p>
            <p><strong>Email:</strong> ${details.email}</p>
            <p><strong>Pick-up Location:</strong> ${details.pickupLocation}</p>
            <p><strong>Pick-up Date:</strong> ${details.pickupDate}</p>
            <p><strong>Car Type:</strong> ${details.carType}</p>
            <p><strong>Price per Day:</strong> $${details.price.toFixed(2)}</p>
        `;
    }

    function calculateTotalPayment(price, rentalDays) {
        const totalPayment = price * rentalDays;
        const totalPaymentContainer = document.getElementById('total-payment');
        totalPaymentContainer.textContent = `Total Payment: $${totalPayment.toFixed(2)}`;
    }

    function validateName(name) {
        const regex = /^[A-Za-z\s]+$/; 
        return regex.test(name);
    }

    function isValidExpiryDate(expiryDate) {
        const [month, year] = expiryDate.split('/').map(Number);
        if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
            return false;
        }
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        return (year > currentYear || (year === currentYear && month >= currentMonth));
    }

    function isValidCreditCardNumber(number) {
        const trimmedNumber = number.replace(/\s+/g, '');
        return !isNaN(trimmedNumber) && trimmedNumber.length === 16;
    }

    function isValidCVV(cvv) {
        const trimmedCVV = cvv.trim();
        return !isNaN(trimmedCVV) && trimmedCVV.length === 3;
    }
});