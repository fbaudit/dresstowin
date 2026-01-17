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
const foodData = {
    breakfast: [
        { name: "Toast & Fried Eggs", image: "https://loremflickr.com/600/400/toast,eggs", description: "Classic and simple start to the day.", calories: 350, sodium: 450 },
        { name: "Pancakes with Syrup", image: "https://loremflickr.com/600/400/pancakes", description: "Fluffy pancakes topped with sweet maple syrup.", calories: 450, sodium: 500 },
        { name: "Cereal & Milk", image: "https://loremflickr.com/600/400/cereal,milk", description: "Quick and easy energy boost.", calories: 250, sodium: 200 },
        { name: "Oatmeal with Fruits", image: "https://loremflickr.com/600/400/oatmeal", description: "Healthy and warm oatmeal topped with fresh fruits.", calories: 300, sodium: 50 },
        { name: "Bagel with Cream Cheese", image: "https://loremflickr.com/600/400/bagel", description: "Chewy bagel spread with smooth cream cheese.", calories: 400, sodium: 450 },
        { name: "Korean Style Breakfast (Rice & Soup)", image: "https://loremflickr.com/600/400/korean,breakfast", description: "Hearty meal with steamed rice, soup, and side dishes.", calories: 500, sodium: 900 },
        { name: "Breakfast Sandwich", image: "https://loremflickr.com/600/400/sandwich", description: "Everything you need in one hand.", calories: 450, sodium: 850 },
        { name: "Yogurt & Granola", image: "https://loremflickr.com/600/400/yogurt", description: "Light and refreshing with a crunch.", calories: 280, sodium: 60 }
    ],
    lunch: [
        { name: "Kimchi Stew (Kimchi Jjigae)", image: "https://loremflickr.com/600/400/kimchi,stew", description: "Spicy and savory stew with kimchi and pork.", calories: 450, sodium: 1200 },
        { name: "Bibimbap", image: "https://loremflickr.com/600/400/bibimbap", description: "Mixed rice with vegetables, meat, and gochujang sauce.", calories: 600, sodium: 1100 },
        { name: "Pork Cutlet (Tonkatsu)", image: "https://loremflickr.com/600/400/tonkatsu", description: "Crispy fried pork cutlet with savory sauce.", calories: 800, sodium: 950 },
        { name: "Pasta (Tomato/Cream)", image: "https://loremflickr.com/600/400/pasta", description: "Classic Italian noodles in tomato or cream sauce.", calories: 700, sodium: 800 },
        { name: "Ramen / Noodles", image: "https://loremflickr.com/600/400/ramen", description: "Quick, hot, and satisfying noodles.", calories: 500, sodium: 1800 },
        { name: "Fried Rice", image: "https://loremflickr.com/600/400/fried,rice", description: "Wok-fried rice with vegetables and meat.", calories: 750, sodium: 900 },
        { name: "Sub Sandwich", image: "https://loremflickr.com/600/400/sub,sandwich", description: "Fresh ingredients packed in a long roll.", calories: 550, sodium: 1100 },
        { name: "Tteokbokki (Spicy Rice Cakes)", image: "https://loremflickr.com/600/400/tteokbokki", description: "Spicy and chewy rice cakes, a popular street food.", calories: 600, sodium: 1300 },
        { name: "Gimbap", image: "https://loremflickr.com/600/400/gimbap", description: "Rice and fillings rolled in dried seaweed.", calories: 400, sodium: 700 }
    ],
    dinner: [
        { name: "Korean BBQ (Samgyeopsal/Galbi)", image: "https://loremflickr.com/600/400/korean,bbq", description: "Grill your own succulent meat at the table.", calories: 900, sodium: 1000 },
        { name: "Chinese Cuisine (Jajangmyeon/Tangsuyuk)", image: "https://loremflickr.com/600/400/chinese,food", description: "Savory black bean noodles or sweet and sour pork.", calories: 850, sodium: 1500 },
        { name: "Japanese Sushi/Sashimi", image: "https://loremflickr.com/600/400/sushi,sashimi", description: "Fresh raw fish and vinegared rice.", calories: 500, sodium: 900 },
        { name: "Western Steak & Pasta", image: "https://loremflickr.com/600/400/steak,pasta", description: "Juicy steak paired with delicious pasta.", calories: 950, sodium: 1200 },
        { name: "Pizza & Salad Bar", image: "https://loremflickr.com/600/400/pizza", description: "Cheesy pizza with a variety of fresh salads.", calories: 800, sodium: 1400 },
        { name: "Fried Chicken & Beer (Chimaek)", image: "https://loremflickr.com/600/400/fried,chicken", description: "Crispy fried chicken paired with cold beer.", calories: 1200, sodium: 1600 },
        { name: "Family Restaurant (Outback/VIPS)", image: "https://loremflickr.com/600/400/restaurant,food", description: "A variety of dishes for the whole family.", calories: 1000, sodium: 1300 },
        { name: "Vietnamese Pho", image: "https://loremflickr.com/600/400/pho,noodle", description: "Warm and aromatic beef noodle soup.", calories: 450, sodium: 1400 },
        { name: "Thai Cuisine", image: "https://loremflickr.com/600/400/thai,food", description: "Exotic flavors with spices and herbs.", calories: 700, sodium: 1300 },
        { name: "Shabu-Shabu", image: "https://loremflickr.com/600/400/shabu,hotpot", description: "Hot pot with thinly sliced meat and vegetables.", calories: 500, sodium: 1500 },
        { name: "Korean Stew (Kimchi/Budae Jjigae)", image: "https://loremflickr.com/600/400/kimchi,stew", description: "Deep and rich flavors of Korean stews.", calories: 600, sodium: 1800 },
        { name: "Burger & Fries", image: "https://loremflickr.com/600/400/burger,fries", description: "Juicy burger with golden crispy fries.", calories: 900, sodium: 1300 }
    ],
    dessert: [
        { name: "Ice Cream / Gelato", image: "https://loremflickr.com/600/400/icecream", description: "Cool and creamy treat in various flavors.", calories: 250, sodium: 50 },
        { name: "Cheesecake", image: "https://loremflickr.com/600/400/cheesecake", description: "Rich and smooth cake with a biscuit base.", calories: 400, sodium: 300 },
        { name: "Fruit Tart", image: "https://loremflickr.com/600/400/fruit,tart", description: "Crispy pastry filled with custard and fresh fruit.", calories: 350, sodium: 100 },
        { name: "Chocolate Brownie", image: "https://loremflickr.com/600/400/brownie", description: "Fudgy chocolate square, perfect with milk.", calories: 300, sodium: 150 },
        { name: "Bingsu (Korean Shaved Ice)", image: "https://loremflickr.com/600/400/bingsu", description: "Shaved ice with sweet red beans and toppings.", calories: 500, sodium: 50 },
        { name: "Macarons", image: "https://loremflickr.com/600/400/macaron", description: "Colorful and delicate almond meringue cookies.", calories: 150, sodium: 20 },
        { name: "Waffles", image: "https://loremflickr.com/600/400/waffle", description: "Crispy outside, fluffy inside, with toppings.", calories: 450, sodium: 400 },
        { name: "Donuts", image: "https://loremflickr.com/600/400/donut", description: "Sweet fried dough, glazed or filled.", calories: 300, sodium: 250 }
    ],
    latenight: [
        { name: "Ramyeon (Instant Noodles)", image: "https://loremflickr.com/600/400/ramyeon", description: "Spicy and quick instant noodles.", calories: 500, sodium: 1900 },
        { name: "Fried Chicken", image: "https://loremflickr.com/600/400/fried,chicken", description: "The ultimate late-night crispy snack.", calories: 1200, sodium: 1600 },
        { name: "Jokbal (Braised Pig's Trotters)", image: "https://loremflickr.com/600/400/jokbal", description: "Chewy and savory braised pork.", calories: 700, sodium: 1400 },
        { name: "Bossam (Boiled Pork Wraps)", image: "https://loremflickr.com/600/400/bossam", description: "Tender boiled pork wrapped in cabbage.", calories: 800, sodium: 1200 },
        { name: "Pizza", image: "https://loremflickr.com/600/400/pizza,slice", description: "A slice of cheesy goodness at night.", calories: 300, sodium: 600 },
        { name: "Tteokbokki", image: "https://loremflickr.com/600/400/tteokbokki", description: "Spicy rice cakes to wake up your taste buds.", calories: 600, sodium: 1300 },
        { name: "Gopchang (Grilled Intestines)", image: "https://loremflickr.com/600/400/gopchang", description: "Chewy grilled intestines, great with soju.", calories: 800, sodium: 1100 },
        { name: "Dakbal (Spicy Chicken Feet)", image: "https://loremflickr.com/600/400/dakbal", description: "Fiery spicy chicken feet for the brave.", calories: 500, sodium: 1500 }
    ]
};

