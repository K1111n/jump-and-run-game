class Bottles extends DrawableObject {  

    IMAGES_BOTTLE_ON_GROUND = [
            '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    constructor() {
        super().loadImage('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.width = 70;
        this.height = 70;
        this.x = 500 + Math.random() * 1500;    
        this.y = 360;
    }
}