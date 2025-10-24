let rating = 0;
let selectedOptions = [];

function setRating(stars) {
    rating = stars;
    updateStarsUI();
    generateReview();
}

function updateStarsUI() {
    const stars = document.querySelectorAll('.rating span');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = "#FFD700";
        } else {
            star.style.color = "#333";
        }
    });
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
        review += selectedOptions.join('. ') + '. ';
        review += "Highly recommend!";
        const reviewBox = document.getElementById('review-text');
        reviewBox.value = review;
        reviewBox.style.height = 'auto'; // reset height
        reviewBox.style.height = reviewBox.scrollHeight + "px"; // adjust to content
    }
}

function submitReview() {
    const googleReviewLink = 'YOUR_GOOGLE_REVIEW_LINK';
    window.open(googleReviewLink, '_blank');
}