// At Home: Fridge Chef Logic
const recipesDB = [
    { name: "Egg Fried Rice", ingredients: ["rice", "egg", "green onion"], description: "Simple and savory golden fried rice.", image: "https://loremflickr.com/100/100/fried,rice" },
    { name: "Kimchi Fried Rice", ingredients: ["kimchi", "rice", "ham", "pork"], description: "Spicy and addictive fried rice with kimchi.", image: "https://loremflickr.com/100/100/kimchi,rice" },
    { name: "Soy Sauce Egg Rice", ingredients: ["rice", "egg", "soy sauce", "butter"], description: "Comfort food ready in 5 minutes.", image: "https://loremflickr.com/100/100/egg,rice" },
    { name: "Aglio e Olio", ingredients: ["pasta", "garlic", "olive oil"], description: "Classic Italian pasta with garlic and oil.", image: "https://loremflickr.com/100/100/pasta,garlic" },
    { name: "Tuna Mayo Rice", ingredients: ["rice", "tuna", "mayonnaise"], description: "Creamy and savory rice bowl.", image: "https://loremflickr.com/100/100/tuna,rice" },
    { name: "Grilled Cheese Sandwich", ingredients: ["bread", "cheese", "butter"], description: "Crispy, gooey, and delicious.", image: "https://loremflickr.com/100/100/grilled,cheese" },
    { name: "French Toast", ingredients: ["bread", "egg", "milk", "sugar"], description: "Sweet breakfast delight.", image: "https://loremflickr.com/100/100/french,toast" },
    { name: "Potato Stir Fry", ingredients: ["potato", "onion", "carrot"], description: "Simple side dish with julienned potatoes.", image: "https://loremflickr.com/100/100/potato,dish" },
    { name: "Ramen with Egg", ingredients: ["ramen", "egg", "green onion"], description: "Upgrade your instant noodles.", image: "https://loremflickr.com/100/100/ramen" },
    { name: "Kimchi Stew", ingredients: ["kimchi", "pork", "tofu", "onion"], description: "Deep flavor stew perfect for rainy days.", image: "https://loremflickr.com/100/100/kimchi,stew" },
    { name: "Tomato Pasta", ingredients: ["pasta", "tomato", "onion", "garlic"], description: "Basic but tasty tomato sauce pasta.", image: "https://loremflickr.com/100/100/tomato,pasta" },
    { name: "Omelet", ingredients: ["egg", "cheese", "onion", "carrot"], description: "Fluffy eggs with melted cheese.", image: "https://loremflickr.com/100/100/omelet" }
];

