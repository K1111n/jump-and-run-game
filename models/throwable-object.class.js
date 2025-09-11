class ThrowableObject extends MovableObject {

     IMAGES_BOTTLE_ROTATION = [
            '/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            '/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            '/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            '/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLE_SPLASH = [
            '/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            '/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            '/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            '/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            '/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            '/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.bottleSplash = false;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        setInterval(() => {
            if(!this.bottleSplash) {
                this.x += 5;
            }
        }, 1000 / 60);
    }

    splashBottle() {
        if(this.bottleSplash) return;
        this.bottleSplash = true;
    }

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