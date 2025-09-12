/**
 * Cloud class
 */
class Cloud extends MovableObject {

    /**
     * @type {number} Y position
     */
    y = 20;

    /**
     * @type {number} height
     */
    height = 250;

    /**
     * @type {number} width
     */
    width = 500;

    /**
     * Creates a new cloud
     */
    constructor() {
         super().loadImage('./img/5_background/layers/4_clouds/1.png');
    
         this.x = Math.random() * 500; 
         this.animate();
    }

    /**
     * Animates the cloud movement
     */
    animate() {
        this.moveLeft();
    }
}