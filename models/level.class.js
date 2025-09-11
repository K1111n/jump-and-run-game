/**
 * Level class
 */
class Level {
    /**
     * @type {MovableObject[]} Array of enemies
     */
    enemies;

    /**
     * @type {Cloud[]} Array of clouds
     */
    clouds;

    /**
     * @type {backgroundObjects[]} Array of background objects  
     */
    backgroundObjects;

    /** @type {Coin[]} Array of coins */
    coins;
    
    /** @type {Bottles[]} Array of bottles */
    bottles;

    /**
     * @type {number} Level end position
     */
    level_end_x = 719*6;

     /**
     * Creates a new level
     * @constructor
     * @param {MovableObject[]} enemies - Enemies in the level
     * @param {BackgroundObject[]} backgroundObjects - Background objects
     * @param {Cloud[]} clouds - Clouds in the level
     * @param {Coin[]} coins - Coins in the level
     * @param {Bottles[]} bottles - Bottles in the level
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}