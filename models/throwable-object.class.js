/**
 * Throwable bottle class
 */
class ThrowableObject extends MovableObject {

     IMAGES_BOTTLE_ROTATION = [
            './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLE_SPLASH = [
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    /**
     * creates a new throwable bottle
     * @param {number} x - X position of the bottle
     * @param {number} y - Y position of the bottle
     */
    constructor(x, y,  direction = 1) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.bottleSplash = false;
        this.throwDirection = direction;
        this.throw();
    }

    /**
     * Throws the bottle
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        setInterval(() => {
            if(!this.bottleSplash) {
                this.x += 5 * this.throwDirection;
            }
        }, 1000 / 60);
    }

    /**
     * activates splash animation
     * @returns if the bottle has splashed do nothing.
     */
    splashBottle() {
        if(this.bottleSplash) return;
        this.bottleSplash = true;
    }

    /**
     * animates the bottle
     */
    animate() {
        setInterval(() => {
            if(!this.bottleSplash) {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            }
        }, 100);
    }
}