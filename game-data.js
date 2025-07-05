// Game Data - Drink Recipes and Educational Content
const gameData = {
    ingredients: {
        // Basic Ingredients
        water: { name: "Water", emoji: "💧", color: "#e3f2fd" },
        ice: { name: "Ice", emoji: "🧊", color: "#f0f8ff" },
        lemon: { name: "Lemon", emoji: "🍋", color: "#fff9c4" },
        lime: { name: "Lime", emoji: "🟢", color: "#e8f5e8" },
        sugar: { name: "Sugar", emoji: "🍯", color: "#fff3e0" },
        mint: { name: "Mint", emoji: "🌿", color: "#e8f5e8" },
        
        // Juices
        orange_juice: { name: "Orange Juice", emoji: "🍊", color: "#ffcc80" },
        cranberry_juice: { name: "Cranberry Juice", emoji: "🫐", color: "#f8bbd9" },
        pineapple_juice: { name: "Pineapple Juice", emoji: "🍍", color: "#fff59d" },
        tomato_juice: { name: "Tomato Juice", emoji: "🍅", color: "#ffcdd2" },
        grapefruit_juice: { name: "Grapefruit Juice", emoji: "🍋‍🟩", color: "#fff3e0" },
        
        // Coffee & Tea
        coffee: { name: "Coffee", emoji: "☕", color: "#8d6e63" },
        espresso: { name: "Espresso", emoji: "☕", color: "#5d4037" },
        tea: { name: "Tea", emoji: "🍵", color: "#c8e6c9" },
        milk: { name: "Milk", emoji: "🥛", color: "#ffffff" },
        
        // Syrups & Sweeteners
        simple_syrup: { name: "Simple Syrup", emoji: "🍯", color: "#fff3e0" },
        grenadine: { name: "Grenadine", emoji: "🍒", color: "#ffcdd2" },
        honey: { name: "Honey", emoji: "🍯", color: "#fff3e0" },
        
        // Spirits (Advanced)
        vodka: { name: "Vodka", emoji: "🍸", color: "#f5f5f5" },
        rum: { name: "Rum", emoji: "🥃", color: "#ffcc80" },
        gin: { name: "Gin", emoji: "🍸", color: "#e8f5e8" },
        whiskey: { name: "Whiskey", emoji: "🥃", color: "#d7ccc8" },
        tequila: { name: "Tequila", emoji: "🍹", color: "#fff3e0" },
        triple_sec: { name: "Triple Sec", emoji: "🍊", color: "#ffcc80" },
        
        // Garnishes
        cherry: { name: "Cherry", emoji: "🍒", color: "#ffcdd2" },
        orange_slice: { name: "Orange Slice", emoji: "🍊", color: "#ffcc80" },
        lime_wedge: { name: "Lime Wedge", emoji: "🟢", color: "#e8f5e8" },
        celery: { name: "Celery", emoji: "🥬", color: "#e8f5e8" },
        olive: { name: "Olive", emoji: "🫒", color: "#dcedc8" },
        
        // Spices & Extras
        salt: { name: "Salt", emoji: "🧂", color: "#f5f5f5" },
        pepper: { name: "Pepper", emoji: "🌶️", color: "#ffcdd2" },
        tabasco: { name: "Tabasco", emoji: "🌶️", color: "#ffcdd2" },
        worcestershire: { name: "Worcestershire", emoji: "🍯", color: "#8d6e63" },
        bitters: { name: "Bitters", emoji: "🍯", color: "#8d6e63" }
    },

    levels: [
        // Level 1-3: Simple Non-Alcoholic Drinks
        {
            level: 1,
            drink: "Lemonade",
            difficulty: "Easy",
            timeLimit: 60,
            ingredients: [
                { name: "water", amount: "1 cup", required: true },
                { name: "lemon", amount: "2 lemons", required: true },
                { name: "sugar", amount: "2 tbsp", required: true },
                { name: "ice", amount: "1 cup", required: true }
            ],
            steps: [
                "Squeeze fresh lemon juice",
                "Add sugar to water",
                "Mix until sugar dissolves",
                "Add lemon juice",
                "Add ice cubes",
                "Stir well"
            ],
            actions: ["stir", "serve"],
            education: {
                fact: "Lemonade was first documented in 17th century Paris, where it was sold by vendors on the streets!",
                tips: "Always add sugar to water before adding acidic lemon juice for better dissolution."
            }
        },
        {
            level: 2,
            drink: "Iced Coffee",
            difficulty: "Easy",
            timeLimit: 45,
            ingredients: [
                { name: "coffee", amount: "1 cup", required: true },
                { name: "milk", amount: "1/4 cup", required: true },
                { name: "sugar", amount: "1 tbsp", required: false },
                { name: "ice", amount: "1 cup", required: true }
            ],
            steps: [
                "Brew strong coffee",
                "Let coffee cool",
                "Add milk to coffee",
                "Sweeten if desired",
                "Add ice cubes",
                "Stir gently"
            ],
            actions: ["stir", "serve"],
            education: {
                fact: "Iced coffee was invented in 1840s Algeria by French colonial troops who mixed coffee with cold water!",
                tips: "Brew coffee stronger than usual since ice will dilute it."
            }
        },
        {
            level: 3,
            drink: "Virgin Mojito",
            difficulty: "Easy",
            timeLimit: 90,
            ingredients: [
                { name: "mint", amount: "8 leaves", required: true },
                { name: "lime", amount: "1 lime", required: true },
                { name: "sugar", amount: "2 tsp", required: true },
                { name: "water", amount: "1 cup", required: true },
                { name: "ice", amount: "1 cup", required: true }
            ],
            steps: [
                "Muddle mint leaves gently",
                "Add lime juice",
                "Add sugar",
                "Fill with sparkling water",
                "Add ice cubes",
                "Garnish with mint sprig"
            ],
            actions: ["stir", "garnish", "serve"],
            education: {
                fact: "The Mojito originated in Cuba and was supposedly Ernest Hemingway's favorite drink!",
                tips: "Gentle muddling releases oils without breaking leaves into small pieces."
            }
        },

        // Level 4-6: Medium Complexity Drinks
        {
            level: 4,
            drink: "Sunrise Mocktail",
            difficulty: "Medium",
            timeLimit: 75,
            ingredients: [
                { name: "orange_juice", amount: "1 cup", required: true },
                { name: "cranberry_juice", amount: "1/4 cup", required: true },
                { name: "grenadine", amount: "1 tbsp", required: true },
                { name: "ice", amount: "1 cup", required: true },
                { name: "orange_slice", amount: "1 slice", required: true }
            ],
            steps: [
                "Fill glass with ice",
                "Pour orange juice slowly",
                "Add cranberry juice",
                "Slowly pour grenadine",
                "Do not stir - let it settle",
                "Garnish with orange slice"
            ],
            actions: ["garnish", "serve"],
            education: {
                fact: "Layered drinks work because of different sugar densities - heavier liquids sink!",
                tips: "Pour slowly over the back of a spoon to create distinct layers."
            }
        },
        {
            level: 5,
            drink: "Virgin Bloody Mary",
            difficulty: "Medium",
            timeLimit: 120,
            ingredients: [
                { name: "tomato_juice", amount: "1 cup", required: true },
                { name: "lemon", amount: "1/2 lemon", required: true },
                { name: "worcestershire", amount: "1 tsp", required: true },
                { name: "tabasco", amount: "3 drops", required: true },
                { name: "salt", amount: "pinch", required: true },
                { name: "pepper", amount: "pinch", required: true },
                { name: "celery", amount: "1 stalk", required: true },
                { name: "ice", amount: "1 cup", required: true }
            ],
            steps: [
                "Rim glass with salt",
                "Add ice to glass",
                "Pour tomato juice",
                "Add lemon juice",
                "Add worcestershire sauce",
                "Add tabasco sauce",
                "Season with salt and pepper",
                "Stir well",
                "Garnish with celery"
            ],
            actions: ["stir", "garnish", "serve"],
            education: {
                fact: "The Bloody Mary was invented in 1921 at Harry's Bar in Paris by bartender Fernand Petiot!",
                tips: "Rim the glass with celery salt for extra flavor complexity."
            }
        },
        {
            level: 6,
            drink: "Tropical Paradise",
            difficulty: "Medium",
            timeLimit: 90,
            ingredients: [
                { name: "pineapple_juice", amount: "1/2 cup", required: true },
                { name: "orange_juice", amount: "1/2 cup", required: true },
                { name: "cranberry_juice", amount: "1/4 cup", required: true },
                { name: "lime", amount: "1 lime", required: true },
                { name: "simple_syrup", amount: "1 tbsp", required: true },
                { name: "ice", amount: "1 cup", required: true },
                { name: "cherry", amount: "1 cherry", required: true }
            ],
            steps: [
                "Add ice to shaker",
                "Pour all juices",
                "Add lime juice",
                "Add simple syrup",
                "Shake vigorously",
                "Strain into glass",
                "Garnish with cherry"
            ],
            actions: ["shake", "garnish", "serve"],
            education: {
                fact: "Tropical drinks became popular in the 1930s during the Tiki culture movement in America!",
                tips: "Shake citrus-based drinks vigorously to properly mix and chill."
            }
        },

        // Level 7-10: Complex Cocktails (Advanced)
        {
            level: 7,
            drink: "Classic Mojito",
            difficulty: "Hard",
            timeLimit: 120,
            ingredients: [
                { name: "rum", amount: "2 oz", required: true },
                { name: "mint", amount: "10 leaves", required: true },
                { name: "lime", amount: "1 lime", required: true },
                { name: "sugar", amount: "2 tsp", required: true },
                { name: "water", amount: "1/2 cup", required: true },
                { name: "ice", amount: "1 cup", required: true }
            ],
            steps: [
                "Gently muddle mint with sugar",
                "Add lime juice",
                "Add white rum",
                "Fill with sparkling water",
                "Add ice cubes",
                "Stir gently",
                "Garnish with mint sprig"
            ],
            actions: ["stir", "garnish", "serve"],
            education: {
                fact: "The Mojito was allegedly invented at La Bodeguita del Medio in Havana, Cuba in the 1940s!",
                tips: "Use light rum for authentic flavor, and never over-muddle the mint."
            }
        },
        {
            level: 8,
            drink: "Margarita",
            difficulty: "Hard",
            timeLimit: 100,
            ingredients: [
                { name: "tequila", amount: "2 oz", required: true },
                { name: "triple_sec", amount: "1 oz", required: true },
                { name: "lime", amount: "1 lime", required: true },
                { name: "salt", amount: "for rim", required: true },
                { name: "ice", amount: "1 cup", required: true },
                { name: "lime_wedge", amount: "1 wedge", required: true }
            ],
            steps: [
                "Rim glass with salt",
                "Add ice to shaker",
                "Add tequila",
                "Add triple sec",
                "Add fresh lime juice",
                "Shake vigorously",
                "Strain into glass",
                "Garnish with lime wedge"
            ],
            actions: ["shake", "garnish", "serve"],
            education: {
                fact: "The Margarita was invented in 1938 by Carlos Herrera for a customer allergic to all spirits except tequila!",
                tips: "Use fresh lime juice only - bottled juice will ruin the drink's balance."
            }
        },
        {
            level: 9,
            drink: "Cosmopolitan",
            difficulty: "Hard",
            timeLimit: 90,
            ingredients: [
                { name: "vodka", amount: "1.5 oz", required: true },
                { name: "triple_sec", amount: "0.5 oz", required: true },
                { name: "cranberry_juice", amount: "0.5 oz", required: true },
                { name: "lime", amount: "1/2 lime", required: true },
                { name: "ice", amount: "1 cup", required: true },
                { name: "lime_wedge", amount: "1 wedge", required: true }
            ],
            steps: [
                "Add ice to shaker",
                "Add vodka",
                "Add triple sec",
                "Add cranberry juice",
                "Add fresh lime juice",
                "Shake vigorously",
                "Strain into chilled glass",
                "Garnish with lime wheel"
            ],
            actions: ["shake", "garnish", "serve"],
            education: {
                fact: "The Cosmopolitan gained massive popularity after being featured in Sex and the City!",
                tips: "The drink should be pink, not red - use just enough cranberry juice for color."
            }
        },
        {
            level: 10,
            drink: "Old Fashioned",
            difficulty: "Expert",
            timeLimit: 150,
            ingredients: [
                { name: "whiskey", amount: "2 oz", required: true },
                { name: "sugar", amount: "1 cube", required: true },
                { name: "bitters", amount: "2 dashes", required: true },
                { name: "water", amount: "splash", required: true },
                { name: "ice", amount: "1 large cube", required: true },
                { name: "orange_slice", amount: "1 slice", required: true },
                { name: "cherry", amount: "1 cherry", required: true }
            ],
            steps: [
                "Muddle sugar cube with bitters",
                "Add splash of water",
                "Add whiskey",
                "Add large ice cube",
                "Stir for 30 seconds",
                "Express orange peel oils",
                "Garnish with orange and cherry"
            ],
            actions: ["stir", "garnish", "serve"],
            education: {
                fact: "The Old Fashioned is one of the original cocktails, dating back to the 1880s!",
                tips: "Stir, don't shake - you want to chill and dilute without aerating."
            }
        }
    ],

    // Scoring criteria
    scoring: {
        maxScore: 300,
        categories: {
            ingredients: {
                max: 100,
                correct: 20,
                wrong: -10,
                missing: -15
            },
            timing: {
                max: 100,
                perfect: 100,
                good: 80,
                okay: 60,
                poor: 30
            },
            order: {
                max: 100,
                correct: 15,
                wrong: -8
            }
        },
        hintPenalty: 20,
        bonusPoints: {
            noHints: 50,
            perfectOrder: 30,
            fastCompletion: 25
        }
    },

    // Game settings
    settings: {
        maxHints: 3,
        timerWarning: 10, // seconds
        animationSpeed: 300, // milliseconds
        toastDuration: 2000 // milliseconds
    },

    // Tips and educational content
    tips: [
        "Always taste your drink before serving - balance is key!",
        "Room temperature ingredients mix better than cold ones.",
        "The order of ingredients matters for proper layering.",
        "Fresh ingredients always make better drinks than bottled.",
        "Proper ice quality can make or break a cocktail.",
        "Garnishes aren't just decoration - they add aroma and flavor.",
        "Shaking vs stirring: Shake citrus drinks, stir spirit-forward drinks.",
        "A jigger ensures consistent measurements every time."
    ],

    // Achievement system
    achievements: {
        first_drink: "Mixed your first drink!",
        perfect_score: "Achieved a perfect score!",
        no_hints: "Completed a level without hints!",
        speed_demon: "Completed under 30 seconds!",
        mixmaster: "Completed 10 levels!",
        perfectionist: "Got 5 perfect scores in a row!"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = gameData;
}