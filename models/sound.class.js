/**
 * Sound manager
 */
class Sounds {
    /**
     * creates a new sound manager
     */
    constructor() {
        this.sounds = {
            backgroundmusic: document.getElementById('sound-backgroundmusic'),
            jump: document.getElementById('sound-jump'),
            hurt: document.getElementById('sound-hurt'),
            enemyDefeated: document.getElementById('sound-enemyDefeated'),
            youwon: document.getElementById('sound-youwon'),
            youlost: document.getElementById('sound-youlost'),
        }

    /**
     * @type {boolean} Mute status 
     */
    this.muted = false;

    if (this.sounds.backgroundmusic) {
        this.sounds.backgroundmusic.loop = true;
        this.sounds.backgroundmusic.volume = 0.1; 
    }
    }

    /**
     * Starts background music if not muted
     */
    startBackgroundMusic() {
        if (!this.muted && this.sounds.backgroundmusic) {
            this.sounds.backgroundmusic.play();
        }
    }
    
    /**
     *  Stops background music and resets its time
     */
    stopBackgroundMusic() {
        if (this.sounds.backgroundmusic) {
            this.sounds.backgroundmusic.pause();
            this.sounds.backgroundmusic.currentTime = 0;
        }
    }
    
    /**
     * Pauses background music
     */
    pauseBackgroundMusic() {
        if (this.sounds.backgroundmusic) {
            this.sounds.backgroundmusic.pause();
        }
    }
    
    /**
     * Resumes background music if not muted
     */
    resumeBackgroundMusic() {
        if (!this.muted && this.sounds.backgroundmusic) {
            this.sounds.backgroundmusic.play();
        }
    }

    /**
     * plays a sound if not muted
     * @param {string} soundName - Name of the sound to play
     */
    play(soundName) {
        if(!this.muted && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        }
    }

    /**
     * Toggles the mute status
     */
    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            this.pauseBackgroundMusic();
        } else {
            this.resumeBackgroundMusic();
        }
    }

      /**
     * loads the Mute-Status from localStorage
     * @returns {boolean} Mute-Status
     */
      loadMuteStatus() {
        const stored = localStorage.getItem('gameMuted');
        return stored === 'true';
    }
    
    /**
     * saves the Mute-Status to localStorage
     */
    saveMuteStatus() {
        localStorage.setItem('gameMuted', this.isMuted.toString());
    }
    
    /**
     * Creates the mute button
     */
    createMuteButton() {
        // Check if button already exists
        let button = document.getElementById('mute-button');
        
        if (!button) {
            button = document.createElement('button');
            button.id = 'mute-button';
            button.className = 'mute-button';
            document.body.appendChild(button);
        }
        
        button.onclick = () => this.toggleMute();
        this.updateMuteButton();
    }
    
    /**
     * Updates the mute button icon
     */
    updateMuteButton() {
        const button = document.getElementById('mute-button');
        if(button) {
            button.innerHTML = this.isMuted ? '🔇' : '🔊';
            button.title = this.isMuted ? 'Enable sound' : 'Disable sound';
            button.setAttribute('aria-label', this.isMuted ? 'Enable sound' : 'Disable sound');
        }
    }
}