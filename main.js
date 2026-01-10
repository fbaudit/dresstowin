// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
}

themeToggleBtn.addEventListener('click', function () {
    body.classList.toggle('dark-mode');

    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark-mode';
        themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
        themeToggleBtn.textContent = '🌙 Dark Mode';
    }
    localStorage.setItem('theme', theme);
});

// Food Recommendation Logic
const foodOptions = [
    { name: "Korean BBQ (Samgyeopsal/Galbi)", image: "https://loremflickr.com/600/400/korean,bbq" },
    { name: "Chinese Cuisine (Jajangmyeon/Tangsuyuk)", image: "https://loremflickr.com/600/400/chinese,food" },
    { name: "Japanese Sushi/Sashimi", image: "https://loremflickr.com/600/400/sushi,sashimi" },
    { name: "Western Steak & Pasta", image: "https://loremflickr.com/600/400/steak,pasta" },
    { name: "Pizza & Salad Bar", image: "https://loremflickr.com/600/400/pizza" },
    { name: "Fried Chicken & Beer (Chimaek)", image: "https://loremflickr.com/600/400/fried,chicken" },
    { name: "Family Restaurant (Outback/VIPS)", image: "https://loremflickr.com/600/400/restaurant,food" },
    { name: "Vietnamese Pho", image: "https://loremflickr.com/600/400/pho,noodle" },
    { name: "Thai Cuisine", image: "https://loremflickr.com/600/400/thai,food" },
    { name: "Shabu-Shabu", image: "https://loremflickr.com/600/400/shabu,hotpot" },
    { name: "Korean Stew (Kimchi/Budae Jjigae)", image: "https://loremflickr.com/600/400/kimchi,stew" },
    { name: "Burger & Fries", image: "https://loremflickr.com/600/400/burger,fries" }
];

const generateButton = document.getElementById('generate-button');
const resultContainer = document.getElementById('result-container');

generateButton.addEventListener('click', () => {
    // Add a simple animation effect
    resultContainer.innerHTML = '<div class="loader">Thinking...</div>';
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * foodOptions.length);
        const selectedFood = foodOptions[randomIndex];
        // Add a timestamp to the image URL to prevent browser caching and ensure a fresh image if the same category is picked again, 
        // though strictly for loremflickr it might not be strictly necessary for the 'random' effect on reload, it helps with repeated clicks.
        const imageUrl = `${selectedFood.image}?random=${Date.now()}`;
        
        resultContainer.innerHTML = `
            <div class="food-card">
                <img src="${imageUrl}" alt="${selectedFood.name}" class="food-image">
                <h2>${selectedFood.name}</h2>
            </div>
        `;
    }, 500); // 0.5s delay for effect
});