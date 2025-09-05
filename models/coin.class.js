class Coin extends DrawableObject {

    IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.width = 120;
        this.height = 120;
        this.x = 500 + Math.random() * 1500;    
        this.y = 345;
    }

}