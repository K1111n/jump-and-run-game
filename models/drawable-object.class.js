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

    draw(ctx) {
        if (this.img) { 
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } 
    }   

    // drawFrame(ctx) {
    //     if(this instanceof Chicken || this instanceof ChickenSmall) {
    //         ctx.beginPath();
    //         ctx.lineWidth = "3"; 
    //         ctx.strokeStyle = "blue";
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     } 
    //     else if(this instanceof Bottles) {
    //         ctx.beginPath();
    //         ctx.lineWidth = "3"; 
    //         ctx.strokeStyle = "green";
    //         ctx.rect(this.x + 30, this.y + 10, 30, 60);
    //         ctx.stroke();
    //     } 
    //     else if(this instanceof Coin) {
    //         ctx.beginPath();
    //         ctx.lineWidth = "3"; 
    //         ctx.strokeStyle = "orange";
    //         ctx.rect(this.x + 45, this.y + 45, 30, 30);
    //         ctx.stroke();
    //     }
    //     else if(this instanceof Endboss) {
    //         ctx.beginPath();
    //         ctx.lineWidth = "3"; 
    //         ctx.strokeStyle = "red";
    //         ctx.rect(this.x + 20, this.y + 60, this.width - 30, this.height - 60);
    //         ctx.stroke();
    //     }
    //     else if(this instanceof Character) {
    //         ctx.beginPath();
    //         ctx.lineWidth = "3"; 
    //         ctx.strokeStyle = "purple";
    //         ctx.rect(this.x + 10, this.y, this.width - 20, this.height - 15);
    //         ctx.stroke();
    //     }
    //     else if(this instanceof ThrowableObject) {
    //         ctx.beginPath();
    //         ctx.lineWidth = "3"; 
    //         ctx.strokeStyle = "yellow";
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}