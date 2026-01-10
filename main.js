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
    "Korean BBQ (Samgyeopsal/Galbi)",
    "Chinese Cuisine (Jajangmyeon/Tangsuyuk)",
    "Japanese Sushi/Sashimi",
    "Western Steak & Pasta",
    "Pizza & Salad Bar",
    "Fried Chicken & Beer (Chimaek)",
    "Family Restaurant (Outback/VIPS)",
    "Vietnamese Pho",
    "Thai Cuisine",
    "Shabu-Shabu",
    "Korean Stew (Kimchi/Budae Jjigae)",
    "Burger & Fries"
];

const generateButton = document.getElementById('generate-button');
const resultContainer = document.getElementById('result-container');

generateButton.addEventListener('click', () => {
    // Add a simple animation effect
    resultContainer.innerHTML = '<div class="loader">Thinking...</div>';
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * foodOptions.length);
        const selectedFood = foodOptions[randomIndex];
        
        resultContainer.innerHTML = `
            <div class="food-card">
                <h2>${selectedFood}</h2>
            </div>
        `;
    }, 500); // 0.5s delay for effect
});