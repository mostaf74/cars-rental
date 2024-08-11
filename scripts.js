document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector(link.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.createElement('button');
    navToggle.textContent = '☰';
    navToggle.classList.add('nav-toggle');
    document.querySelector('nav .container-fluid').prepend(navToggle);

    navToggle.addEventListener('click', () => {
        document.querySelector('nav ul:nth-of-type(2)').classList.toggle('show');
    });

    // Subscription form validation and submission
    function subscribe(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstname').value.trim();
        const email = document.getElementById('email').value.trim();

        if (firstName === '' || email === '') {
            alert('Please fill in both fields.');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else {
            alert(`Thank you for subscribing, ${firstName}!`);
            // Reset form
            document.getElementById('firstname').value = '';
            document.getElementById('email').value = '';
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', subscribe);
});
function showCarDetails() {
    const carType = document.getElementById("carType").value;
    let details = "";

    switch (carType) {
        case "compact":
            details = "Compact cars are great for city driving and fuel efficiency.";
            break;
        case "sedan":
            details = "Sedans offer comfort and spacious interiors, ideal for families.";
            break;
        case "suv":
            details = "SUVs provide versatility and ample cargo space, perfect for outdoor adventures.";
            break;
        case "luxury":
            details = "Luxury cars combine performance with luxury features, ensuring a premium driving experience.";
            break;
        default:
            details = "Please select a car type to see details.";
            break;
    }

    document.getElementById("carDetails").textContent = details;
}
