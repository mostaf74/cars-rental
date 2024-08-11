fetch('https://api.example.com/reviews')
    .then(response => response.json())
    .then(data => {
        const reviews = data.reviews;
        const reviewList = document.getElementById('reviewList');

        reviews.forEach(review => {
            const li = document.createElement('li');
            li.textContent = `${review.text} - ${review.author}`;
            reviewList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching reviews:', error));
