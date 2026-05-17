/**
 * Game controller for pause and logic control
 */
class Controller {

    /**
     * Constructor to initialize the controller
     */
    constructor() {
        this.isPaused = false;
        this.pauseDialog = null;
        this.initPauseControls();
    }

    /**
     * Initialize pause controls and event listeners
     */
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

    /**
     * Toggle the pause state of the game
     */
    togglePause() {
        if (this.isPaused) {
                this.resume();
        } else {
                this.pause();
        }
    }

    /**
     *  Pause the game
     * @returns does nothing if game not started or already ended
     */
    pause() {
        if (!gameStarted || gameEnded) return;
        
        this.isPaused = true;
        if (this.pauseDialog) {
            this.pauseDialog.showModal();
        }
        if (window.soundManager) {
            window.soundManager.pauseBackgroundMusic();
        }
        if (world) {
            world.pauseTime = Date.now();
        }
    }

    /**
     * Resume the game
     */
    resume() {
        this.isPaused = false;
        if (this.pauseDialog) {
            this.pauseDialog.close();
        }

        if (window.soundManager) {
            window.soundManager.resumeBackgroundMusic();
        }

        if (world && world.pauseTime && world.character) {
            const pauseDuration = Date.now() - world.pauseTime;
            world.character.lastHit += pauseDuration;
            world.character.lastMovement += pauseDuration;
        }
    }
    
    /**
     * Quit the game and restart    
     */
    quit() {
        if (this.pauseDialog) {
            this.pauseDialog.close();
        }
        this.isPaused = false;
        if (window.soundManager) {
            window.soundManager.stopBackgroundMusic();
        }
        restartGame();
    }
}