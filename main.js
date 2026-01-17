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
                <a href="https://www.google.com/search?q=${encodeURIComponent(selectedFood.name + ' nutrition facts calories sodium')}" target="_blank" class="search-link">
                    🔍 Search Nutrition Info on Google
                </a>
            </div>
        `;
    }, 500); // 0.5s delay for effect
});


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
