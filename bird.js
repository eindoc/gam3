let gravity = 0.9;
let flyPower = 1.5;

class Bird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.width = 20;
        this.height = 20;
        this.weight = .4;
    }
    
    update() {
        let curve = Math.sin(angle) * 4;

        if (this.y > canvas1.height - (this.height * 3) + curve) {
            this.y = canvas1.height - (this.height * 3) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.y += this.vy;
            this.vy *= gravity;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * flyPower) {
            this.flap();
            
            
    }}

    draw() {
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    flap() {
        this.vy -= .8;
        
    }
}

let bird = new Bird();