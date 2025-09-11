class ChickenSmall extends MovableObject {

    y = 360;
    height = 60;
    width = 50;
    isDead = false;
    IMAGES_WALKING = [
            '/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
            '/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
            '/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        ]

    IMAGES_DEAD = [
        '/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    
        this.x = 500 + Math.random() * 1500;    
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {   
            if (!this.isDead) {     
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {       
            if (this.isDead) {  
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    killEnemy() {
        this.isDead = true;
        this.speed = 0;
        setTimeout(() => {
            this.markedForRemoval = true;
        }, 200);
    }
}