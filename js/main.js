let rating = 0;

// STARS
const stars = document.querySelectorAll('.stars span');
stars.forEach(star => {
    star.addEventListener('click', () => {
        rating = parseInt(star.dataset.value);
        updateStars();
    });
    star.addEventListener('touchstart', () => {
        rating = parseInt(star.dataset.value);
        updateStars();
    });
});

function updateStars() {
    stars.forEach((star, i) => {
        star.classList.toggle('selected', i < rating);
    });
}

// SERVICES
const servicesBtns = document.querySelectorAll('.service-btn');
servicesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
    });
});

function getSelectedServices() {
    return Array.from(servicesBtns)
        .filter(btn => btn.classList.contains('selected'))
        .map(btn => btn.textContent);
}

// GENERATE REVIEW
async function generateReview() {
    const services = getSelectedServices();
    if (rating === 0 || services.length === 0) {
        document.getElementById('review-text').value = '';
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/generate-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, services })
        });
        const data = await res.json();
        document.getElementById('review-text').value = data.text || '';
    } catch (err) {
        console.error(err);
        document.getElementById('review-text').value = 'Error generating review';
    }
}

// BUTTON EVENTS
document.getElementById('generate-btn').addEventListener('click', generateReview);

// POST TO GOOGLE REVIEW
document.getElementById('post-btn').addEventListener('click', () => {
    const review = encodeURIComponent(document.getElementById('review-text').value);
    const businessUrl = 'https://www.google.com/search?q=Your+Business+Name&ludocid=YOUR_BUSINESS_LUDOCID#lrd=0x0:0x0,1,,,'; // replace with your Google Business review URL
    window.open(businessUrl, '_blank');
});
