let rating = 0;

// STARS
const stars = document.querySelectorAll('.stars span');
stars.forEach(star => {
    star.addEventListener('click', () => {
        rating = parseInt(star.dataset.value);
        updateStars();
        generateReview();
    });
    star.addEventListener('touchstart', () => {
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

// SERVICES
const servicesBtns = document.querySelectorAll('.service-btn');
servicesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        generateReview();
    });
});

function getSelectedServices() {
    return Array.from(servicesBtns)
        .filter(btn => btn.classList.contains('selected'))
        .map(btn => btn.textContent);
}

// RATING-BASED TEMPLATES
const templates = {
    Service: {
        1: ["The service was chaotic and frustrating.", "Service quality was poor and unsatisfactory."],
        2: ["The service was below average and needs improvement.", "Customer care was mediocre."],
        3: ["The service was adequate and met expectations.", "Service was satisfactory and acceptable."],
        4: ["The service was very good and well-managed.", "Customer care was reliable and smooth."],
        5: ["The service was excellent and flawless.", "Customer care was outstanding and perfect."]
    },
    Rooms: {
        1: ["The rooms were unacceptable and uncomfortable.", "Accommodation was poorly maintained."],
        2: ["The rooms were mediocre and below expectations.", "Accommodation was acceptable but not great."],
        3: ["The rooms were satisfactory and adequate.", "Accommodation was fine and comfortable."],
        4: ["The rooms were very good and pleasant.", "Accommodation was clean and welcoming."],
        5: ["The rooms were excellent and perfect.", "Accommodation was outstanding and luxurious."]
    },
    Prices: {
        1: ["Pricing was unfair and overpriced.", "Costs were unreasonable for the service."],
        2: ["Pricing was mediocre and not ideal.", "Costs were acceptable but could be better."],
        3: ["Pricing was fair and reasonable.", "Costs were adequate for the services."],
        4: ["Pricing was good and justified.", "Costs were very good relative to service."],
        5: ["Pricing was excellent and perfect.", "Costs were outstanding and fully justified."]
    }
};

// GENERATE REVIEW
function generateReview() {
    const services = getSelectedServices();
    const reviewTextArea = document.getElementById('review-text');

    if (rating === 0 || services.length === 0) {
        reviewTextArea.value = '';
        return;
    }

    let sentences = [];
    services.forEach(service => {
        const tmplList = templates[service][rating];
        const tmpl = tmplList[Math.floor(Math.random() * tmplList.length)];
        sentences.push(tmpl);
    });

    reviewTextArea.value = sentences.join(' ');
}

// POST TO GOOGLE REVIEW
document.getElementById('generate-btn')?.addEventListener('click', generateReview);

document.getElementById('post-btn')?.addEventListener('click', () => {
    const review = encodeURIComponent(document.getElementById('review-text').value);
    const businessUrl = 'https://www.google.com/search?q=Your+Business+Name&ludocid=YOUR_BUSINESS_LUDOCID#lrd=0x0:0x0,1,,,';
    window.open(businessUrl, '_blank');
});
