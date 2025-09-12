/**
 * Bottle bar class
 */
class BottleBar extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    /**
     * @type {number} Number of bottles
     */
    bottles = 0;

    /**
     *  creates a new bottle bar
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of bottles collected and updates the image accordingly
     * @param {number} bottles  - Number of bottles
     */
    setPercentage(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     *  Resolves the index of the image to be displayed based on the number of bottles
     * @returns {number} Index of the image to be displayed based on the number of bottles
     */
    resolveImageIndex() {
        if (this.bottles >= 5) {
            return 5;
        } else if (this.bottles == 4) {
            return 4;
        } else if (this.bottles == 3) {
            return 3;
        } else if (this.bottles == 2) {
            return 2;
        } else if (this.bottles == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}