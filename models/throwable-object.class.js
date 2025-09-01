class ThrowableObject extends MovableObject {

     IMAGES_BOTTLE_ROTATION = [
            '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLE_SPLASH = [
            '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    IMAGES_BOTTLE_ON_GROUND = [
            '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]



    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 1000 / 60);
    }
}