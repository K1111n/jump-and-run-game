class Controller {
    constructor() {
        this.isPaused = false;
        this.pauseDialog = null;
        this.initPauseControls();
    }

    initPauseControls() {
        this.pauseDialog = document.getElementById('pauseDialog');
        const resumeBtn = document.getElementById('resume-btn');
        const quitBtn = document.getElementById('quit-btn');
        
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => this.resume());
        }
        
        if (quitBtn) {
            quitBtn.addEventListener('click', () => this.quit());
        }
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gameStarted && !gameEnded) {
                this.togglePause();
            }
        });
    }

    togglePause() {
        if (this.isPaused) {
                this.resume();
        } else {
                this.pause();
        }
    }

    pause() {
        if (!gameStarted || gameEnded) return;
        
        this.isPaused = true;
        if (this.pauseDialog) {
            this.pauseDialog.showModal();
        }
        
        if (world) {
            world.pauseTime = Date.now();
        }
    }

    resume() {
        this.isPaused = false;
        if (this.pauseDialog) {
            this.pauseDialog.close();
        }

        if (world && world.pauseTime) {
            const pauseDuration = Date.now() - world.pauseTime;
        }

        if(world.character) {
            world.character.lastHitTime += pauseDuration;
            world.character.lastMovement += pauseDuration;
        }
    }
    
    quit() {
        if (this.pauseDialog) {
            this.pauseDialog.close();
        }
        this.isPaused = false;
        restartGame();
    }
}