/**
 * BackgroundObject class
 */
class BackgroundObject extends MovableObject {

    /**
     * @type {number} Width
     */
    width = 720;

    /**
     * @type {number} Height
     */
    height = 480;

    /**
     * Creates a new background object
     * @constructor
     * @param {string} imagePath - Path to the image
     * @param {number} x - X position
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480- this.height;
    }
 
} 