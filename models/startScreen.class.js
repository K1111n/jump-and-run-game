class StartScreen extends DrawableObject {
    width = 720;
    height = 480;

    constructor() {
        super();
        this.loadImage('../img/9_intro_outro_screens/start/startscreen_2.png');
        this.x = 0;
        this.y = 0;
        this.draw();
    }

    draw() {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
        };
    }
}