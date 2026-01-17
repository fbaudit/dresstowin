// Language Switching Logic
let currentLang = localStorage.getItem('language') || 'en';
const langSelector = document.getElementById('language-selector');

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    langSelector.value = lang;

    // RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.lang = 'ar';
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.lang = lang;
    }

    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Handle HTML content for specific keys
            if (key === 'about_desc1' || key === 'about_desc2') {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Update Placeholders
    const placeholders = {
        'fridge-input': 'placeholder_fridge',
        'ladder-players': 'placeholder_ladder_players',
        'ladder-amount': 'placeholder_ladder_amount',
        'partnership-form input[name="name"]': 'placeholder_name',
        'partnership-form input[name="email"]': 'placeholder_email',
        'partnership-form textarea': 'placeholder_message'
    };

    for (const [selector, key] of Object.entries(placeholders)) {
        const el = document.querySelector(selector.includes('partnership-form') ? `#partnership-form ${selector.split(' ')[1]}` : '#' + selector);
        if (el && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    }
    
    // Refresh Dynamic Content if needed
    // (Ideally, we should re-render current views, but for simplicity we rely on next interaction)
    
    // Update active tab text in Making section immediately if active
    const activeMakingTab = document.querySelector('.making-tab-btn.active');
    if(activeMakingTab) {
        renderRecipe(activeMakingTab.dataset.cuisine);
    }
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
});

langSelector.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});


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


