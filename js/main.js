let rating = 0;

// STAR CLICK
const stars = document.querySelectorAll('.rating span');
stars.forEach(star => {
    star.addEventListener('click', () => {
        rating = parseInt(star.dataset.value);
        updateStars();
        generateReview(); // auto generate on star select
    });
    star.addEventListener('touchstart', () => { // mobile support
        rating = parseInt(star.dataset.value);
        updateStars();
        generateReview();
    });
});

function updateStars() {
    stars.forEach((star, i) => {
        star.classList.toggle('selected', i < rating);
    });
}

// SERVICES TOGGLE
const options = document.querySelectorAll('.option');
options.forEach(option => {
    option.addEventListener('click', () => {
        option.classList.toggle('selected');
        generateReview(); // auto generate on service select
    });
});

function getSelectedServices() {
    return Array.from(options)
        .filter(opt => opt.classList.contains('selected'))
        .map(opt => opt.textContent);
}

// GENERATE REVIEW FUNCTION
async function generateReview() {
    const services = getSelectedServices();
    if (rating === 0 || services.length === 0) {
        document.getElementById('review-text').value = '';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/generate-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, services })
        });
        const data = await response.json();
        document.getElementById('review-text').value = data.text || '';
    } catch (err) {
        console.error(err);
        document.getElementById('review-text').value = 'Error generating review';
    }
}
