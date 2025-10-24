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
            star.classList.add('active');
        } else {
            star.classList.remove('active');
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
    if (!rating) return;

    let review = '';

    // Overall narrative based on rating
    if (rating === 5) review += "Absolutely fantastic experience! ";
    else if (rating === 4) review += "Great experience overall. ";
    else if (rating === 3) review += "It was okay, could be better. ";
    else if (rating === 2) review += "Not very satisfied, expected more. ";
    else review += "Terrible experience. I do not recommend. ";

    // Attribute per selected service
    selectedOptions.forEach(option => {
        if (option === "Service") {
            review += rating >= 4 ? "Excellent service. " : rating === 3 ? "Average service. " : "Poor service. ";
        }
        if (option === "Staff") {
            review += rating >= 4 ? "Friendly and caring staff. " : rating === 3 ? "Staff okay. " : "Unhelpful staff. ";
        }
        if (option === "Rooms") {
            review += rating >= 4 ? "Comfortable rooms. " : rating === 3 ? "Rooms were average. " : "Rooms were uncomfortable. ";
        }
        if (option === "Prices") {
            review += rating >= 4 ? "Reasonable prices. " : rating === 3 ? "Prices could be better. " : "Prices too high. ";
        }
    });

    review += rating >= 4 ? "Highly recommend!" : rating === 3 ? "Could improve next time." : "Needs serious improvement.";

    const reviewBox = document.getElementById('review-text');
    reviewBox.value = review;
    reviewBox.style.height = 'auto';
    reviewBox.style.height = reviewBox.scrollHeight + "px";
}

function submitReview() {
    const googleReviewLink = 'YOUR_GOOGLE_REVIEW_LINK';
    window.open(googleReviewLink, '_blank');
}