// --- Making: Recipe Blog Logic ---
const blogRecipes = {
    korean: {
        image: "https://loremflickr.com/600/400/kimchi,rice",
        title: {
            en: "Kimchi Fried Rice (Kimchi Bokkeumbap)",
            ko: "김치볶음밥",
            ja: "キムチチャーハン",
            zh: "泡菜炒饭",
            es: "Arroz Frito con Kimchi",
            ar: "أرز مقلي بالكيمتشي"
        },
        intro: {
            en: "A staple of Korean home cooking, Kimchi Fried Rice is the perfect way to use up aging kimchi. It's spicy, savory, and incredibly satisfying.",
            ko: "한국 가정식의 기본, 김치볶음밥은 신김치를 활용하는 최고의 방법입니다. 매콤하고 감칠맛이 넘칩니다.",
            ja: "韓国の家庭料理の定番、キムチチャーハンは、古漬けキムチを使うのに最適です。",
            zh: "作为韩国家常菜的主食，泡菜炒饭是利用陈年泡菜的最佳方式。",
            es: "Un elemento básico de la cocina casera coreana.",
            ar: "عنصر أساسي في الطبخ المنزلي الكوري."
        },
        ingredients: {
            en: ["1 cup Kimchi", "2 cups rice", "100g Pork/Spam", "1 tbsp Gochujang", "1 tbsp Sesame oil", "Fried egg"],
            ko: ["김치 1컵", "밥 2공기", "돼지고기/스팸 100g", "고추장 1큰술", "참기름 1큰술", "계란후라이"],
            ja: ["キムチ 1カップ", "ご飯 2杯", "豚肉/スパム 100g", "コチュジャン 大さじ1", "ごま油 大さじ1", "目玉焼き"],
            zh: ["1杯泡菜", "2碗米饭", "100克猪肉/午餐肉", "1勺韩式辣酱", "1勺香油", "煎蛋"],
            es: ["1 taza Kimchi", "2 tazas arroz", "100g Cerdo/Spam", "1 cda Gochujang", "1 cda Aceite sésamo", "Huevo frito"],
            ar: ["1 كوب كيمتشي", "2 كوب أرز", "100غ لحم/سبام", "1 م.ك غوتشوجانغ", "1 م.ك زيت سمسم", "بيض مقلي"]
        },
        steps: {
            en: ["Stir-fry pork.", "Add kimchi.", "Mix in Gochujang.", "Add rice and mix.", "Add sesame oil.", "Top with egg."],
            ko: ["돼지고기를 볶습니다.", "김치를 넣고 볶습니다.", "고추장을 넣습니다.", "밥을 넣고 잘 섞습니다.", "참기름을 두릅니다.", "계란후라이를 올립니다."],
            ja: ["豚肉を炒める。", "キムチを加える。", "コチュジャンを混ぜる。", "ご飯を加えて混ぜる。", "ごま油をかける。", "目玉焼きを乗せる。"],
            zh: ["炒猪肉。", "加入泡菜。", "加入辣酱。", "加入米饭拌匀。", "淋上香油。", "放上煎蛋。"],
            es: ["Sofreír cerdo.", "Añadir kimchi.", "Mezclar Gochujang.", "Añadir arroz.", "Añadir aceite.", "Poner huevo."],
            ar: ["قلي اللحم.", "أضف الكيمتشي.", "اخلط الغوتشوجانغ.", "أضف الأرز واخلط.", "أضف زيت السمسم.", "ضع البيض."]
        }
    },
    japanese: {
        image: "https://loremflickr.com/600/400/teriyaki,chicken",
        title: { en: "Chicken Teriyaki", ko: "치킨 데리야끼", ja: "照り焼きチキン", zh: "照烧鸡", es: "Pollo Teriyaki", ar: "دجاج ترياكي" },
        intro: { en: "Tender chicken glazed in a sweet and savory sauce.", ko: "달콤 짭짤한 소스로 맛을 낸 부드러운 치킨입니다.", ja: "甘辛いタレが絡んだ柔らかいチキンです。", zh: "甜咸酱汁裹着的嫩滑鸡肉。", es: "Pollo tierno glaseado.", ar: "دجاج طري بصلصة حلوة ومالحة." },
        ingredients: { en: ["Chicken thighs", "Soy sauce", "Mirin", "Sugar"], ko: ["닭다리살", "간장", "미림", "설탕"], ja: ["鶏もも肉", "醤油", "みりん", "砂糖"], zh: ["鸡腿肉", "酱油", "味淋", "糖"], es: ["Muslos pollo", "Salsa soja", "Mirin", "Azúcar"], ar: ["افخاذ دجاج", "صويا صوص", "ميرين", "سكر"] },
        steps: { en: ["Pan-fry chicken.", "Add sauce ingredients.", "Simmer until glazed."], ko: ["닭고기를 굽습니다.", "소스 재료를 넣습니다.", "졸입니다."], ja: ["鶏肉を焼く。", "タレを加える。", "煮詰める。"], zh: ["煎鸡肉。", "加入酱汁。", "炖煮收汁。"], es: ["Freír pollo.", "Añadir salsa.", "Cocinar."], ar: ["قلي الدجاج.", "أضف الصلصة.", "اطهي حتى تتسبك."] }
    },
    chinese: {
        image: "https://loremflickr.com/600/400/tomato,egg",
        title: { en: "Tomato and Egg Stir-fry", ko: "토마토 달걀 볶음", ja: "トマトと卵の炒め物", zh: "西红柿炒鸡蛋", es: "Tomate con Huevo", ar: "بيض بالطماطم" },
        intro: { en: "Comfort food with sweet tomatoes and fluffy eggs.", ko: "달콤한 토마토와 부드러운 계란의 조화.", ja: "トマトと卵の優しい味。", zh: "经典的家常菜。", es: "Comida reconfortante.", ar: "طعام مريح مع طماطم وبيض." },
        ingredients: { en: ["Eggs", "Tomatoes", "Scallion", "Salt"], ko: ["계란", "토마토", "대파", "소금"], ja: ["卵", "トマト", "ネギ", "塩"], zh: ["鸡蛋", "西红柿", "葱", "盐"], es: ["Huevos", "Tomates", "Cebollín", "Sal"], ar: ["بيض", "طماطم", "بصل أخضر", "ملح"] },
        steps: { en: ["Scramble eggs.", "Stir-fry tomatoes.", "Mix together."], ko: ["계란을 스크램블합니다.", "토마토를 볶습니다.", "섞습니다."], ja: ["卵を炒める。", "トマトを炒める。", "混ぜる。"], zh: ["炒鸡蛋。", "炒西红柿。", "混合。"], es: ["Revolver huevos.", "Sofreír tomates.", "Mezclar."], ar: ["اخفق البيض.", "قلي الطماطم.", "اخلط."] }
    },
    dessert: {
        image: "https://loremflickr.com/600/400/brownie",
        title: { en: "Chocolate Brownies", ko: "초콜릿 브라우니", ja: "チョコブラウニー", zh: "巧克力布朗尼", es: "Brownies de Chocolate", ar: "براوني الشوكولاتة" },
        intro: { en: "Fudgy, chewy, and chocolaty.", ko: "꾸덕하고 달콤한 초콜릿 맛.", ja: "濃厚でチューイー。", zh: "浓郁的巧克力味。", es: "Masticable y chocolatoso.", ar: "غني بالشوكولاتة." },
        ingredients: { en: ["Butter", "Sugar", "Eggs", "Cocoa powder", "Flour"], ko: ["버터", "설탕", "계란", "코코아 파우더", "밀가루"], ja: ["バター", "砂糖", "卵", "ココア", "小麦粉"], zh: ["黄油", "糖", "鸡蛋", "可可粉", "面粉"], es: ["Mantequilla", "Azúcar", "Huevos", "Cacao", "Harina"], ar: ["زبدة", "سكر", "بيض", "كاكاو", "طحين"] },
        steps: { en: ["Mix wet ingredients.", "Add dry ingredients.", "Bake."], ko: ["액체 재료를 섞습니다.", "가루 재료를 넣습니다.", "굽습니다."], ja: ["液体材料を混ぜる。", "粉類を加える。", "焼く。"], zh: ["混合湿料。", "加入干料。", "烘烤。"], es: ["Mezclar húmedos.", "Añadir secos.", "Hornear."], ar: ["اخلط السوائل.", "أضف الجاف.", "اخبز."] }
    },
    latenight: {
        image: "https://loremflickr.com/600/400/ramen,egg",
        title: { en: "Kujirai Ramen", ko: "쿠지라이식 라면", ja: "クジライ式ラーメン", zh: "久吉莱拉面", es: "Ramen Kujirai", ar: "رامين كوجيراي" },
        intro: { en: "Less soup, more flavor, creamy egg.", ko: "국물 없이 진한 맛과 부드러운 계란.", ja: "スープ少なめ、濃厚な味。", zh: "汤少味浓。", es: "Menos sopa, más sabor.", ar: "حساء أقل، نكهة أكثر." },
        ingredients: { en: ["Ramen", "Egg", "Cheese", "Green onion"], ko: ["라면", "계란", "치즈", "대파"], ja: ["ラーメン", "卵", "チーズ", "ネギ"], zh: ["拉面", "鸡蛋", "芝士", "葱"], es: ["Ramen", "Huevo", "Queso", "Cebollín"], ar: ["رامين", "بيض", "جبن", "بصل أخضر"] },
        steps: { en: ["Boil noodles with less water.", "Add half seasoning.", "Add egg and cheese.", "Simmer."], ko: ["물 적게 넣고 면 끓이기.", "스프 반만 넣기.", "계란, 치즈 넣기.", "졸이기."], ja: ["少ない水で麺を茹でる。", "スープ半分。", "卵とチーズ。", "煮込む。"], zh: ["少水煮面。", "加半包料。", "加蛋和芝士。", "焖煮。"], es: ["Hervir fideos poca agua.", "Mitad sazón.", "Añadir huevo queso.", "Cocinar."], ar: ["اغلي النودلز بماء قليل.", "نصف البهارات.", "أضف البيض والجبن.", "اطهي."] }
    }
};

