let canvas;
let ctx; 
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameEnded = false;
let statusInterval;
let soundManager; 
let gameController; 

let startDialog;
let winDialog;
let loseDialog;
let controlsDialog;


function initGameFeatures() {
    initMobileControls();
    initMuteButton();

    soundManager = new Sounds();
    gameController = new Controller();
}

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

function showControls() {
    controlsDialog.showModal();
}

function closeControls() {
    controlsDialog.close();
}

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

function initGame() {
    world = new World(canvas, keyboard);
    checkGameStatus();
}

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

function showEndDialog(won) {
    if (world) {
        world = null;
    }
    if (soundManager) {
        soundManager.stopBackgroundMusic();
        if (won) {
            winDialog.showModal();
            soundManager.play('youwon');
        } else {
            loseDialog.showModal();
            soundManager.play('youlost');
        }
    }
}


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
            new BackgroundObject('../img/5_background/layers/air.png', -719),
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719),
    
            new BackgroundObject('../img/5_background/layers/air.png', 0),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
    
            new BackgroundObject('../img/5_background/layers/air.png', 719),
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('../img/5_background/layers/air.png', 719 *2),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 *2),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 *2),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 *2),
    
            new BackgroundObject('../img/5_background/layers/air.png', 719 *3),
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 *3),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 *3),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 *3),
    
            new BackgroundObject('../img/5_background/layers/air.png', 719 *4),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 *4),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 *4),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 *4),
    
            new BackgroundObject('../img/5_background/layers/air.png', 719 *5),
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 *5),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 *5),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 *5),
    
            new BackgroundObject('../img/5_background/layers/air.png', 719 *6),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 *6),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 *6),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 *6),
    
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

function handleButtonPress(btnId, isPressed) {
    switch(btnId) {
        case 'left-btn':
            keyboard.LEFT = isPressed;
            break;
        case 'right-btn':
            keyboard.RIGHT = isPressed;
            break;
        case 'jump-btn':
            keyboard.UP = isPressed;
            break;
        case 'throw-btn':
            keyboard.SPACE = isPressed;
            break;
    }
}

function checkOrientation() {
    const orientationMsg = document.getElementById('orientation-message');
    const mobileControls = document.getElementById('mobile-controls');
    const canvas = document.getElementById('canvas');
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if(isMobile) {
        if(window.innerHeight > window.innerWidth) {
            if(orientationMsg) orientationMsg.style.display = 'flex';
            if(canvas) canvas.style.display = 'none';
            if(mobileControls) mobileControls.style.display = 'none';
        } else {
            if(orientationMsg) orientationMsg.style.display = 'none';
            if(canvas) canvas.style.display = 'block';
            if(mobileControls) mobileControls.style.display = 'block';
        }
    } else {
        if(orientationMsg) orientationMsg.style.display = 'none';
        if(mobileControls) mobileControls.style.display = 'none';
    }
}

window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('resize', checkOrientation);


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