/**
 * Player character class
 */
class Character extends MovableObject {
    /**
     * @type {number} Character height in pixels
     */
    height = 280;

    /**
     * @type {number} Y position
     */
    y = 150;

    /**
     * @type {number} Number of collected coins
     */
    coins = 0;

    /**
     * @type {number} Number of collected bottles
     */
    bottles = 0;

    /**
     * @type {number} Timestamp of last movement
     */
    lastMovement = new Date().getTime();

    /**
     * @type {boolean} Indicates if death animation is complete
     */
    deathAnimationComplete = false;

    /**
     * @type {boolean} Track if jump animation has started
     */
    jumpAnimationStarted = false;

    /**
     * @type {number} Jump animation frame counter
     */
    jumpAnimationFrame = 0;

    /**
     * @type {boolean} Was above ground in last frame
     */
    wasAboveGroundLastFrame = false;

    invulnerable = false;
    invulnerabilityDuration = 1500;
    
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_SLEEPING = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * @type {World} Reference to the game world
     */
    world;

    /**
     * @type {number} Movement speed
     */
    speed = 7;

    /**
     * creates a new player character
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
    }

    /**
     * starts character animations
     */
    animate() {
        setInterval(() => {
            if(!this.isDead()) {
                if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.lastMovement = new Date().getTime();
                }

                if(this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.lastMovement = new Date().getTime();
                }

                if(this.world.keyboard.UP && !this.isAboveGround()) {
                    this.jump();
                    this.lastMovement = new Date().getTime();
                    this.jumpAnimationStarted = true;
                    this.jumpAnimationFrame = 0;
                }
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.wasAboveGroundLastFrame && !this.isAboveGround()) {
                this.jumpAnimationStarted = false;
                this.jumpAnimationFrame = 0;
            }
            
            if(this.isDead()) {       
                if(!this.deathAnimationComplete) {
                    this.playAnimation(this.IMAGES_DEAD);
                    let i = this.currentImage % this.IMAGES_DEAD.length;
                    if(i === this.IMAGES_DEAD.length - 1) {
                        this.deathAnimationComplete = true;
                        this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
                    }
                }
            } else if(this.isHurt()) {                
                this.playAnimation(this.IMAGES_HURT); 
            } else if(this.isAboveGround()) {
                this.playJumpAnimationOnce();
            } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if(this.isSleeping()) {
                this.playAnimation(this.IMAGES_SLEEPING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
            
            this.wasAboveGroundLastFrame = this.isAboveGround();
        }, 200);
    }

    /**
     * checks if character is sleeping (after 10 seconds of inactivity)
     * @returns {boolean} True if sleeping
     */
    isSleeping() {
        let timepassed = new Date().getTime() - this.lastMovement;
        timepassed = timepassed / 1000; 
        return timepassed > 10; 
    }
    
    /**
     * processes a hit on the character
     */
    hit() {
        if (this.invulnerable) return; 
        
        this.energy -= 20; 
        if(this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.invulnerable = true;
            
            setTimeout(() => {
                this.invulnerable = false;
            }, this.invulnerabilityDuration);
        }
    }

    /**
     * checks if the character is hurt
     * @returns {boolean} True if recently hurt
     */
    isHurt() {
        if(this.isDead()) return false;
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    /**
     * checks if the character is dead
     * @returns {boolean} True if dead
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * collects a coin, up to a maximum of 5
     */
    collectCoin() {
        this.coins++;
        if(this.coins > 5) {
            this.coins = 5; 
        }
    }

    /**
     * collects a bottle, up to a maximum of 5  
     */
    collectBottle() {
        this.bottles++;
        if(this.bottles > 5) {
            this.bottles = 5;
        }
    }

    /**
     * Plays jump animation only once per jump
     */
    playJumpAnimationOnce() {
        if (this.jumpAnimationStarted && this.jumpAnimationFrame < this.IMAGES_JUMPING.length) {
            let frameIndex = Math.floor(this.jumpAnimationFrame);
            if (frameIndex < this.IMAGES_JUMPING.length) {
                this.img = this.imageCache[this.IMAGES_JUMPING[frameIndex]];
            }
            
            this.jumpAnimationFrame += 0.3; 
        } else if (!this.jumpAnimationStarted) {
            this.img = this.imageCache[this.IMAGES_JUMPING[0]];
        }
        else {
            this.img = this.imageCache[this.IMAGES_JUMPING[this.IMAGES_JUMPING.length - 1]];
        }
    }

    /**
     * makes the object jump - override to reset animation
     */
    jump() {
        this.speedY = 30;
        this.jumpAnimationStarted = true;
        this.jumpAnimationFrame = 0;
        if (window.soundManager) {
            window.soundManager.play('jump');
        }
    }
}