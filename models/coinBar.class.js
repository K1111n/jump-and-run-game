class CoinBar extends DrawableObject {
    IMAGES = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    coins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(coins) {
        this.coins = coins;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.coins >= 5) {
            return 5;
        } else if (this.coins == 4) {
            return 4;
        } else if (this.coins == 3) {
            return 3;
        } else if (this.coins == 2) {
            return 2;
        } else if (this.coins == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}