/**
 * Endboss status bar class
 */
class StatusBarEndboss extends StatusBar {

    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    /**
     * @type {number} Percentage of endboss health
     */
    percentage = 100;

    /**
     * Creates a new endboss status bar
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 470;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of endboss health and updates the image accordingly
     * @returns {number} Index of the image to be displayed based on the percentage of health
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}