// Korean to English Ingredient Map
const ingredientMap = {
    "계란": "egg", "달걀": "egg",
    "밥": "rice", "쌀": "rice",
    "대파": "green onion", "파": "green onion",
    "김치": "kimchi",
    "햄": "ham", "스팸": "ham",
    "돼지고기": "pork", "고기": "pork",
    "간장": "soy sauce",
    "버터": "butter",
    "파스타": "pasta", "면": "pasta",
    "마늘": "garlic",
    "올리브오일": "olive oil", "기름": "oil",
    "참치": "tuna",
    "마요네즈": "mayonnaise",
    "빵": "bread", "식빵": "bread",
    "치즈": "cheese",
    "우유": "milk",
    "설탕": "sugar",
    "감자": "potato",
    "양파": "onion",
    "당근": "carrot",
    "라면": "ramen",
    "두부": "tofu",
    "토마토": "tomato",
    "양배추": "cabbage",
    "소고기": "beef",
    "닭고기": "chicken",
    "고추장": "gochujang",
    "된장": "doenjang"
};

// --- API Key Management ---
const settingsBtn = document.getElementById('settings-btn');
const modal = document.getElementById('settings-modal');
const closeModal = document.querySelector('.close-modal');
const saveKeyBtn = document.getElementById('save-api-key');
const removeKeyBtn = document.getElementById('remove-api-key');
const apiKeyInput = document.getElementById('api-key-input');

