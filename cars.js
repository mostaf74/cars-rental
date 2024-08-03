document.getElementById('search-input').addEventListener('keyup', function () {
    const query = this.value.toLowerCase();
    const carCards = document.querySelectorAll('.car-card');

    carCards.forEach(card => {
        const carName = card.getAttribute('data-name').toLowerCase();
        const carPrice = card.getAttribute('data-price');

        if (carName.includes(query) || carPrice.includes(query)) {
            card.style.display = 'flex';
            card.classList.add('small-card'); 
        } else {
            card.style.display = 'none';
            card.classList.remove('small-card'); 
        }
    });
});