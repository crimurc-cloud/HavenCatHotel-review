let rating = 0;
let selectedOptions = [];

function setRating(stars) {
    rating = stars;
    updateStarsUI();
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
}

function generateReview() {
    if (!rating) return;

    let review = "";

    // Star-based narrative
    switch(rating) {
        case 5: review += "Absolutely fantastic experience! "; break;
        case 4: review += "Great experience overall. "; break;
        case 3: review += "It was okay, could be better. "; break;
        case 2: review += "Not very satisfied, expected more. "; break;
        case 1: review += "Terrible experience. I do not recommend. "; break;
    }

    // Selected highlights
    if (selectedOptions.length) {
        review += "Highlights: " + selectedOptions.join(', ') + ". ";
    }

    // Ending comment
    if (rating >= 4) review += "Highly recommend!";
    else if (rating === 3) review += "Could improve next time.";
    else review += "Needs serious improvement.";

    const reviewBox = document.getElementById('review-text');
    reviewBox.value = review;

    // Auto resize textarea
    reviewBox.style.height = 'auto';
    reviewBox.style.height = reviewBox.scrollHeight + "px";
}

function submitReview() {
    const googleReviewLink = 'https://example.com/google-review-test'; // Replace with actual link
    window.open(googleReviewLink, '_blank');
}
