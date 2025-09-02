let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

window.addEventListener('keydown', (event) => {
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
}) 

window.addEventListener('keyup', (event) => {
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
}) 


document.addEventListener("keydown", (event) => {
  // Note that "F" is case-sensitive (uppercase):
  if (event.key === "Enter") {
    // Check if we're in fullscreen mode
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }
    // Otherwise enter fullscreen mode
    canvas.requestFullscreen().catch((err) => {
      console.error(`Error enabling fullscreen: ${err.message}`);
    });
    
    console.log(document.fullscreenElement);
  }
});
