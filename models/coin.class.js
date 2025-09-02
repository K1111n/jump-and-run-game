class Coin extends drawableObject {

    IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 40;
        this.height = 40;
        this.x = 400;
        this.y = 400;
    }

}