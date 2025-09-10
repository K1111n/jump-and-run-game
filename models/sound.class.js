class Sounds {
    constructor() {
        this.sounds = {
            jump: new Audio('../sounds/jump.mp3'),
            hurt: new Audio('../sounds/hurt.mp3'),
            enemyDefeated: new Audio('../sounds/enemyDefeated.mp3'),
            youlost: new Audio('../sounds/youlost.mp3'),
            youwon: new Audio('../sounds/youwon.mp3'),
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