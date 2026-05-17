/**
 * base class for all movable objects
 */
class MovableObject extends DrawableObject {
    
    /**
     * @type {number} Movement speed
     */
    speed = 0.15;

    /**
     * @type {boolean} Facing direction (true = left)
     */
    otherDirection = false;

    /**
     * @type {number} Vertical speed
     */
    speedY = 0;

    /**
     * @type {number} Gravity acceleration
     */
    acceleration = 2.5;

    /**
     * @type {number} Energy/Health
     */
    energy = 100;

    /**
     * @type {number} Number of collected coins
     */
    coins = 0;

    /**
     * @type {number} Number of collected bottles
     */
    bottles = 0;

    /**
     * @type {number} Timestamp of the last hit
     */
    lastHit = 0;

    /**
     * applies gravity to the object
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * checks if the object is above the ground
     * @returns {boolean} True if in the air
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) { // Throwable Object should always fall
            return true;
        } else {
            return this.y < 150;
        }
    }

    /**
     * reduces energy when hit
     */
    hit() {
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = Date.now();
            if (window.soundManager) {
                window.soundManager.play('hurt');
            }
        }
    }

    /**
     * increases the number of collected coins
     */
    collectCoin() {
        this.coins += 1;
    }

    /**
     * increases the number of collected bottles
     */
    collectBottle() {
        this.bottles += 1;
    }

    /**
     *  checks if energy is 0
     * @returns {boolean} True if energy is 0
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     *  checks if the object was hit in the last second
     * @returns {boolean} True if the object was hit in the last second
     */
    isHurt() {
        let timepassed = Date.now() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    /**
     * plays an animation
     * @param {[]} images - array of image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * moves the object to the right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * moves the object to the left
     */
    moveLeft() {
        this.x -= this.speed; 
    }

    /**
     * makes the object jump
     */
    jump() {
        this.speedY = 30;
        if (window.soundManager) {
            window.soundManager.play('jump');
        }
    }
}