document.addEventListener("DOMContentLoaded", () => {
    let rating = 0;
    const stars = document.querySelectorAll('.star');
    const servicesBtns = document.querySelectorAll('.option');
    const reviewTextArea = document.getElementById('review-text');

    // STAR selection
    stars.forEach(star => {
        star.addEventListener('click', () => {
            rating = parseInt(star.dataset.value);
            stars.forEach((s, i) => s.classList.toggle('selected', i < rating));
            generateLocalReview();
        });
    });

    // SERVICE buttons selection
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
            reviewTextArea.value = '';
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
                "The service felt {adj} and left a negative impression.",
                "Customer care was {adj}, causing frustration throughout the visit.",
                "Service quality was {adj}, making the experience disappointing.",
                "Handling of requests was {adj}, creating dissatisfaction."
            ],
            "Rooms": [
                "The rooms were {adj}, providing little comfort for my cat.",
                "Accommodation felt {adj}, with inadequate cleanliness and amenities.",
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

        reviewTextArea.value = reviewParts.join(" ");
    }

    // POST TO GOOGLE
    function postReview() {
        const googleReviewLink = 'https://g.page/r/CATTERY_GOOGLE_REVIEW_LINK';
        window.open(googleReviewLink, '_blank');
    }

    // Expose globally
    window.postReview = postReview;
});
