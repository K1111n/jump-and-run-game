/**
 * Main class that manages the game world, including character, level, and interactions.
 */
class World {

    /**
     * @type {Character} The player of the game.
     */
    character = new Character();

    /**
     * @type {Level} Current level 
     */
    level = level1;

    /**
     * @type {HTMLCanvasElement} Canvas element
     */
    canvas;

    /**
     * @type {CanvasRenderingContext2D} Rendering context
     */
    ctx;

    /**
     * @type {Keyboard} Keyboard handler
     */
    keyboard;

    /**
     * @type {number} Camera X position
     */
    camera_x = 0;

    /**
     * @type {StatusBar} Health bar
     */
    statusBar = new StatusBar();

    /**
     * @type {CoinBar} Coin bar
     */
    coinBar = new CoinBar();

    /**
     * @type {BottleBar} Bottle bar
     */
    bottleBar = new BottleBar();

    /**
     * @type {StatusBarEndboss} Endboss health bar
     */
    statusBarEndboss = new StatusBarEndboss();

    /**
     * @type {ThrowableObject[]} Array of thrown objects
     */
    throwableObjects = [];

    /**
     * Creates a new game world
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {Keyboard} keyboard - Keyboard handler
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.pauseAnimations = false;
        this.level = level1;
        this.draw();
        this.setWorld();
        this.run();
        this.startEnemyAnimations();
    }

    /**
     * sets the world for the character
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * starts animations for all enemies in the level
     */
    startEnemyAnimations() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.animationStarted) {
                enemy.animate();
            }
        });
    }
  
    /**
     * Starts the game logic loop
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 1000 / 60);
    
        setInterval(() => {
            this.checkThrowObjects();
        }, 100); 
    }

    /**
     * checks if bottles are thrown
     */
    checkThrowObjects() {
        if(this.keyboard.SPACE && this.character.bottles > 0 && !this.bottleThrown) {
            
            let throwDirection = this.character.otherDirection ? -1 : 1;
            let newThrowX = this.character.otherDirection ? -50 : 100;
            let bottle = new ThrowableObject(this.character.x + newThrowX, this.character.y + 100, throwDirection);

            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.bottleBar.setPercentage(this.character.bottles);

            this.bottleThrown = true;
        setTimeout(() => {
            this.bottleThrown = false;
            }, 500);
        }
    }

    /**
     * checks all collisions between character, enemies, coins and bottles
     */
    checkCollisions() {
        if(!this.character.isDead()) {
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
        }
        this.checkBottleEnemyCollisions();
    }

    /**
     * checks collisions between character and enemies
     */
    checkEnemyCollisions() {
        let enemiesToDefeat = [];
        let characterTookDamage = false;
        
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && !enemy.isDead) {
                if(this.isJumpKill(enemy)) {
                    enemiesToDefeat.push(enemy);
                } else if(!characterTookDamage && !this.character.invulnerable) {
                    this.character.hit();
                    if (window.soundManager) {
                        window.soundManager.play('hurt');
                    }
                    this.statusBar.setPercentage(this.character.energy);
                    characterTookDamage = true;
                }
            }
        });
        
        this.handleEnemyDefeats(enemiesToDefeat);
    }

    /**
     * Checks if an enemy is killed by a jump
     */
    isJumpKill(enemy) {
        let characterBox = this.character.getHitbox();
        let enemyBox = enemy.getHitbox();
        
        let isFalling = this.character.speedY < 0;
        let characterBottom = characterBox.y + characterBox.height;
        let enemyTop = enemyBox.y;
        let overlapY = characterBottom - enemyTop;
        
        return isFalling && overlapY >= 0 && overlapY <= 50;
    }

    /**
     * Handles defeated enemies
     */
    handleEnemyDefeats(enemiesToDefeat) {
        if(enemiesToDefeat.length > 0) {
            enemiesToDefeat.forEach(enemy => {
                enemy.killEnemy();
                if (window.soundManager) {
                    window.soundManager.play('enemyDefeated');
                }
            });
            this.character.speedY = 20; 
            if (window.soundManager) {
                window.soundManager.play('jump');
            }
        }
        
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.markedForRemoval);
    }

    /**
     * Checks collisions with coins
     */
    checkCoinCollisions() {
        this.level.coins = this.level.coins.filter(coin => {
            if(this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.coinBar.setPercentage(this.character.coins);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks collisions with bottles
     */
    checkBottleCollisions() {
        this.level.bottles = this.level.bottles.filter(bottle => {
            if(this.character.isColliding(bottle)) {
                this.character.collectBottle();
                if (window.soundManager) {
                    window.soundManager.play('bottle');
                }
                this.bottleBar.setPercentage(this.character.bottles);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks collisions between thrown bottles and enemies
     */
    checkBottleEnemyCollisions() {
        let bottlesToRemove = [];
        
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if(bottle.isColliding(enemy) && !enemy.isDead && !bottle.bottleSplash) {
                    this.handleBottleHit(enemy, bottle, bottleIndex, bottlesToRemove);
                }
            });
        });
        
        this.removeUsedBottles(bottlesToRemove);
    }

    /**
     * Handles hits from bottles on enemies
     */
    handleBottleHit(enemy, bottle, bottleIndex, bottlesToRemove) {
        if(enemy instanceof Endboss) {
            enemy.hit();
            this.statusBarEndboss.setPercentage(enemy.energy * 4);
            if (window.soundManager) {
                window.soundManager.play('hurt');
            }
        } else {
            enemy.killEnemy();
            if (window.soundManager) {
                window.soundManager.play('enemyDefeated');
            }
        }
        
        bottle.splashBottle();
        if(!bottlesToRemove.includes(bottleIndex)) {
            bottlesToRemove.push(bottleIndex);
        }
    }

    /**
     * Removes used bottles after a delay
     */
    removeUsedBottles(bottlesToRemove) {
        if(bottlesToRemove.length > 0) {
            setTimeout(() => {
                this.throwableObjects = this.throwableObjects.filter((bottle, index) => {
                    return !bottlesToRemove.includes(index);
                });
            }, 500);
        }
    }

    /**
     * main draw method
     */
    draw() {
        if (this.pauseAnimations) {
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_x, 0); // Back
        // -------- Space for fixed Objects --------
        this.addToMap(this.statusBar);        
        this.addToMap(this.coinBar);        
        this.addToMap(this.bottleBar);        
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0); // Forward
        
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {  
            self.draw();
        });
    }

    /**
     * adds multiple objects to the map
     * @param {DrawableObject} objects - Array of drawable objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * adds a single object to the map
     * @param {DrawableObject} mo - Drawable object
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * flips an image horizontally
     * @param {DrawableObject} mo - Object to flip
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width , 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1;
    }

    /**
     * restores a flipped image
     * @param {DrawableObject} mo - Object to restore
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}