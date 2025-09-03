class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 719*6;

    constructor(enemies, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }
}