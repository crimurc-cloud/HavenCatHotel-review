let rating = 0;
let selectedOptions = [];

const stars = document.querySelectorAll('.rating button');
stars.forEach(star => {
    star.addEventListener('click', () => {
        rating = parseInt(star.getAttribute('data-star'));
        updateStarsUI();
    });
});

function updateStarsUI() {
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
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

async function generateAIReview() {
    if (!rating) {
        alert("Please select a star rating first.");
        return;
    }

    const reviewBox = document.getElementById('review-text');
    reviewBox.value = "Generating review...";

    try {
        const response = await fetch('/generate-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rating,
                services: selectedOptions
            })
        });

        const data = await response.json();
        reviewBox.value = data.text;
        reviewBox.style.height = 'auto';
        reviewBox.style.height = reviewBox.scrollHeight + "px";

    } catch (err) {
        reviewBox.value = "Error generating review. Please try again.";
        console.error(err);
    }
}

function submitReview() {
    const googleReviewLink = 'YOUR_GOOGLE_REVIEW_LINK';
    window.location.href = googleReviewLink;
}
