/**
 * Chicken enemy class
 */
class Chicken extends MovableObject {

    /**
     * @type {number} Y position
     */
    y = 340;

    /**
     * @type {number} Height
     */
    height = 90;

    /**
     * @type {number} Width
     */
    width = 80;

    /**
     * @type {boolean} Death status
     */
    isDead = false;
    IMAGES_WALKING = [
            '/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            '/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            '/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        ]

    IMAGES_DEAD = [
        '/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    /**
     * creates a new chicken
     */
    constructor() {
        super().loadImage('/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    
        this.x = 2000 + Math.random() * 1500;    
        this.speed = 0.15 + Math.random() * 0.25;
        this.isDead = false; // Initialisiere isDead
    
        this.animate();
    }

    /**
     * animates the chicken
     */
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
    
    /**
     * kills the enemy
     */
    killEnemy() {
        this.isDead = true;
        this.speed = 0;
        setTimeout(() => {
            this.markedForRemoval = true;
        }, 200);
    }
}