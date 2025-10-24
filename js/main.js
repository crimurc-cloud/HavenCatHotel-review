let rating = 0;
let selectedOptions = [];

// STAR SELECTION
function setRating(stars) {
    rating = stars;
    updateStars(stars);
    generateReview();
}

function updateStars(stars) {
    document.querySelectorAll('.rating span').forEach((el, i) => {
        el.style.color = (i < stars) ? '#ffc107' : '#000';
    });
}

// OPTIONS SELECTION
function toggleOption(element) {
    element.classList.toggle('selected');
    if (element.classList.contains('selected')) {
        selectedOptions.push(element.innerText);
    } else {
        selectedOptions = selectedOptions.filter(opt => opt !== element.innerText);
    }
    generateReview();
}

// REVIEW GENERATION
function generateReview() {
    const reviewBox = document.getElementById('review-text');
    if (rating && selectedOptions.length) {
        let review = `${rating} star experience! `;
        review += selectedOptions.join('. ') + '. ';
        review += "Highly recommend!";
        reviewBox.value = review;

        // Adjust height
        reviewBox.style.height = 'auto';
        reviewBox.style.height = reviewBox.scrollHeight + "px";
    }
}

// IMPROVE REVIEW BUTTON
function improveReview() {
    const reviewBox = document.getElementById('review-text');
    let text = reviewBox.value;
    if (!text) return alert("Please generate a review first!");

    const templates = [
        `Overall, I had a wonderful experience! ${text}`,
        `In my opinion, this is highly recommended. ${text}`,
        `This service truly stands out! ${text}`,
        `I’m very satisfied with my experience. ${text}`,
        `Definitely a memorable experience! ${text}`
    ];

    const improved = templates[Math.floor(Math.random() * templates.length)];
    reviewBox.value = improved;

    // Adjust height
    reviewBox.style.height = 'auto';
    reviewBox.style.height = reviewBox.scrollHeight + "px";
}

// SUBMIT REVIEW
function submitReview() {
    const googleReviewLink = 'YOUR_GOOGLE_REVIEW_LINK';
    const reviewText = document.getElementById('review-text').value;
    if (!reviewText) return alert("Please generate a review first!");
    window.open(googleReviewLink, '_blank');
}
