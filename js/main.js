let rating = 0;
let selectedOptions = [];

function setRating(stars) {
    rating = stars;
    generateReview();
}

function toggleOption(element) {
    element.classList.toggle('selected');
    if (element.classList.contains('selected')) {
        selectedOptions.push(element.innerText);
    } else {
        selectedOptions = selectedOptions.filter(opt => opt !== element.innerText);
    }
    generateReview();
}

function generateReview() {
    if (rating && selectedOptions.length) {
        let review = `${rating} star experience! `;
        if (selectedOptions.length) {
            review += selectedOptions.join('. ') + '. ';
        }
        review += "Highly recommend!";
        document.getElementById('review-text').value = review;
    }
}

function submitReview() {
    const googleReviewLink = 'https://example.com/google-review-test';
    const reviewText = document.getElementById('review-text').value;
    window.open(googleReviewLink, '_blank');
}
