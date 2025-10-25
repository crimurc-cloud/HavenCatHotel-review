let rating = 0;
let selectedOptions = [];

// ---------- Star Rating ----------
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

// ---------- Service Selection ----------
function toggleOption(element) {
    element.classList.toggle('selected');
    if (element.classList.contains('selected')) {
        selectedOptions.push(element.innerText);
    } else {
        selectedOptions = selectedOptions.filter(opt => opt !== element.innerText);
    }
}

// ---------- Generate AI Review ----------
async function generateAIReview() {
    if (!rating) {
        alert("Please select a star rating first!");
        return;
    }

    const reviewBox = document.getElementById('review-text');
    reviewBox.value = "Generating review...";

    try {
        const response = await fetch("http://localhost:3000/generate-review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rating: rating,
                services: selectedOptions
            })
        });

        const data = await response.json();

        if (data.text) {
            reviewBox.value = data.text;
            reviewBox.style.height = 'auto';
            reviewBox.style.height = reviewBox.scrollHeight + "px";
        } else {
            reviewBox.value = "Error generating review.";
        }
    } catch (err) {
        console.error(err);
        reviewBox.value = "Error generating review.";
    }
}

// ---------- Submit Review ----------
function submitReview() {
    const googleReviewLink = 'YOUR_GOOGLE_REVIEW_LINK';
    window.open(googleReviewLink, '_blank');
}
