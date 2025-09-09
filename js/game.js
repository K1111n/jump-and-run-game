let canvas;
let ctx; 
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameEnded = false;
let startScreen;
let endScreen;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d'); 
    // world = new World(canvas, keyboard);
    showStartScreen();
    setupStartListener();
}

function showStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let startImg = new Image();
    startImg.src = '../img/9_intro_outro_screens/start/startscreen_2.png';
    startImg.onload = () => {
        ctx.drawImage(startImg, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press ENTER to start', canvas.width/2, canvas.height - 50);
    };
}

function setupStartListener() {
    function startGame(event) {
        if (!gameStarted && event.key === "Enter") {
            gameStarted = true;
            window.removeEventListener('keydown', startGame);
            initGame();
        }
    }
    window.addEventListener('keydown', startGame);
}

function initGame() {
    world = new World(canvas, keyboard);
    
    checkGameStatus();
}

function checkGameStatus() {
    let statusInterval = setInterval(() => {
        if (!gameEnded && world && world.character) {
            if (world.character.isDead() && world.character.deathAnimationComplete) {
                gameEnded = true;
                clearInterval(statusInterval);
                setTimeout(() => {
                    showEndScreen(false); // false = lost
                }, 1000);
            }
            
            let endboss = world.level.enemies.find(enemy => enemy instanceof Endboss);
            if (endboss && endboss.isDead) {
                gameEnded = true;
                clearInterval(statusInterval);
                setTimeout(() => {
                    showEndScreen(true); // true = won
                }, 1000);
            }
        }
    }, 100);
}

function showEndScreen(won) {
    if (world) {
        world = null;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let endImg = new Image();
    if (won) {
        endImg.src = '../img/You won, you lost/You won A.png';
    } else {
        endImg.src = '../img/You won, you lost/You lost b.png';
    }
    
    endImg.onload = () => {
        ctx.drawImage(endImg, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '25px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press F5 to restart', canvas.width/2, canvas.height - 30);
    };
}

window.addEventListener('keydown', (event) => {
    if (gameStarted && !gameEnded) {
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
    else if (event.key === "D") {
        keyboard.D = true;
    }
}
}) 

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
    else if (event.key === "D") {
        keyboard.D = false;
    }
}
}) 


document.addEventListener("keydown", (event) => {
  if (event.key === "F11") {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }
    canvas.requestFullscreen().catch((err) => {
      console.error(`Error enabling fullscreen: ${err.message}`);
    });
  }
});
