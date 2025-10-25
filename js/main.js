let selectedRating = 0;

function setRating(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll('.rating span');
    stars.forEach((star, index) => {
        star.classList.toggle('selected', index < rating);
    });
}

function toggleOption(button) {
    button.classList.toggle('selected');
    generateReview();
}

function generateReview() {
    const selectedOptions = Array.from(document.querySelectorAll('.option.selected')).map(btn => btn.innerText);
    let review = "";

    if (selectedRating === 0 && selectedOptions.length === 0) {
        review = "Please select your star rating and services to generate your review.";
    } else {
        review = `We had a ${selectedRating}-star experience at Cat Heaven Hotel! `;
        if (selectedOptions.length > 0) {
            review += `We especially loved the ${selectedOptions.join(", ")}.`;
        }
    }

    document.getElementById("review-text").value = review;
}

function submitReview() {
    alert("Redirecting you to Google Reviews — thank you for your feedback!");
}