const makingTabs = document.querySelectorAll('.making-tab-btn');
const makingContent = document.getElementById('making-content');

function renderRecipe(cuisine) {
    const recipe = blogRecipes[cuisine];
    // Add timestamp to image to avoid caching issues with loremflickr
    const imgUrl = `${recipe.image}?random=${Date.now()}`;
    
    // Get text based on current language, fallback to 'en'
    const getTxt = (obj) => obj[currentLang] || obj['en'];

    makingContent.innerHTML = `
        <img src="${imgUrl}" alt="${getTxt(recipe.title)}" class="blog-header-img" loading="lazy">
        <h2 class="blog-title">${getTxt(recipe.title)}</h2>
        <p class="blog-intro">${getTxt(recipe.intro)}</p>
        
        <div class="recipe-section-title">${(translations[currentLang] && translations[currentLang].ingredients_label) || 'Ingredients'}</div>
        <ul class="ingredient-list">
            ${getTxt(recipe.ingredients).map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        
        <div class="recipe-section-title">${(translations[currentLang] && translations[currentLang].instructions_label) || 'Instructions'}</div>
        <ol class="step-list">
            ${getTxt(recipe.steps).map(step => `<li>${step}</li>`).join('')}
        </ol>
    `;
}

// Event Listeners for Making Tabs
makingTabs.forEach(btn => {
    btn.addEventListener('click', () => {
        makingTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderRecipe(btn.dataset.cuisine);
    });
});

