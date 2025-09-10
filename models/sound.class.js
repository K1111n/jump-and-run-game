class Sounds {
    constructor() {
        this.sounds = {
            jump: document.getElementById('sound-jump'),
            hurt: document.getElementById('sound-hurt'),
            enemyDefeated: document.getElementById('sound-enemyDefeated'),
            youwin: document.getElementById('sound-youwin'),
            youlost: document.getElementById('sound-youlost'),
        }

    this.muted = false;
    }

    play(soundName) {
        if(!this.muted && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
    }
}