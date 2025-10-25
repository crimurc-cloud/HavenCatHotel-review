let rating = 0;
let selectedOptions = [];

// ---------- Star Rating ----------
function setRating(stars) {
    rating = stars;
    updateStarsUI();
    generateReview(); // optional: generate as soon as stars are clicked
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

// ---------- Service Buttons ----------
function toggleOption(element) {
    element.classList.toggle('selected');
    if (element.classList.contains('selected')) {
        selectedOptions.push(element.innerText);
    } else {
        selectedOptions = selectedOptions.filter(opt => opt !== element.innerText);
    }
    generateReview(); // optional: generate when options change
}

// ---------- Generate Review via API ----------
async function generateReview() {
    if (!rating) return;

    const reviewBox = document.getElementById('review-text');
    reviewBox.value = "Generating review...";

    try {
        const response = await fetch('http://localhost:3000/generate-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, services: selectedOptions })
        });

        const data = await response.json();
        if (data.text) {
            reviewBox.value = data.text;
        } else {
            reviewBox.value = "Error generating review.";
        }
    } catch (err) {
        console.error(err);
        reviewBox.value = "Error generating review.";
    }

    // Auto-adjust height
    reviewBox.style.height = 'auto';
    reviewBox.style.height = reviewBox.scrollHeight + "px";
}

// ---------- Post Review ----------
function submitReview() {
    const googleReviewLink = 'YOUR_GOOGLE_REVIEW_LINK';
    window.open(googleReviewLink, '_blank');
}
