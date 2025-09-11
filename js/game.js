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
    gameStarted = false;
    gameEnded = false;
    keyboard = new Keyboard();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
    
    if (leftBtn) {
        leftBtn.addEventListener('touchstart', (e) => {
            keyboard.LEFT = true;
        });
        leftBtn.addEventListener('touchend', (e) => {
            keyboard.LEFT = false;
        });
    }
    
    if (rightBtn) {
        rightBtn.addEventListener('touchstart', (e) => {
            keyboard.RIGHT = true;
        });
        rightBtn.addEventListener('touchend', (e) => {
            keyboard.RIGHT = false;
        });
    }
    
    if (jumpBtn) {
        jumpBtn.addEventListener('touchstart', (e) => {
            keyboard.UP = true;
        });
        jumpBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.UP = false;
        });
    }
    
    if (throwBtn) {
        throwBtn.addEventListener('touchstart', (e) => {
            keyboard.SPACE = true;
        });
        throwBtn.addEventListener('touchend', (e) => {
            keyboard.SPACE = false;
        });
    }
}



// document.addEventListener("keydown", (event) => {
//     if (event.key === "F" || event.key === "f") {
//         event.preventDefault();
//         if (document.fullscreenElement) {
//             document.exitFullscreen();
//         } else {
//             canvas.requestFullscreen().catch((err) => {
//                 console.error(`Error enabling fullscreen: ${err.message}`);
//             });
//         }
//     }
// });

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