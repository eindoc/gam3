const obstaclesArray = [];

let barHeight = 3;

class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas1.height / barHeight) + 20;
        this.bottom = (Math.random() * canvas1.height / barHeight) + 20;
        this.x = canvas1.clientWidth;
        this.width = (Math.random() * canvas1.width / 3);
        this.color = 'hsla(' + hue + ', 100%, 50%, 1)';
        this.counted = false;
        barHeight = Math.min(3, Math.max(8));
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas1.height - this.bottom, this.width, this.bottom);        
    }

    update() {
        this.x -= gameSpeed;
        if (!this.counted && this.x < bird.x) {
            score++;
            this.counted = true;
            gameSpeed += (score % 5 === 0) ? 0.5 : 0;
            console.log(gameSpeed);
        }
        this.draw();
    }
}

function handleObstacles() {
    if (frame%20 === 0) {
        obstaclesArray.unshift(new Obstacle);
    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0]);
    }
}