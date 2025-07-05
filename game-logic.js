// Game Logic - Main game controller
class MixMasterGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.hintsUsed = 0;
        this.hintsRemaining = gameData.settings.maxHints;
        this.gameState = 'start'; // start, playing, paused, finished
        this.selectedIngredients = [];
        this.completedActions = [];
        this.currentStep = 0;
        this.startTime = null;
        this.timeRemaining = 0;
        this.timer = null;
        this.currentLevelData = null;
        this.perfectStreak = 0;
        
        this.initializeGame();
    }

    initializeGame() {
        this.bindEventListeners();
        this.showScreen('start');
        this.updateUI();
    }

    bindEventListeners() {
        // Screen navigation
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('tutorial-btn').addEventListener('click', () => this.showTutorial());
        document.getElementById('tutorial-close-btn').addEventListener('click', () => this.showScreen('start'));
        
        // Game controls
        document.getElementById('hint-btn').addEventListener('click', () => this.useHint());
        document.getElementById('serve-btn').addEventListener('click', () => this.servedrink());
        
        // Action buttons
        document.getElementById('shake-btn').addEventListener('click', () => this.performAction('shake'));
        document.getElementById('stir-btn').addEventListener('click', () => this.performAction('stir'));
        document.getElementById('garnish-btn').addEventListener('click', () => this.performAction('garnish'));
        
        // Results screen
        document.getElementById('next-level-btn').addEventListener('click', () => this.nextLevel());
        document.getElementById('replay-btn').addEventListener('click', () => this.replayLevel());
        document.getElementById('menu-btn').addEventListener('click', () => this.returnToMenu());
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId + '-screen').classList.add('active');
    }

    showTutorial() {
        this.showScreen('tutorial');
    }

    startGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.hintsUsed = 0;
        this.hintsRemaining = gameData.settings.maxHints;
        this.perfectStreak = 0;
        this.loadLevel(this.currentLevel);
    }

    loadLevel(levelNumber) {
        this.currentLevelData = gameData.levels.find(level => level.level === levelNumber);
        if (!this.currentLevelData) {
            this.showGameComplete();
            return;
        }

        this.selectedIngredients = [];
        this.completedActions = [];
        this.currentStep = 0;
        this.timeRemaining = this.currentLevelData.timeLimit;
        
        this.showScreen('game');
        this.setupLevel();
        this.startTimer();
        this.updateUI();
    }

    setupLevel() {
        const levelData = this.currentLevelData;
        
        // Update drink name
        document.getElementById('drink-name').textContent = levelData.drink;
        
        // Setup ingredients list
        this.setupIngredientsList();
        
        // Setup ingredient selector
        this.setupIngredientSelector();
        
        // Setup current step
        this.updateCurrentStep();
        
        // Reset glass
        this.resetGlass();
        
        // Update progress bar
        this.updateProgress();
    }

    setupIngredientsList() {
        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = '';
        
        this.currentLevelData.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = `${gameData.ingredients[ingredient.name].name} - ${ingredient.amount}`;
            li.setAttribute('data-ingredient', ingredient.name);
            if (ingredient.required) {
                li.classList.add('required');
            }
            ingredientsList.appendChild(li);
        });
    }

    setupIngredientSelector() {
        const ingredientGrid = document.getElementById('ingredient-grid');
        ingredientGrid.innerHTML = '';
        
        // Get all unique ingredients for current level
        const levelIngredients = this.currentLevelData.ingredients.map(ing => ing.name);
        
        // Add some extra ingredients as distractors
        const allIngredients = Object.keys(gameData.ingredients);
        const distractors = allIngredients.filter(ing => !levelIngredients.includes(ing))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        const availableIngredients = [...levelIngredients, ...distractors]
            .sort(() => Math.random() - 0.5);
        
        availableIngredients.forEach(ingredientKey => {
            const ingredient = gameData.ingredients[ingredientKey];
            const div = document.createElement('div');
            div.className = 'ingredient-item';
            div.setAttribute('data-ingredient', ingredientKey);
            div.innerHTML = `
                <span class="ingredient-emoji">${ingredient.emoji}</span>
                <span class="ingredient-name">${ingredient.name}</span>
            `;
            
            div.addEventListener('click', () => this.selectIngredient(ingredientKey));
            ingredientGrid.appendChild(div);
        });
    }

    selectIngredient(ingredientKey) {
        const ingredientElement = document.querySelector(`[data-ingredient="${ingredientKey}"]`);
        const isRequired = this.currentLevelData.ingredients.some(ing => ing.name === ingredientKey);
        
        if (ingredientElement.classList.contains('selected')) {
            // Deselect ingredient
            ingredientElement.classList.remove('selected');
            this.selectedIngredients = this.selectedIngredients.filter(ing => ing !== ingredientKey);
        } else {
            // Select ingredient
            ingredientElement.classList.add('selected');
            this.selectedIngredients.push(ingredientKey);
            
            // Add to glass visual
            this.addIngredientToGlass(ingredientKey);
            
            // Mark as completed in ingredients list
            const listItem = document.querySelector(`#ingredients-list li[data-ingredient="${ingredientKey}"]`);
            if (listItem) {
                listItem.classList.add('completed');
            }
            
            // Show feedback
            if (isRequired) {
                this.showToast(`Great! ${gameData.ingredients[ingredientKey].name} added!`, 'success');
            } else {
                this.showToast(`Hmm, ${gameData.ingredients[ingredientKey].name} wasn't needed...`, 'warning');
            }
        }
        
        this.updateProgress();
    }

    addIngredientToGlass(ingredientKey) {
        const glass = document.getElementById('liquid-layers');
        const ingredient = gameData.ingredients[ingredientKey];
        
        const layer = document.createElement('div');
        layer.className = 'liquid-layer';
        layer.style.height = '15px';
        layer.style.backgroundColor = ingredient.color;
        layer.style.opacity = '0.8';
        layer.style.transition = 'all 0.3s ease';
        
        glass.appendChild(layer);
        
        // Animate the addition
        setTimeout(() => {
            layer.style.opacity = '0.9';
        }, 100);
    }

    resetGlass() {
        document.getElementById('liquid-layers').innerHTML = '';
    }

    updateCurrentStep() {
        const currentStepElement = document.getElementById('current-step');
        const steps = this.currentLevelData.steps;
        
        if (this.currentStep < steps.length) {
            currentStepElement.textContent = `Step ${this.currentStep + 1}: ${steps[this.currentStep]}`;
        } else {
            currentStepElement.textContent = 'Ready to serve!';
        }
    }

    updateProgress() {
        const totalSteps = this.currentLevelData.steps.length;
        const progress = ((this.currentStep + 1) / totalSteps) * 100;
        document.getElementById('progress').style.width = `${Math.min(progress, 100)}%`;
    }

    performAction(action) {
        if (this.completedActions.includes(action)) {
            this.showToast('You already performed this action!', 'warning');
            return;
        }
        
        const actionBtn = document.getElementById(action + '-btn');
        actionBtn.classList.add('active');
        
        // Add animation based on action
        const glass = document.getElementById('glass');
        glass.classList.add(action + 'ing');
        
        setTimeout(() => {
            glass.classList.remove(action + 'ing');
            actionBtn.classList.remove('active');
        }, 1000);
        
        this.completedActions.push(action);
        this.currentStep++;
        this.updateCurrentStep();
        this.updateProgress();
        
        // Show feedback
        this.showToast(`${action.charAt(0).toUpperCase() + action.slice(1)} completed!`, 'success');
        
        // Check if all actions completed
        if (this.completedActions.length >= this.currentLevelData.actions.length) {
            document.getElementById('serve-btn').disabled = false;
            document.getElementById('serve-btn').style.opacity = '1';
            this.showToast('Ready to serve! Click the serve button!', 'info');
        }
    }

    servedrink() {
        this.stopTimer();
        this.calculateScore();
        this.showResults();
    }

    calculateScore() {
        const levelData = this.currentLevelData;
        const scoring = gameData.scoring;
        
        let scores = {
            ingredients: 0,
            timing: 0,
            order: 0,
            total: 0
        };
        
        // Calculate ingredients score
        const requiredIngredients = levelData.ingredients.filter(ing => ing.required).map(ing => ing.name);
        const correctIngredients = this.selectedIngredients.filter(ing => requiredIngredients.includes(ing));
        const wrongIngredients = this.selectedIngredients.filter(ing => !requiredIngredients.includes(ing));
        const missingIngredients = requiredIngredients.filter(ing => !this.selectedIngredients.includes(ing));
        
        scores.ingredients = Math.max(0, 
            (correctIngredients.length * scoring.categories.ingredients.correct) +
            (wrongIngredients.length * scoring.categories.ingredients.wrong) +
            (missingIngredients.length * scoring.categories.ingredients.missing)
        );
        
        // Calculate timing score
        const timeUsed = levelData.timeLimit - this.timeRemaining;
        const timePercentage = timeUsed / levelData.timeLimit;
        
        if (timePercentage <= 0.5) {
            scores.timing = scoring.categories.timing.perfect;
        } else if (timePercentage <= 0.7) {
            scores.timing = scoring.categories.timing.good;
        } else if (timePercentage <= 0.9) {
            scores.timing = scoring.categories.timing.okay;
        } else {
            scores.timing = scoring.categories.timing.poor;
        }
        
        // Calculate order score (simplified - based on actions completed)
        const requiredActions = levelData.actions.length;
        const completedActions = this.completedActions.length;
        scores.order = Math.min(scoring.categories.order.max, 
            completedActions * scoring.categories.order.correct);
        
        // Apply hint penalty
        const hintPenalty = this.hintsUsed * scoring.hintPenalty;
        
        // Calculate bonus points
        let bonusPoints = 0;
        if (this.hintsUsed === 0) {
            bonusPoints += scoring.bonusPoints.noHints;
        }
        if (completedActions === requiredActions) {
            bonusPoints += scoring.bonusPoints.perfectOrder;
        }
        if (timePercentage <= 0.5) {
            bonusPoints += scoring.bonusPoints.fastCompletion;
        }
        
        // Calculate total
        scores.total = Math.max(0, scores.ingredients + scores.timing + scores.order + bonusPoints - hintPenalty);
        
        // Update game score
        this.score += scores.total;
        
        // Check for perfect score
        if (scores.total >= scoring.maxScore * 0.9) {
            this.perfectStreak++;
        } else {
            this.perfectStreak = 0;
        }
        
        this.lastScores = scores;
        this.updateUI();
    }

    showResults() {
        this.showScreen('results');
        
        const scores = this.lastScores;
        const levelData = this.currentLevelData;
        
        // Update result title
        let resultTitle = 'Good Job!';
        if (scores.total >= gameData.scoring.maxScore * 0.9) {
            resultTitle = 'Perfect!';
        } else if (scores.total >= gameData.scoring.maxScore * 0.7) {
            resultTitle = 'Excellent!';
        } else if (scores.total >= gameData.scoring.maxScore * 0.5) {
            resultTitle = 'Well Done!';
        } else {
            resultTitle = 'Keep Practicing!';
        }
        document.getElementById('result-title').textContent = resultTitle;
        
        // Update score breakdown
        document.getElementById('ingredients-score').textContent = `${scores.ingredients}/100`;
        document.getElementById('timing-score').textContent = `${scores.timing}/100`;
        document.getElementById('order-score').textContent = `${scores.order}/100`;
        document.getElementById('total-score').textContent = `${scores.total}/300`;
        
        // Update educational content
        document.getElementById('drink-fact').textContent = levelData.education.fact;
        
        // Handle next level button
        if (this.currentLevel >= gameData.levels.length) {
            document.getElementById('next-level-btn').style.display = 'none';
        } else {
            document.getElementById('next-level-btn').style.display = 'block';
        }
    }

    nextLevel() {
        this.currentLevel++;
        this.hintsUsed = 0;
        this.hintsRemaining = gameData.settings.maxHints;
        this.loadLevel(this.currentLevel);
    }

    replayLevel() {
        this.hintsUsed = 0;
        this.hintsRemaining = gameData.settings.maxHints;
        this.loadLevel(this.currentLevel);
    }

    returnToMenu() {
        this.showScreen('start');
        this.stopTimer();
    }

    useHint() {
        if (this.hintsRemaining <= 0) {
            this.showToast('No more hints available!', 'warning');
            return;
        }
        
        this.hintsUsed++;
        this.hintsRemaining--;
        
        // Provide hint based on current game state
        let hintText = '';
        
        if (this.selectedIngredients.length === 0) {
            const firstIngredient = this.currentLevelData.ingredients[0];
            hintText = `Try starting with ${gameData.ingredients[firstIngredient.name].name}`;
        } else if (this.completedActions.length === 0) {
            const firstAction = this.currentLevelData.actions[0];
            hintText = `Next, try to ${firstAction} the ingredients`;
        } else {
            hintText = this.currentLevelData.education.tips;
        }
        
        this.showToast(`Hint: ${hintText}`, 'info');
        this.updateUI();
    }

    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimer();
            
            if (this.timeRemaining <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateTimer() {
        const timerElement = document.getElementById('timer');
        timerElement.textContent = this.timeRemaining;
        
        // Change color when running low
        if (this.timeRemaining <= gameData.settings.timerWarning) {
            timerElement.parentElement.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
        } else {
            timerElement.parentElement.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        }
    }

    timeUp() {
        this.stopTimer();
        this.showToast('Time\'s up!', 'error');
        this.calculateScore();
        this.showResults();
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.currentLevel;
        document.getElementById('hints').textContent = this.hintsRemaining;
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.getElementById('toast-container').appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, gameData.settings.toastDuration);
    }

    showGameComplete() {
        this.showToast('Congratulations! You completed all levels!', 'success');
        this.showScreen('start');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MixMasterGame();
});

// Touch event handling for mobile
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

// Prevent double-tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);