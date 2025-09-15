/**
 * @type {HTMLCanvasElement} Canvas element for the game
 */
let canvas;

/**
 * @type {CanvasRenderingContext2D} 2D rendering context
 */
let ctx; 

/**
 * @type {World} Current game world instance
 */
let world;

/**
 * @type {Keyboard} Keyboard input handler
 */
let keyboard = new Keyboard();

/**
 * @type {boolean} Indicates whether the game has started
 */
let gameStarted = false;

/**
 * @type {boolean} Indicates whether the game has ended
 */
let gameEnded = false;

/**
 * @type {number} Interval ID for status checking
 */
let statusInterval;

/**
 * @type {Sounds} Sound manager instance
 */
let soundManager; 

/**
 * @type {Controller} Game controller for pause functionality
 */
let gameController; 

/**
 * @type {HTMLDialogElement} Start dialog element
 */
let startDialog;

/**
 * @type {HTMLDialogElement} Win dialog element
 */
let winDialog;

/**
 * @type {HTMLDialogElement} Lose dialog element 
 */
let loseDialog;

/**
 * @type {HTMLDialogElement} Controls dialog element
 */
let controlsDialog;

/**
 * Initializes game features
 */
function initGameFeatures() {
    initMobileControls();
    initMuteButton();

    soundManager = new Sounds();
    window.soundManager = soundManager; 
    gameController = new Controller();
}

/**
 * Main initialization function - called when the page loads
 */
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    
    startDialog = document.getElementById('startDialog');
    winDialog = document.getElementById('winDialog');
    loseDialog = document.getElementById('loseDialog');
    controlsDialog = document.getElementById('controlsDialog');
    
    checkOrientation(); 
    initGameFeatures();

    if (startDialog) {
        startDialog.showModal();
    }
    
    window.addEventListener('keydown', handleEnterStart);
}

/**
 * Handles Enter key to start the game
 * @param {KeyboardEvent} event 
 */
function handleEnterStart(event) {
    if (event.key === "Enter" && !gameStarted) {
        if (controlsDialog && controlsDialog.open) {
            closeControls();
        } 
        else if (startDialog && startDialog.open) {
            startGame();
        }
        else if ((winDialog && winDialog.open) || (loseDialog && loseDialog.open)) {
            restartGame();
        }
    }
}

/**
 * starts the game
 */
function startGame() {
    window.removeEventListener('keydown', handleEnterStart);
    startDialog.close();
    gameStarted = true;
    gameEnded = false;
    if (soundManager) {
        soundManager.startBackgroundMusic();
    }
    initGame();
}

/**
 * initializes the game world and starts status checking
 */
function initGame() {
    world = new World(canvas, keyboard);
    checkGameStatus();
}

/**
 * continually checks the game status for win/loss conditions
 */
function checkGameStatus() {
    statusInterval = setInterval(() => {
        if (!gameEnded && world && world.character) {
            if (world.character.isDead() && world.character.deathAnimationComplete) {
                gameEnded = true;
                clearInterval(statusInterval);
                setTimeout(() => {
                    showEndDialog(false);
                }, 1000);
            }
            
            let endboss = world.level.enemies.find(enemy => enemy instanceof Endboss);
            if (endboss && endboss.isDead) {
                gameEnded = true;
                clearInterval(statusInterval);
                setTimeout(() => {
                    showEndDialog(true);
                }, 1000);
            }
        }
    }, 100);
}



/**
 * restarts the game by resetting all variables and showing the start dialog
 */
function restartGame() {
    winDialog.close();
    loseDialog.close();
    
    if (soundManager) {
        soundManager.stopBackgroundMusic();
    }

    world = null;
    gameStarted = false;
    gameEnded = false;
    keyboard = new Keyboard();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    level1 = new Level(
        [
            new Chicken(), 
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
        ],
        [
            new Cloud(),
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),
    
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
    
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('./img/5_background/layers/air.png', 719 *2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 *2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 *2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 *2),
    
            new BackgroundObject('./img/5_background/layers/air.png', 719 *3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 *3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 *3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 *3),

            new BackgroundObject('./img/5_background/layers/air.png', 719 *4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 *4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 *4),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 *4),

            new BackgroundObject('./img/5_background/layers/air.png', 719 *5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 *5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 *5),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 *5),

            new BackgroundObject('./img/5_background/layers/air.png', 719 *6),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 *6),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 *6),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 *6),
    
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
        ]
    );
    
    
    startDialog.showModal();
    
    window.addEventListener('keydown', handleEnterStart);
}

window.addEventListener('keydown', (event) => {
    if (gameStarted && !gameEnded && (!gameController || !gameController.isPaused)) {
        if (event.key === "ArrowUp") {
            keyboard.UP = true;
        }
        else if (event.key === "ArrowDown") {
            keyboard.DOWN = true;
        }
        else if (event.key === "ArrowLeft") {
            keyboard.LEFT = true;
        }
        else if (event.key === "ArrowRight") {
            keyboard.RIGHT = true;
        }
        else if (event.key === " ") {
            keyboard.SPACE = true;
        }
        else if (event.key === "d" || event.key === "D") {
            keyboard.D = true;
        }
    }
});

window.addEventListener('keyup', (event) => {
    if (gameStarted && !gameEnded) {
        if (event.key === "ArrowUp") {
            keyboard.UP = false;
        }
        else if (event.key === "ArrowDown") {
            keyboard.DOWN = false;
        }
        else if (event.key === "ArrowLeft") {
            keyboard.LEFT = false;
        }
        else if (event.key === "ArrowRight") {
            keyboard.RIGHT = false;
        }
        else if (event.key === " ") {
            keyboard.SPACE = false;
        }
        else if (event.key === "d" || event.key === "D") {
            keyboard.D = false;
        }
    }
});

/**
 * initializes mobile control buttons with touch event listeners
 */
function initMobileControls() {
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const jumpBtn = document.getElementById('jump-btn');
    const throwBtn = document.getElementById('throw-btn');
    
    const mobileButtons = [leftBtn, rightBtn, jumpBtn, throwBtn];
    mobileButtons.forEach(btn => {
        if(btn) {
            btn.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });
            
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handleButtonPress(btn.id, true);
            });
            
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                handleButtonPress(btn.id, false);
            });
            
            btn.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                handleButtonPress(btn.id, false);
            });
        }
    });
}

/**
 * handles button press events and updates keyboard state
 * @param {string} btnId - ID of the button pressed
 * @param {boolean} isPressed - true if button is pressed, false if released
 */
function handleButtonPress(btnId, isPressed) {
    if (btnId === 'left-btn') {
        keyboard.LEFT = isPressed;
    }
    else if (btnId === 'right-btn') {
        keyboard.RIGHT = isPressed;
    }
    else if (btnId === 'jump-btn') {
        keyboard.UP = isPressed;
    }
    else if (btnId === 'throw-btn') {
        keyboard.SPACE = isPressed;
    }
}

/**
 * initializes the mute button functionality
 */
function initMuteButton() {
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            if (soundManager) {
                soundManager.toggleMute();
                muteBtn.textContent = soundManager.muted ? '🔇' : '🔊';
            }
        });
    }
}
