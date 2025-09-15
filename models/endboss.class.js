/**
 * Endboss class representing the final enemy in the game.
 */
class Endboss extends MovableObject {

    /**
     * @type {number} Height 
     */
    height = 400;

    /**
     * @type {number} Width
     */
    width = 250;

    /**
     * @type {number} Y position
     */
    y = 55;

    /**
     * @type {number} Energy 
     */
    energy = 25; 

    /**
     * @type {boolean} death status
     */
    isDead = false;

    /**
     * @type {boolean} Hurt animation status
     */
    isHurtAnimation = false;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Creates a new endboss
     */
    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4000;
        this.speed = 0.5;
        
        this.animationStarted = false;
    }

    /**
    * Animates the endboss by moving and changing its image based on its state.
    */
    animate() {
        this.animationStarted = true;
        
        this.movementInterval = setInterval(() => {
            if (!this.isDead && !animationsPaused) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.jumpInterval = setInterval(() => {
            if (!this.isDead && !animationsPaused) {
                this.jump();
            }
        }, 5000);

        this.applyGravity();
        
        this.imageInterval = setInterval(() => {
            if (!animationsPaused) {
                if (this.isDead) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (this.isHurtAnimation) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.x > 3700) {
                    this.playAnimation(this.IMAGES_ALERT);
                } else if (this.x <= 3700 && this.x > 3500) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 200);
    }

    /**
     * cleans up intervals when the object is removed
     */
    cleanup() {
        if (this.movementInterval) clearInterval(this.movementInterval);
        if (this.jumpInterval) clearInterval(this.jumpInterval);
        if (this.imageInterval) clearInterval(this.imageInterval);
    }

    /**
     * processes a hit on the endboss
     * @returns {boolean} Whether the endboss is dead, or if another hit is possible.
     */
    hit() {
        if (this.isDead) return; 
        
        this.energy -= 5;
        this.isHurtAnimation = true;
        
        setTimeout(() => {
            this.isHurtAnimation = false;
        }, 500);
        
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead = true;
            this.speed = 0;
            setTimeout(() => {
                this.markedForRemoval = true;
            }, 2000);
        }
    }

    /**
    * Makes the endboss jump
    */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 50; 
        }
    }

    /**
    * Checks if the endboss is above ground (customized for endboss size)
    * @returns {boolean} True if above ground
    */
    isAboveGround() {
        return this.y < 55; 
    }
}