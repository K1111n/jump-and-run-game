/**
 * Chicken enemy class
 */
class Chicken extends MovableObject {

    /**
     * @type {number} Y position
     */
    y = 360;

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
    dead = false;

    /**
     * @type {boolean} Death animation completed
     */
    deathAnimationComplete = false;

    /**
     * @type {number} Timer for delayed removal
     */
    removeTimer = null;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    /**
     * creates a new chicken
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    
        this.x = 2000 + Math.random() * 1500;    
        this.speed = 0.15 + Math.random() * 0.25;
        this.dead = false; 
        this.markedForRemoval = false;
    
        this.animationStarted = false;
    }

    /**
     * animates the chicken
     */
    animate() {
        this.animationStarted = true;
        this.movementInterval = setInterval(() => {
            if (!this.dead && !animationsPaused) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        this.imageInterval = setInterval(() => {
            if (!animationsPaused) {
                if (this.dead) {
                    if (!this.deathAnimationComplete) {
                        this.loadImage(this.IMAGES_DEAD[0]);
                        this.deathAnimationComplete = true;
                    }
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 200);
    }

    /**
     * cleans up intervals when the chicken is removed
     */
    getHitbox() {
        return {
            x: this.x + 5,
            y: this.y + 5,
            width: this.width - 10,
            height: this.height - 10,
        };
    }

    cleanup() {
        if (this.movementInterval) clearInterval(this.movementInterval);
        if (this.imageInterval) clearInterval(this.imageInterval);
    }
    
    /**
     * kills the enemy
     */
    killEnemy() {
        if (this.dead) return; 
        
        this.dead = true;
        this.speed = 0;
        
        this.loadImage(this.IMAGES_DEAD[0]);
        
        setTimeout(() => {
            this.markedForRemoval = true;
        }, 1000); 
    }
}