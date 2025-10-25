let rating = 0;

// STARS
const stars = document.querySelectorAll('.stars span');
stars.forEach(star => {
    star.addEventListener('click', () => {
        rating = parseInt(star.dataset.value);
        updateStars();
        generateLocalReview();
    });
    star.addEventListener('touchstart', () => {
        rating = parseInt(star.dataset.value);
        updateStars();
        generateLocalReview();
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
        generateLocalReview();
    });
});

function getSelectedServices() {
    return Array.from(servicesBtns)
        .filter(btn => btn.classList.contains('selected'))
        .map(btn => btn.textContent);
}

// GENERATE LOCAL REVIEW
function generateLocalReview() {
    const services = getSelectedServices();
    if (rating === 0 || services.length === 0) {
        document.getElementById('review-text').value = '';
        return;
    }

    const serviceAdjectives = {
        1: ["inadequate", "chaotic", "unsatisfactory", "poor", "disorganized"],
        2: ["average", "mediocre", "acceptable", "okay", "moderate"],
        3: ["good", "satisfactory", "pleasant", "decent", "adequate"],
        4: ["very good", "impressive", "well-managed", "comfortable", "pleasing"],
        5: ["excellent", "perfect", "exceptional", "outstanding", "flawless"]
    };

    const serviceTemplates = {
        "Service": [
            "The service was {adj}, failing to meet expectations.",
            "The service felt {adj} and left a lasting impression.",
            "Customer care was {adj}, creating noticeable frustration.",
            "Service quality was {adj}, making the experience disappointing.",
            "Handling of requests was {adj}, causing dissatisfaction."
        ],
        "Rooms": [
            "The rooms were {adj}, providing minimal comfort for my cat.",
            "Accommodation felt {adj}, with insufficient cleanliness and amenities.",
            "The environment in the rooms was {adj}, not suitable for pets.",
            "Rooms were {adj}, leaving a poor impression overall.",
            "My cat seemed uncomfortable due to {adj} rooms."
        ],
        "Prices": [
            "Pricing was {adj}, not justified for the quality received.",
            "Costs were {adj}, making the experience feel overpriced.",
            "The price felt {adj}, considering the substandard service.",
            "Pricing was {adj}, reflecting poor value for the visit.",
            "Prices were {adj}, leaving me dissatisfied with the overall experience."
        ]
    };

    let reviewParts = [];

    services.forEach(service => {
        const templates = serviceTemplates[service];
        const template = templates[Math.floor(Math.random() * templates.length)];
        const adjList = serviceAdjectives[rating];
        const adj = adjList[Math.floor(Math.random() * adjList.length)];
        reviewParts.push(template.replace("{adj}", adj));
    });

    // Combine review parts and limit to 130 words
    let review = reviewParts.join(" ");
    const words = review.split(" ");
    if (words.length > 130) {
        review = words.slice(0, 130).join(" ") + ".";
    }

    document.getElementById('review-text').value = review;
}

// BUTTON EVENTS
document.getElementById('generate-btn').addEventListener('click', generateLocalReview);

// POST TO GOOGLE REVIEW
document.getElementById('post-btn').addEventListener('click', () => {
    const review = encodeURIComponent(document.getElementById('review-text').value);
    const businessUrl = 'https://www.google.com/search?q=Your+Business+Name&ludocid=YOUR_BUSINESS_LUDOCID#lrd=0x0:0x0,1,,,'; // replace with your Google Business review URL
    window.open(businessUrl, '_blank');
});
