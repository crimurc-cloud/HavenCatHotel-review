let rating = 0;
let selectedOptions = [];

// Mapping of adjectives per star
const serviceAdjectives = {
    "Service": ["Terrible service", "Poor service", "Average service", "Good service", "Excellent service"],
    "Staff": ["Rude staff", "Unfriendly staff", "Neutral staff", "Helpful staff", "Friendly and caring staff"],
    "Rooms": ["Uncomfortable rooms", "Cramped rooms", "Okay rooms", "Comfortable rooms", "Very comfortable rooms"],
    "Prices": ["Too high", "Expensive", "Moderate", "Reasonable prices", "Great value"]
};

// Set rating and update stars UI
function setRating(stars) {
    rating = stars;
    updateStarsUI();
    generateReview();
}

// Highlight stars
function updateStarsUI() {
    const stars = document.querySelectorAll('.rating span');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

// Toggle service selection
function toggleOption(element) {
    element.classList.toggle('selected');
    const service = element.innerText;
    if (element.classList.contains('selected')) {
        if (!selectedOptions.includes(service)) selectedOptions.push(service);
    } else {
        selectedOptions = selectedOptions.filter(opt => opt !== service);
    }
    generateReview();
}

// Generate review based on rating and services
function generateReview() {
    if (!rating) return;
    let review = `I give ${rating} star${rating > 1 ? 's' : ''}. `;

    selectedOptions.forEach(service => {
        review += serviceAdjectives[service][rating - 1] + ". ";
    });

    if (rating >= 4) review += "Highly recommend!";
    else if (rating === 3) review += "Could improve next time.";
    else review += "Needs serious improvement.";

    const reviewBox = document.getElementById('review-text');
    reviewBox.value = review;
    reviewBox.style.height = 'auto';
    reviewBox.style.height = reviewBox.scrollHeight + "px";
}

// Open Google review link
function submitReview() {
    const googleReviewLink = "YOUR_GOOGLE_REVIEW_LINK";
    window.open(googleReviewLink, '_blank');
}
