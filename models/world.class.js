class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }
  
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200)
    }

    checkThrowObjects() {
        if(this.keyboard.SPACE && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.bottleBar.setPercentage(this.character.bottles);
        }

    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
                if(this.character.isColliding(enemy) ) {
                    if(this.character.y + this.character.height - 15 > enemy.y) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    } else if(this.character.y + this.character.height - 15 <= enemy.y) {
                        this.level.enemies.splice(index, 1);
                    }
                }
            });
        this.level.coins.forEach((coin, index) => {
                if(this.character.isColliding(coin)) {
                    this.level.coins.splice(index, 1);
                    this.character.collectCoin();
                    this.coinBar.setPercentage(this.character.coins);
                }
            });
        this.level.bottles.forEach((bottle, index) => {
                if(this.character.isColliding(bottle)) {
                    this.level.bottles.splice(index, 1);
                    this.character.collectBottle();
                    this.bottleBar.setPercentage(this.character.bottles);
                }
            });
        this.throwableObjects.forEach((bottle, bottleIndex) => {
                this.level.enemies.forEach((enemy, enemyIndex) => {
                    if(bottle.isColliding(enemy)) {
                        if(enemy instanceof Endboss) {
                            enemy.hit();
                            this.statusBarEndboss.setPercentage(enemy.energy / 25 * 100);
                            if(enemy.isDead) {
                                console.log('Endboss defeated');
                            }
                        } else {
                            this.level.enemies.splice(enemyIndex, 1);
                        }
                        this.throwableObjects.splice(bottleIndex, 1);
                    }
                });
            });
    }

    draw() {
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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width , 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}