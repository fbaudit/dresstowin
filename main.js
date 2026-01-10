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


// Teachable Machine - Animal Test Logic
const URL_TM = "https://teachablemachine.withgoogle.com/models/aDzen0qG6/";
let model, webcam, labelContainer, maxPredictions;
let isRunning = false;

async function initAnimalTest() {
    if (isRunning) return;
    
    const btn = document.getElementById("start-animal-test-btn");
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
        webcamContainer.innerHTML = ""; // Clear if restarting (though simpler logic here just runs once)
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
        const classPrediction = prediction[i].className;
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

document.getElementById('start-animal-test-btn').addEventListener('click', initAnimalTest);
