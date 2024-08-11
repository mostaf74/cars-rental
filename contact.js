    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple form validation
      if (name === '' || email === '' || message === '') {
        alert('Please fill in all required fields.');
        return;
      }

      // Name validation regex (only letters)
      const namePattern = /^[a-zA-Z\s]+$/;
      if (!namePattern.test(name)) {
        alert('Please enter a valid name (letters only).');
        return;
      }

      // Email validation regex
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Phone validation regex (only numbers)
      const phonePattern = /^[0-9]*$/;
      if (phone && !phonePattern.test(phone)) {
        alert('Please enter a valid phone number (numbers only).');
        return;
      }

      // If validation passes
      alert('The form has been submitted successfully.');
      // Optionally, you can reset the form here
      document.getElementById('contactForm').reset();
    });