settingsBtn.onclick = () => {
    modal.style.display = "block";
    apiKeyInput.value = localStorage.getItem('gemini_api_key') || '';
}
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}

saveKeyBtn.onclick = () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem('gemini_api_key', key);
        alert("API Key saved locally!");
        modal.style.display = "none";
    } else {
        alert("Please enter a valid key.");
    }
}

removeKeyBtn.onclick = () => {
    localStorage.removeItem('gemini_api_key');
    apiKeyInput.value = '';
    alert("API Key removed.");
}

// --- Recipe Search Logic ---
document.getElementById('fridge-btn').addEventListener('click', async () => {
    const input = document.getElementById('fridge-input').value;
    const resultDiv = document.getElementById('fridge-result');
    const btn = document.getElementById('fridge-btn');
    
    if (!input.trim()) {
        alert("Please enter at least one ingredient! (재료를 입력해주세요)");
        return;
    }

    const apiKey = localStorage.getItem('gemini_api_key');
    
    // Fallback to Local Logic if no API Key
    if (!apiKey) {
        if(confirm("AI API Key is missing. Do you want to use basic search instead?\n(For creative AI recipes, click 'Cancel' and set your key in Settings ⚙️)")) {
            runLocalSearch(input);
        }
        return;
    }

    // AI Generation Logic
    btn.innerHTML = "🤖 AI Chef is thinking...";
    btn.disabled = true;
    resultDiv.innerHTML = '<div class="loader">Cooking up recipes...</div>';
    resultDiv.style.display = 'flex';

    try {
        const prompt = `
            You are a creative chef. Suggest exactly 3 distinct recipes based on these ingredients: "${input}".
            You can assume basic pantry items (salt, oil, pepper) are available.
            Return ONLY a JSON object with this structure:
            {
                "recipes": [
                    { "name": "Recipe Name", "description": "Short appetizing description (1 sentence)", "image_keyword": "single_english_keyword_for_image_search" }
                ]
            }
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) throw new Error("API Call Failed");

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        // Parse JSON from text (sometimes Gemini wraps in ```json ... ```)
        const jsonString = text.replace(/```json|```/g, '').trim();
        const recipeData = JSON.parse(jsonString);

        resultDiv.innerHTML = '';
        recipeData.recipes.forEach(item => {
            resultDiv.innerHTML += `
                <div class="recipe-suggestion-card">
                    <img src="https://loremflickr.com/100/100/${item.image_keyword}?random=${Math.random()}" class="recipe-thumb" alt="${item.name}">
                    <div class="recipe-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <p style="font-size: 0.8rem; color: #4285F4; margin-top:5px;">✨ AI Generated Recipe</p>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        alert("AI Generation failed. Check your API Key or Quota. Falling back to local search.");
        runLocalSearch(input);
    } finally {
        btn.innerHTML = "Find Recipes with AI";
        btn.disabled = false;
    }
});

