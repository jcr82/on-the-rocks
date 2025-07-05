// Animation utilities and effects for MixMaster game
class AnimationController {
    constructor() {
        this.activeAnimations = new Map();
        this.animationQueue = [];
        this.isAnimating = false;
        
        this.initializeAnimations();
    }

    initializeAnimations() {
        // Add CSS animation classes dynamically if needed
        this.addDynamicStyles();
        
        // Setup intersection observer for scroll animations
        this.setupScrollAnimations();
    }

    addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 0;
                animation: fadeIn 0.5s ease-in-out forwards;
            }
            
            .fade-out {
                animation: fadeOut 0.5s ease-in-out forwards;
            }
            
            .slide-in-left {
                transform: translateX(-100%);
                animation: slideInLeft 0.5s ease-out forwards;
            }
            
            .slide-in-right {
                transform: translateX(100%);
                animation: slideInRight 0.5s ease-out forwards;
            }
            
            .slide-in-up {
                transform: translateY(100%);
                animation: slideInUp 0.5s ease-out forwards;
            }
            
            .slide-in-down {
                transform: translateY(-100%);
                animation: slideInDown 0.5s ease-out forwards;
            }
            
            .scale-in {
                transform: scale(0);
                animation: scaleIn 0.3s ease-out forwards;
            }
            
            .scale-out {
                animation: scaleOut 0.3s ease-in forwards;
            }
            
            .wobble {
                animation: wobble 0.6s ease-in-out;
            }
            
            .pulse-glow {
                animation: pulseGlow 2s ease-in-out infinite;
            }
            
            .ingredient-float {
                animation: ingredientFloat 3s ease-in-out infinite;
            }
            
            .liquid-pour {
                animation: liquidPour 1.5s ease-in-out forwards;
            }
            
            .glass-fill {
                animation: glassFill 2s ease-in-out forwards;
            }
            
            .score-popup {
                animation: scorePopup 2s ease-out forwards;
            }
            
            .confetti-burst {
                animation: confettiBurst 1s ease-out forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes slideInLeft {
                from { transform: translateX(-100%); }
                to { transform: translateX(0); }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            
            @keyframes slideInUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            
            @keyframes slideInDown {
                from { transform: translateY(-100%); }
                to { transform: translateY(0); }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            @keyframes scaleOut {
                from { transform: scale(1); opacity: 1; }
                to { transform: scale(0); opacity: 0; }
            }
            
            @keyframes wobble {
                0% { transform: translateX(0); }
                15% { transform: translateX(-25px) rotate(-5deg); }
                30% { transform: translateX(20px) rotate(3deg); }
                45% { transform: translateX(-15px) rotate(-3deg); }
                60% { transform: translateX(10px) rotate(2deg); }
                75% { transform: translateX(-5px) rotate(-1deg); }
                100% { transform: translateX(0); }
            }
            
            @keyframes pulseGlow {
                0%, 100% { 
                    box-shadow: 0 0 5px rgba(103, 126, 234, 0.5);
                    transform: scale(1);
                }
                50% { 
                    box-shadow: 0 0 20px rgba(103, 126, 234, 0.8);
                    transform: scale(1.05);
                }
            }
            
            @keyframes ingredientFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes liquidPour {
                0% { 
                    height: 0;
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
                100% { 
                    height: 20px;
                    opacity: 0.8;
                }
            }
            
            @keyframes glassFill {
                0% { 
                    transform: scaleY(0);
                    transform-origin: bottom;
                }
                100% { 
                    transform: scaleY(1);
                    transform-origin: bottom;
                }
            }
            
            @keyframes scorePopup {
                0% { 
                    transform: scale(0) translateY(0);
                    opacity: 0;
                }
                20% { 
                    transform: scale(1.2) translateY(-10px);
                    opacity: 1;
                }
                100% { 
                    transform: scale(1) translateY(-50px);
                    opacity: 0;
                }
            }
            
            @keyframes confettiBurst {
                0% { 
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% { 
                    transform: scale(1) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            });

            // Observe elements that should animate on scroll
            document.querySelectorAll('.tutorial-step, .ingredient-item').forEach(el => {
                observer.observe(el);
            });
        }
    }

    // Screen transition animations
    animateScreenTransition(fromScreen, toScreen, direction = 'left') {
        return new Promise((resolve) => {
            const fromElement = document.getElementById(fromScreen + '-screen');
            const toElement = document.getElementById(toScreen + '-screen');
            
            // Hide current screen with animation
            fromElement.classList.add(direction === 'left' ? 'slide-out-left' : 'slide-out-right');
            
            setTimeout(() => {
                fromElement.classList.remove('active');
                toElement.classList.add('active');
                
                // Show new screen with animation
                toElement.classList.add(direction === 'left' ? 'slide-in-right' : 'slide-in-left');
                
                setTimeout(() => {
                    toElement.classList.remove('slide-in-right', 'slide-in-left');
                    fromElement.classList.remove('slide-out-left', 'slide-out-right');
                    resolve();
                }, 500);
            }, 250);
        });
    }

    // Ingredient selection animation
    animateIngredientSelection(element, isSelected) {
        if (isSelected) {
            element.classList.add('scale-in');
            element.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.classList.remove('scale-in');
            }, 300);
        } else {
            element.classList.add('scale-out');
            
            setTimeout(() => {
                element.classList.remove('scale-out');
                element.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Glass filling animation
    animateGlassFilling(ingredientColor, height = 20) {
        const liquidLayers = document.getElementById('liquid-layers');
        const layer = document.createElement('div');
        
        layer.className = 'liquid-layer';
        layer.style.height = '0px';
        layer.style.backgroundColor = ingredientColor;
        layer.style.opacity = '0';
        layer.style.transition = 'all 0.5s ease-out';
        
        liquidLayers.appendChild(layer);
        
        // Animate the pour
        setTimeout(() => {
            layer.style.height = `${height}px`;
            layer.style.opacity = '0.8';
        }, 100);
        
        // Add bubbles effect
        this.addBubbleEffect(layer);
        
        return layer;
    }

    addBubbleEffect(layer) {
        const bubbleCount = 5;
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.style.position = 'absolute';
            bubble.style.width = '4px';
            bubble.style.height = '4px';
            bubble.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            bubble.style.borderRadius = '50%';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.bottom = '0';
            bubble.style.animation = 'bubbleRise 2s ease-out forwards';
            bubble.style.animationDelay = (i * 0.2) + 's';
            
            layer.appendChild(bubble);
            
            setTimeout(() => {
                bubble.remove();
            }, 2200);
        }
    }

    // Action button animation
    animateActionButton(buttonId, action) {
        const button = document.getElementById(buttonId);
        const glass = document.getElementById('glass');
        
        // Button feedback
        button.classList.add('active');
        
        // Glass animation based on action
        switch(action) {
            case 'shake':
                glass.classList.add('shaking');
                this.addShakeEffect();
                break;
            case 'stir':
                glass.classList.add('stirring');
                this.addStirEffect();
                break;
            case 'garnish':
                glass.classList.add('bouncing');
                this.addGarnishEffect();
                break;
        }
        
        // Reset after animation
        setTimeout(() => {
            button.classList.remove('active');
            glass.classList.remove('shaking', 'stirring', 'bouncing');
        }, 1000);
    }

    addShakeEffect() {
        const liquidLayers = document.getElementById('liquid-layers');
        const layers = liquidLayers.querySelectorAll('.liquid-layer');
        
        layers.forEach((layer, index) => {
            layer.style.animation = `liquidShake 0.5s ease-in-out ${index * 0.1}s`;
        });
    }

    addStirEffect() {
        const liquidLayers = document.getElementById('liquid-layers');
        const swirl = document.createElement('div');
        
        swirl.style.position = 'absolute';
        swirl.style.top = '50%';
        swirl.style.left = '50%';
        swirl.style.width = '30px';
        swirl.style.height = '30px';
        swirl.style.border = '2px solid rgba(255, 255, 255, 0.5)';
        swirl.style.borderRadius = '50%';
        swirl.style.borderTop = '2px solid transparent';
        swirl.style.animation = 'spin 1s linear infinite';
        swirl.style.transform = 'translate(-50%, -50%)';
        
        liquidLayers.appendChild(swirl);
        
        setTimeout(() => {
            swirl.remove();
        }, 1000);
    }

    addGarnishEffect() {
        const glass = document.getElementById('glass');
        const garnish = document.createElement('div');
        
        garnish.textContent = '🍋';
        garnish.style.position = 'absolute';
        garnish.style.top = '-10px';
        garnish.style.left = '50%';
        garnish.style.transform = 'translateX(-50%)';
        garnish.style.fontSize = '20px';
        garnish.style.animation = 'garnishDrop 1s ease-out forwards';
        
        glass.appendChild(garnish);
        
        setTimeout(() => {
            garnish.remove();
        }, 1000);
    }

    // Score animation
    animateScore(points, element) {
        const scorePopup = document.createElement('div');
        scorePopup.className = 'score-popup';
        scorePopup.textContent = `+${points}`;
        scorePopup.style.position = 'absolute';
        scorePopup.style.top = '50%';
        scorePopup.style.left = '50%';
        scorePopup.style.transform = 'translate(-50%, -50%)';
        scorePopup.style.fontSize = '24px';
        scorePopup.style.fontWeight = 'bold';
        scorePopup.style.color = '#4CAF50';
        scorePopup.style.pointerEvents = 'none';
        scorePopup.style.zIndex = '1000';
        
        element.appendChild(scorePopup);
        
        setTimeout(() => {
            scorePopup.remove();
        }, 2000);
    }

    // Perfect score celebration
    animatePerfectScore() {
        this.createConfetti();
        this.animateScoreCounter();
        this.playSuccessSound();
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s ease-out forwards`;
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }

    animateScoreCounter() {
        const scoreElement = document.getElementById('score');
        const currentScore = parseInt(scoreElement.textContent);
        const targetScore = currentScore;
        let animatedScore = 0;
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            animatedScore = Math.floor(progress * targetScore);
            scoreElement.textContent = animatedScore;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Timer warning animation
    animateTimerWarning() {
        const timerElement = document.getElementById('timer');
        const timerCircle = timerElement.parentElement;
        
        timerCircle.classList.add('pulse-glow');
        timerCircle.style.animation = 'pulseRed 1s ease-in-out infinite';
    }

    stopTimerWarning() {
        const timerElement = document.getElementById('timer');
        const timerCircle = timerElement.parentElement;
        
        timerCircle.classList.remove('pulse-glow');
        timerCircle.style.animation = '';
    }

    // Hint animation
    animateHint() {
        const hintButton = document.getElementById('hint-btn');
        hintButton.classList.add('wobble');
        
        setTimeout(() => {
            hintButton.classList.remove('wobble');
        }, 600);
    }

    // Level transition animation
    animateLevelTransition(levelNumber) {
        const levelElement = document.getElementById('level');
        levelElement.classList.add('scale-in');
        
        setTimeout(() => {
            levelElement.textContent = levelNumber;
            levelElement.classList.remove('scale-in');
        }, 300);
    }

    // Toast animation
    animateToast(toastElement) {
        toastElement.classList.add('slide-in-down');
        
        setTimeout(() => {
            toastElement.classList.remove('slide-in-down');
            toastElement.classList.add('slide-out-up');
        }, 2000);
    }

    // Utility method to add bounce effect to any element
    addBounceEffect(element) {
        element.classList.add('bouncing');
        
        setTimeout(() => {
            element.classList.remove('bouncing');
        }, 500);
    }

    // Method to animate ingredient grid appearance
    animateIngredientGrid() {
        const ingredients = document.querySelectorAll('.ingredient-item');
        
        ingredients.forEach((ingredient, index) => {
            ingredient.style.opacity = '0';
            ingredient.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                ingredient.style.transition = 'all 0.3s ease-out';
                ingredient.style.opacity = '1';
                ingredient.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Method to animate progress bar
    animateProgressBar(percentage) {
        const progressBar = document.getElementById('progress');
        progressBar.style.width = percentage + '%';
        
        if (percentage >= 100) {
            progressBar.style.background = 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)';
        }
    }

    // Cleanup method
    cleanup() {
        this.activeAnimations.clear();
        this.animationQueue = [];
        this.isAnimating = false;
    }

    // Sound effects (using Web Audio API or simple audio elements)
    playSuccessSound() {
        // Create a simple success sound using Web Audio API
        if (window.AudioContext || window.webkitAudioContext) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }
}

// Initialize animation controller
const animationController = new AnimationController();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}

// Add additional CSS animations
const additionalStyles = `
    @keyframes liquidShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
    
    @keyframes garnishDrop {
        0% { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes confettiFall {
        0% { transform: translateY(-10px) rotateZ(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotateZ(360deg); opacity: 0; }
    }
    
    @keyframes pulseRed {
        0%, 100% { 
            box-shadow: 0 0 5px rgba(255, 107, 107, 0.5);
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 20px rgba(255, 107, 107, 0.8);
            transform: scale(1.1);
        }
    }
    
    @keyframes bubbleRise {
        0% { 
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% { 
            transform: translateY(-10px) scale(1);
            opacity: 0.8;
        }
        100% { 
            transform: translateY(-20px) scale(0);
            opacity: 0;
        }
    }
    
    .slide-out-left {
        animation: slideOutLeft 0.5s ease-in forwards;
    }
    
    .slide-out-right {
        animation: slideOutRight 0.5s ease-in forwards;
    }
    
    .slide-out-up {
        animation: slideOutUp 0.5s ease-in forwards;
    }
    
    @keyframes slideOutLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes slideOutUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
    }
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);