// Initial Render for Making Section
// Wait for DOM load to ensure translations are loaded if needed, but since this is script execution:
// We rely on currentLang being set.
renderRecipe('korean');


// --- Who Pay: Ladder Game Logic ---
const startLadderBtn = document.getElementById('start-ladder-btn');
const ladderCanvas = document.getElementById('ladder-canvas');
const ladderResult = document.getElementById('ladder-result');
const ctx = ladderCanvas.getContext('2d');

startLadderBtn.addEventListener('click', () => {
    const input = document.getElementById('ladder-players').value;
    const amountInput = document.getElementById('ladder-amount').value;
    
    if (!input.trim()) {
        alert("Please enter player names!");
        return;
    }

    const players = input.split(',').map(p => p.trim()).filter(p => p !== "");
    if (players.length < 2) {
        alert("Need at least 2 players!");
        return;
    }
    
    const totalAmount = amountInput ? parseInt(amountInput) : 0;

    document.getElementById('ladder-container').style.display = 'block';
    playLadderGame(players, totalAmount);
});

function playLadderGame(players, totalAmount) {
    const numPlayers = players.length;
    // Canvas Setup
    const width = Math.min(window.innerWidth - 40, numPlayers * 100); 
    const height = 400;
    const padding = 50;
    const colWidth = (width - padding * 2) / (numPlayers - 1);
    
    ladderCanvas.width = width;
    ladderCanvas.height = height;

    // Reset
    ctx.clearRect(0, 0, width, height);
    ladderResult.textContent = "Calculating...";

    // Draw Vertical Lines
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 4;
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#333";

    const lineX = [];
    for (let i = 0; i < numPlayers; i++) {
        const x = padding + i * colWidth;
        lineX.push(x);
        
        // Name at top
        ctx.fillText(players[i], x, 30);
        
        // Line
        ctx.beginPath();
        ctx.moveTo(x, 50);
        ctx.lineTo(x, height - 50);
        ctx.stroke();
    }

    // Generate Random Horizontal Lines (Bridges)
    const bridges = Array.from({ length: numPlayers - 1 }, () => []);
    const numBridgesPerCol = 4 + Math.floor(Math.random() * 3); // 4~6 bridges

    for (let i = 0; i < numPlayers - 1; i++) {
        for (let j = 0; j < numBridgesPerCol; j++) {
            // Random Y between top and bottom padding
            const y = 60 + Math.random() * (height - 120);
            bridges[i].push(y);
        }
        bridges[i].sort((a, b) => a - b);
    }

    // Draw Bridges
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#666";
    for (let i = 0; i < numPlayers - 1; i++) {
        bridges[i].forEach(y => {
            ctx.beginPath();
            ctx.moveTo(lineX[i], y);
            ctx.lineTo(lineX[i+1], y);
            ctx.stroke();
        });
    }

    // Determine Results (Amounts)
    let results = [];
    let maxPayerIndex = 0; // Index of the person paying the most (for highlighting)

    if (totalAmount > 0) {
        // Random Distribution
        // 1. Generate N-1 random cut points in range 0 to totalAmount
        let cuts = [];
        for(let k=0; k < numPlayers - 1; k++) {
            cuts.push(Math.random() * totalAmount);
        }
        cuts.push(0);
        cuts.push(totalAmount);
        cuts.sort((a, b) => a - b);

        let amounts = [];
        for(let k=0; k < numPlayers; k++) {
            let share = cuts[k+1] - cuts[k];
            // Round to nearest 100 for cleaner numbers
            share = Math.round(share / 100) * 100;
            amounts.push(share);
        }

        // Adjust sum mismatch due to rounding
        let currentSum = amounts.reduce((a,b) => a+b, 0);
        let diff = totalAmount - currentSum;
        // Add diff to the largest amount to avoid negative numbers on small shares
        let maxVal = -1;
        let maxIdx = -1;
        amounts.forEach((val, idx) => {
             if(val > maxVal) { maxVal = val; maxIdx = idx; }
        });
        amounts[maxIdx] += diff;

        // Shuffle amounts to randomize positions on ladder bottom
        // (Actually, the ladder path is random, so we can just assign these amounts to bottom slots)
        // Let's just shuffle them to be sure.
        for (let i = amounts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [amounts[i], amounts[j]] = [amounts[j], amounts[i]];
        }
        
        results = amounts.map(a => a.toLocaleString() + ""); // Add currency symbol later or assume implied
        
        // Find who pays the MOST
        let maxAmount = -1;
        amounts.forEach((amt, idx) => {
            if(amt > maxAmount) {
                maxAmount = amt;
                maxPayerIndex = idx;
            }
        });
        
    } else {
        // Loser Takes All Mode
        results = Array(numPlayers).fill("Free");
        const loserIndex = Math.floor(Math.random() * numPlayers);
        results[loserIndex] = "PAY 💸";
        maxPayerIndex = loserIndex;
    }

    // Draw bottom labels
    ctx.font = "bold 14px Arial";
    for (let i = 0; i < numPlayers; i++) {
        const text = results[i];
        // Red for Payer/High amount, Green for Free/Low
        ctx.fillStyle = (i === maxPayerIndex) ? "red" : (text === "Free" || text === "0" ? "green" : "#333");
        ctx.fillText(text, lineX[i], height - 20);
    }

    // Animation: Trace the path from the MAX PAYER spot (bottom) UP to the player
    setTimeout(() => {
        let currentIdx = maxPayerIndex;
        
        // Merge all bridges with their column index for sorting
        let allBridges = [];
        for(let c=0; c < numPlayers-1; c++) {
            bridges[c].forEach(y => allBridges.push({y, col: c}));
        }
        // Sort by Y descending (bottom to top) to trace backwards
        allBridges.sort((a, b) => b.y - a.y);

        // Trace up
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(lineX[currentIdx], height - 50);

        allBridges.forEach(bridge => {
            // bridge connects col and col+1
            if (bridge.col === currentIdx) {
                // Bridge to the right (so we came from right, go right)
                ctx.lineTo(lineX[currentIdx], bridge.y); 
                ctx.lineTo(lineX[currentIdx + 1], bridge.y); 
                currentIdx++;
            } else if (bridge.col === currentIdx - 1) {
                // Bridge to the left (so we came from left, go left)
                ctx.lineTo(lineX[currentIdx], bridge.y); 
                ctx.lineTo(lineX[currentIdx - 1], bridge.y); 
                currentIdx--;
            }
        });

        ctx.lineTo(lineX[currentIdx], 50); // Go to top
        ctx.stroke();

        const payerName = players[currentIdx];
        const payAmount = results[maxPayerIndex];
        
        // --- Added: Full Summary Calculation ---
        let summary = [];
        for (let i = 0; i < numPlayers; i++) {
            // Find which player ends up at bottom slot 'i'
            let playerIdx = i;
            // Trace UP from bottom slot 'i' to find starting player
            allBridges.forEach(bridge => {
                if (bridge.col === playerIdx) playerIdx++;
                else if (bridge.col === playerIdx - 1) playerIdx--;
            });
            summary.push({ name: players[playerIdx], result: results[i] });
        }

        if (totalAmount > 0) {
             ladderResult.innerHTML = `
                <p style="margin-bottom:10px;">😭 ${payerName} pays the most: ${payAmount}!</p>
                <div style="font-size: 0.9rem; border-top: 1px solid #ddd; padding-top: 10px; text-align: left; display: inline-block;">
                    ${summary.map(s => `<div style="margin-bottom:5px;">• ${s.name}: <span style="color:${s.result.includes('PAY') || parseInt(s.result.replace(/,/g,'')) > 0 ? 'red' : 'green'}">${s.result}</span></div>`).join('')}
                </div>
             `;
        } else {
             ladderResult.innerHTML = `
                <p style="margin-bottom:10px;">😭 ${payerName} pays for everything! 💸</p>
                <div style="font-size: 0.9rem; border-top: 1px solid #ddd; padding-top: 10px; text-align: left; display: inline-block;">
                    ${summary.map(s => `<div>• ${s.name}: ${s.result}</div>`).join('')}
                </div>
             `;
        }
        
        // Highlight the loser's name at top
        ctx.fillStyle = "red";
        ctx.font = "bold 20px Arial";
        ctx.fillText("▼", lineX[currentIdx], 15);

    }, 500);
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
