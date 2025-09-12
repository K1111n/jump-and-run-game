/**
 * Small chicken enemy class
 */
class ChickenSmall extends MovableObject {

    /**
     * @type {number} Y position
     */
    y = 380;

    /**
     * @type {number} Height
     */
    height = 60;

    /**
     * @type {number} Width
     */
    width = 50;

    /**
     * @type {boolean} Death status 
     */
    isDead = false;

    /**
     * @type {boolean} Death animation completed
     */
    deathAnimationComplete = false;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /**
     * creates small chicken enemy
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    
        this.x = 500 + Math.random() * 1500;    
        this.speed = 0.15 + Math.random() * 0.25;

        this.isDead = false; 
        this.markedForRemoval = false;

        this.animate();
    }

    /**
     * animates small chicken enemy
     */
    animate() {
        setInterval(() => {   
            if (!this.isDead) {     
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {       
            if (this.isDead) {
                if (!this.deathAnimationComplete) {
                    this.loadImage(this.IMAGES_DEAD[0]);
                    this.deathAnimationComplete = true;
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * kills the small chicken enemy
     */
    killEnemy() {
        if (this.isDead) return; 
        
        this.isDead = true;
        this.speed = 0;
        
        this.loadImage(this.IMAGES_DEAD[0]);
        
        setTimeout(() => {
            this.markedForRemoval = true;
        }, 1000); 
    }
}