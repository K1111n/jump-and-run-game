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
    imageCache = [];

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

    // character.isColliding(chicken)
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

    /**
     * returns the hitbox of the object
     * @returns {Object} Hitbox for collision detection
     */
    getHitbox() {
        if(this instanceof Character) {
            return {
                x: this.x + 20, 
                y: this.y + 80,  
                width: this.width - 40,  
                height: this.height - 90,  
            };
        }
        else if(this instanceof Chicken) {
            return {
                x: this.x + 5,
                y: this.y + 5,
                width: this.width - 10,
                height: this.height - 10,
            };
        }
        else if(this instanceof ChickenSmall) {
            return {
                x: this.x + 5,
                y: this.y + 5,
                width: this.width - 10,
                height: this.height - 10,
            };
        }
        else if(this instanceof Endboss) {
            return {
                x: this.x + 20,
                y: this.y + 60,
                width: this.width - 40,
                height: this.height - 70,
            };
        }
        else if(this instanceof Bottles) {
            return {
                x: this.x + 35,  
                y: this.y + 15,   
                width: 30,        
                height: 60,       
            };
        }
        else if(this instanceof Coin) {
            return {
                x: this.x + 40,   
                y: this.y + 40,   
                width: 40,        
                height: 40,       
            };
        }
        else if(this instanceof ThrowableObject) {
            return {
                x: this.x + 10,
                y: this.y + 10,
                width: this.width - 20,
                height: this.height - 20,
            };
        }
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