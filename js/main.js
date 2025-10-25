let rating = 0;

// STARS
const stars = document.querySelectorAll('.stars span');
stars.forEach(star => {
    star.addEventListener('click', () => {
        rating = parseInt(star.dataset.value);
        updateStars();
        generateReview(); // auto-generate when stars change
    });
    star.addEventListener('touchstart', () => {
        rating = parseInt(star.dataset.value);
        updateStars();
        generateReview(); // also for mobile
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
        generateReview(); // auto-generate when services change
    });
});

function getSelectedServices() {
    return Array.from(servicesBtns)
        .filter(btn => btn.classList.contains('selected'))
        .map(btn => btn.textContent);
}

// ====== LOCAL REVIEW GENERATION LOGIC ======
function generateLocalReview(rating, services) {
    const serviceTexts = {
        Service: {
            1: [
                "The service was disappointing and poorly organized. Staff seemed unsure and my cat didn’t receive the attention expected.",
                "Communication was unclear and the booking felt chaotic. My cat’s needs were often overlooked.",
                "Service quality was below expectations, with minimal interaction and a lack of professionalism.",
            ],
            2: [
                "Service was inconsistent, with moments of care but overall disorganization.",
                "Staff tried to assist but seemed short-staffed, resulting in slow responses.",
                "The service felt rushed and lacked personal touch for my cat’s stay.",
            ],
            3: [
                "The service was average, meeting basic needs without standing out.",
                "Staff handled things reasonably but there was little follow-up or extra care.",
                "Service ran smoothly, though it could have been more engaging and attentive.",
            ],
            4: [
                "Service was efficient and caring, making my cat’s stay pleasant and stress-free.",
                "Staff showed great attention to detail and communication was easy throughout.",
                "Service exceeded expectations — responsive, friendly, and well-organized.",
            ],
            5: [
                "Service was flawless from start to finish, with every detail handled perfectly.",
                "Staff went above and beyond to ensure my cat’s comfort and happiness.",
                "Absolutely outstanding service — smooth, kind, and genuinely professional.",
            ],
        },
        Accommodation: {
            1: [
                "The rooms were small, unclean, and uncomfortable for pets.",
                "Accommodation lacked ventilation and proper hygiene, which made my cat uneasy.",
                "Facilities appeared neglected, with minimal comfort or enrichment for cats.",
            ],
            2: [
                "The rooms were okay but needed better cleaning and maintenance.",
                "Space was limited and some areas felt outdated or poorly managed.",
                "Accommodation was functional but not very inviting for pets.",
            ],
            3: [
                "Rooms were decently kept, offering basic comfort and cleanliness.",
                "Accommodation was fair, providing a safe but not particularly cozy environment.",
                "The setup was practical and suitable for short stays.",
            ],
            4: [
                "The rooms were bright, clean, and well maintained — my cat felt relaxed.",
                "Spacious and tidy accommodations with cozy bedding and play space.",
                "Facilities were well organized, creating a calm and hygienic environment.",
            ],
            5: [
                "The rooms were spotless, beautifully arranged, and truly felt like a home for my cat.",
                "Accommodation was luxurious — clean, spacious, and full of thoughtful touches.",
                "Exceptional comfort and hygiene — my cat settled instantly.",
            ],
        },
        Pricing: {
            1: [
                "Pricing felt unjustified for the level of care provided.",
                "Costs were high given the poor quality of service and facilities.",
                "Definitely not worth the price paid, considering the experience.",
            ],
            2: [
                "A bit overpriced for the overall experience, though not extreme.",
                "Prices didn’t quite match the service quality offered.",
                "Felt slightly expensive for what was included.",
            ],
            3: [
                "Pricing was fair for the basic level of service and accommodation.",
                "Reasonably priced, though some improvements would make it worth more.",
                "The rates seemed balanced with the overall experience.",
            ],
            4: [
                "Good value for the quality received — pricing felt appropriate.",
                "Fairly priced considering the attention and comfort my cat enjoyed.",
                "Reasonable cost for the standard of service provided.",
            ],
            5: [
                "Excellent value — pricing felt completely justified for the care and comfort.",
                "Worth every cent for such professional service and premium facilities.",
                "Great value — I’d happily pay the same again for this level of quality.",
            ],
        },
    };

    // Pick random texts
    let selectedTexts = [];
    services.forEach((service) => {
        const texts = serviceTexts[service]?.[rating];
        if (texts?.length) {
            selectedTexts.push(texts[Math.floor(Math.random() * texts.length)]);
        }
    });

    // Combine text and shuffle slightly
    let combinedText = selectedTexts.join(" ");
    combinedText = combinedText
        .replace(/\s+/g, " ")
        .trim()
        .split(". ")
        .sort(() => Math.random() - 0.5)
        .join(". ");

    // Cap to ~130 words
    const words = combinedText.split(" ");
    if (words.length > 130) combinedText = words.slice(0, 130).join(" ") + ".";

    const intros = {
        1: "Unfortunately, my overall experience was disappointing. ",
        2: "The stay had a few good moments but plenty of issues overall. ",
        3: "My experience was fair — neither bad nor exceptional. ",
        4: "I was very pleased with the overall experience. ",
        5: "An absolutely wonderful stay — everything exceeded expectations. ",
    };
    const summaries = {
        1: "I wouldn’t recommend this place until major improvements are made.",
        2: "There’s potential, but consistency and care need to improve.",
        3: "It’s a decent option if you’re looking for something basic.",
        4: "Highly recommend for anyone wanting a reliable, caring cat hotel.",
        5: "I’ll definitely return — this cattery truly stands out for quality and care!",
    };

    return intros[rating] + combinedText + " " + summaries[rating];
}

// ====== GENERATE REVIEW FUNCTION ======
async function generateReview() {
    const services = getSelectedServices();
    const reviewBox = document.getElementById('review-text');

    if (rating === 0 || services.length === 0) {
        reviewBox.value = '';
        return;
    }

    // Use local generation (no API call)
    const text = generateLocalReview(rating, services);
    reviewBox.value = text;
}

// BUTTON EVENTS
document.getElementById('generate-btn').addEventListener('click', generateReview);

// POST TO GOOGLE REVIEW
document.getElementById('post-btn').addEventListener('click', () => {
    const review = encodeURIComponent(document.getElementById('review-text').value);
    const businessUrl = 'https://www.google.com/search?q=Your+Business+Name&ludocid=YOUR_BUSINESS_LUDOCID#lrd=0x0:0x0,1,,,'; // Replace this
    window.open(businessUrl, '_blank');
});
