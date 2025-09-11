class DrawableObject {
    
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // character.isColliding(chicken)
    isColliding(mo) {
        let thisBox = this.getHitbox();
        let moBox = mo.getHitbox();
    
    return thisBox.x < moBox.x + moBox.width &&
           thisBox.x + thisBox.width > moBox.x &&
           thisBox.y < moBox.y + moBox.height &&
           thisBox.y + thisBox.height > moBox.y;
    }

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

    draw(ctx) {
        if (this.img) { 
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } 
    }   

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}