function runLocalSearch(input) {
    const resultDiv = document.getElementById('fridge-result');
    const userIngredients = input.toLowerCase().split(',').map(i => {
        let trimmed = i.trim();
        return ingredientMap[trimmed] || trimmed;
    });
    
    const suggestions = recipesDB.map(recipe => {
        let matchCount = 0;
        let missing = [];
        recipe.ingredients.forEach(ing => {
            if (userIngredients.some(ui => ui.includes(ing) || ing.includes(ui))) matchCount++;
            else missing.push(ing);
        });
        return { ...recipe, matchCount, missing };
    })
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3);

    resultDiv.innerHTML = '';
    resultDiv.style.display = 'flex';

    if (suggestions.length === 0) {
        resultDiv.innerHTML = '<p>No matching local recipes found. Try adding basic ingredients or use an AI Key for better results.</p>';
        return;
    }

    suggestions.forEach(item => {
        const missingText = item.missing.length > 0 ? `(Missing: ${item.missing.join(', ')})` : '(You have all ingredients!)';
        resultDiv.innerHTML += `
            <div class="recipe-suggestion-card">
                <img src="${item.image}?random=${Math.random()}" class="recipe-thumb" alt="${item.name}">
                <div class="recipe-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p style="font-size: 0.8rem; color: var(--button-bg); margin-top:5px;">${missingText}</p>
                </div>
            </div>
        `;
    });
}

let currentMeal = 'dinner';
const generateButton = document.getElementById('generate-button');
const resultContainer = document.getElementById('result-container');
const tabBtns = document.querySelectorAll('.tab-btn');

// Tab Switching Logic
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        // Update state
        currentMeal = btn.dataset.meal;
        
        // Reset result area to placeholder
        resultContainer.innerHTML = '<p class="placeholder-text">Click the button below to get a delicious recommendation!</p>';
    });
});

generateButton.addEventListener('click', () => {
    // Add a simple animation effect
    resultContainer.innerHTML = '<div class="loader">Thinking...</div>';
    
    setTimeout(() => {
        const options = foodData[currentMeal];
        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedFood = options[randomIndex];
        // Add a timestamp to the image URL to prevent browser caching
        const imageUrl = `${selectedFood.image}?random=${Date.now()}`;
        
        resultContainer.innerHTML = `
            <div class="food-card">
                <img src="${imageUrl}" alt="${selectedFood.name}" class="food-image" loading="lazy">
                <h2>${selectedFood.name}</h2>
                <p class="food-description">${selectedFood.description}</p>
                <div class="nutrition-info">
                    <span>🔥 ${selectedFood.calories} kcal (Est.)</span>
                    <span>🧂 ${selectedFood.sodium} mg (Est.)</span>
                </div>
                
                <div class="location-controls">
                    <div class="radius-control">
                        <label for="radius-slider">Search Radius: <span id="radius-value">1</span> km</label>
                        <input type="range" id="radius-slider" min="0.5" max="10" step="0.5" value="1">
                    </div>
                    <button onclick="findNearbyRestaurants('${selectedFood.name.replace(/'/g, "\\'")}')" class="find-nearby-btn">
                        📍 Find Nearby Restaurants
                    </button>
                    <a href="https://www.google.com/search?q=${encodeURIComponent(selectedFood.name + ' nutrition facts calories sodium')}" target="_blank" class="search-link">
                        🔍 Search Nutrition Info
                    </a>
                </div>
            </div>
        `;

        // Re-attach slider event listener since HTML was overwritten
        document.getElementById('radius-slider').addEventListener('input', function(e) {
            document.getElementById('radius-value').textContent = e.target.value;
        });

    }, 500); // 0.5s delay for effect
});

