class Chicken extends MovableObject {

    y = 340;
    height = 90;
    width = 80;
    isDead = false;
    IMAGES_WALKING = [
            '/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            '/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            '/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        ]

    IMAGES_DEAD = [
        '/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    
        this.x = 2000 + Math.random() * 1500;    
        this.speed = 0.15 + Math.random() * 0.25;
        this.isDead = false; // Initialisiere isDead
    
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
    
    killEnemy() {
        this.isDead = true;
        this.speed = 0;
        setTimeout(() => {
            this.markedForRemoval = true;
        }, 200);
    }
}