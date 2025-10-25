let rating = 0;
let selectedOptions = [];

document.querySelectorAll('.rating span').forEach(star => {
    star.addEventListener('click', () => {
        setRating(parseInt(star.getAttribute('data-star')));
    });
    // Mobile touch support
    star.addEventListener('touchstart', (e) => {
        e.preventDefault();
        setRating(parseInt(star.getAttribute('data-star')));
    });
});

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

    // Base sentence by rating
    switch(rating) {
        case 5: review += "Absolutely fantastic experience! "; break;
        case 4: review += "Great experience overall. "; break;
        case 3: review += "It was okay, could be better. "; break;
        case 2: review += "Not very satisfied, expected more. "; break;
        case 1: review += "Terrible experience. "; break;
    }

    const serviceAttributes = {
        Service: ["Excellent service", "Good service", "Average service", "Poor service", "Very bad service"],
        Staff: ["Friendly staff", "Helpful staff", "Neutral staff", "Rude staff", "Unprofessional staff"],
        Rooms: ["Comfortable rooms", "Decent rooms", "Average rooms", "Uncomfortable rooms", "Terrible rooms"],
        Prices: ["Great price", "Fair price", "Okay price", "Too high price", "Way too expensive"]
    };

    selectedOptions.forEach(opt => {
        let index = 5 - rating;
        if (serviceAttributes[opt]) {
            review += serviceAttributes[opt][index] + ". ";
        }
    });

    if (rating >= 4) review += "Highly recommend!";
    else if (rating === 3) review += "Could improve next time.";
    else review += "Needs serious improvement.";

    const reviewBox = document.getElementById('review-text');
    reviewBox.value = review;
    reviewBox.style.height = 'auto';
    reviewBox.style.height = reviewBox.scrollHeight + "px";
}

function submitReview() {
    const googleReviewLink = 'YOUR_GOOGLE_REVIEW_LINK';
    window.open(googleReviewLink, '_blank');
}