// Geolocation Logic for Nearby Restaurants
function findNearbyRestaurants(foodName) {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    const btn = document.querySelector('.find-nearby-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = "📍 Locating...";
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const radiusKm = document.getElementById('radius-slider').value;
        
        // Approximate Zoom Level mapping based on radius
        // 0.5km -> 16z, 1km -> 15z, 5km -> 13z, 10km -> 12z
        let zoom = 15;
        if (radiusKm <= 0.5) zoom = 16;
        else if (radiusKm <= 2) zoom = 15;
        else if (radiusKm <= 5) zoom = 13;
        else zoom = 12;

        // Construct Google Maps URL
        // query: food name + "near me" (Google Maps handles 'near me' well with coordinates)
        // or just query: food name and set center/zoom
        const query = encodeURIComponent(foodName + " restaurants");
        const mapsUrl = `https://www.google.com/maps/search/${query}/@${lat},${lng},${zoom}z`;
        
        window.open(mapsUrl, '_blank');
        
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, (error) => {
        console.error("Error getting location:", error);
        let msg = "Unable to retrieve your location.";
        if (error.code === 1) msg = "Location permission denied. Please enable location access.";
        alert(msg);
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}


// Teachable Machine - AI Test Logic (Man vs Woman Food Preference)
const URL_TM = "https://teachablemachine.withgoogle.com/models/aDzen0qG6/";
let model, webcam, labelContainer, maxPredictions;
let isRunning = false;

async function initFoodAITest() {
    if (isRunning) return;
    
    const btn = document.getElementById("start-ai-test-btn");
    btn.textContent = "Loading...";
    btn.disabled = true;

    try {
        const modelURL = URL_TM + "model.json";
        const metadataURL = URL_TM + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.innerHTML = ""; // Clear if restarting
        webcam.canvas.style.borderRadius = "10px";
        webcamContainer.appendChild(webcam.canvas);

        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ""; // Clear previous
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            // Create a bar container
            let barWrapper = document.createElement("div");
            barWrapper.className = "label-wrapper";
            
            let nameSpan = document.createElement("span");
            nameSpan.className = "label-name";
            
            let barBg = document.createElement("div");
            barBg.className = "label-bar-bg";
            
            let barFill = document.createElement("div");
            barFill.className = "label-bar-fill";
            
            barBg.appendChild(barFill);
            barWrapper.appendChild(nameSpan);
            barWrapper.appendChild(barBg);
            labelContainer.appendChild(barWrapper);
        }
        
        btn.textContent = "Running...";
        isRunning = true;
    } catch (e) {
        console.error(e);
        btn.textContent = "Error (Check Camera)";
        btn.disabled = false;
        alert("Could not access the camera. Please ensure you have given permission.");
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    
    const bars = document.getElementsByClassName("label-bar-fill");
    const names = document.getElementsByClassName("label-name");

    for (let i = 0; i < maxPredictions; i++) {
        let classPrediction = prediction[i].className;
        
        // Map Dog/Cat labels to Man Like/Woman Like for the context of food preference
        if (classPrediction === "Dog") classPrediction = "Man Like 👨";
        if (classPrediction === "Cat") classPrediction = "Woman Like 👩";

        const probability = prediction[i].probability.toFixed(2);
        
        names[i].textContent = `${classPrediction} (${Math.round(probability * 100)}%)`;
        bars[i].style.width = (probability * 100) + "%";
        
        // Dynamic color for the bar
        if (probability > 0.8) {
             bars[i].style.backgroundColor = "#4CAF50"; // Green for high confidence
        } else if (probability > 0.5) {
             bars[i].style.backgroundColor = "#FF9800"; // Orange for medium
        } else {
             bars[i].style.backgroundColor = "#ccc"; // Grey for low
        }
    }
}

document.getElementById('start-ai-test-btn').addEventListener('click', initFoodAITest);
