/**
 * Base class for all drawable objects in the game.
 */
class DrawableObject {
    
    /**
     * @type {HTMLImageElement} Object image
     */
    img;

    /**
     * @type {Object} Cache for loaded images 
     */
    imageCache = {};

    /**
     * @type {number} Current image index for animations
     */
    currentImage = 0;

    /**
     * @type {number} X position
     */
    x = 120;

    /**
     * @type {number} Y position
     */
    y = 280;

    /**
     * @type {number} Object height
     */
    height = 150;

    /**
     * @type {number} Object width
     */
    width = 100;

    /**
     * loads a single image
     * @param {string} path to the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * checks collision with another object
     * @param {DrawableObject} mo - other object
     * @returns {boolean} True if colliding
     */
    isColliding(mo) {
        let thisBox = this.getHitbox();
        let moBox = mo.getHitbox();
    
    return thisBox.x < moBox.x + moBox.width &&
           thisBox.x + thisBox.width > moBox.x &&
           thisBox.y < moBox.y + moBox.height &&
           thisBox.y + thisBox.height > moBox.y;
    }

    getHitbox() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    /**
     * draws the object on the canvas
     * @param {CanvasRenderingContext2D} ctx Canvas context
     */
    draw(ctx) {
        if (this.img) { 
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } 
    }   

    /**
     * loads multiple images into the cache
     * @param {[]} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}