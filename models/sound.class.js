class Sounds {
    constructor() {
        this.sounds = {
            backgroundmusic: document.getElementById('sound-backgroundmusic'),
            jump: document.getElementById('sound-jump'),
            hurt: document.getElementById('sound-hurt'),
            enemyDefeated: document.getElementById('sound-enemyDefeated'),
            youwin: document.getElementById('sound-youwon'),
            youlost: document.getElementById('sound-youlost'),
        }

    this.muted = false;

    if (this.sounds.backgroundmusic) {
        this.sounds.backgroundmusic.loop = true;
        this.sounds.backgroundmusic.volume = 0.1; 
    }
    }

    startBackgroundMusic() {
        if (!this.muted && this.sounds.backgroundmusic) {
            this.sounds.backgroundmusic.play();
        }
    }
    
    stopBackgroundMusic() {
        if (this.sounds.backgroundmusic) {
            this.sounds.backgroundmusic.pause();
            this.sounds.backgroundmusic.currentTime = 0;
        }
    }
    
    pauseBackgroundMusic() {
        if (this.sounds.backgroundmusic) {
            this.sounds.backgroundmusic.pause();
        }
    }
    
    resumeBackgroundMusic() {
        if (!this.muted && this.sounds.backgroundmusic) {
            this.sounds.backgroundmusic.play();
        }
    }

    play(soundName) {
        if(!this.muted && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            this.pauseBackgroundMusic();
        } else {
            this.resumeBackgroundMusic();
        }
    }
}