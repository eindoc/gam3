const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('resetBtn');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 3;
let isGameOver = true;

function hideResetBtn() {
    resetBtn.style.display = 'none';
}

function showResetBtn() {
    resetBtn.style.display = 'block';
}

// const gradient = ctx.createLinearGradient(0, 0, 0, 70);
// gradient.addColorStop('0.4', '#fff');
// gradient.addColorStop('0.5', '#000');
// gradient.addColorStop('0.55', '#88c766ff');
// gradient.addColorStop('0.6', '#000');
// gradient.addColorStop('0.9', '#fff');

function resetGame() {
    score = 0;
    gameSpeed = 3;
    hue = 0;
    frame = 0;
    spacePressed = false;
    angle = 0;
    isGameOver = false;
    bird = new Bird();
    obstaclesArray.length = 0;
    particlesArray.length = 0;
    // document.getElementById('resetBtn').disabled = true;
    animate();
}

function animate() {
    if (isGameOver) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(10, canvas.height - 90, 50, 50);
    hideResetBtn();
    handleObstacles();
    handleParticles();
    bird.update();
    bird.draw();
    ctx.fillStyle = '#88c766ff';
    ctx.font = '40px Courier New';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
    ctx.strokeText(score, 15, 40);
    ctx.fillText(score, 15, 40);
    if (handleCollisions()) {
        isGameOver = true;
        return;
    }
    requestAnimationFrame(animate);
    // angle += 0.14;
    hue += 4;
    frame++;
}
animate();

window.addEventListener('keydown', function(e){
    if (e.code === 'Space') spacePressed = true;
});
window.addEventListener('keyup', function(e){
    if (e.code === 'Space') spacePressed = false;
});
window.addEventListener('keyup', function(e) {
    if (isGameOver && e.code === 'Enter') {
        resetBtn.click();
    };
})

// collision/death popup
const bang = new Image();
bang.src = 'ianduckpixel.png';
function handleCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top &&
            bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
            bird.y + bird.height < canvas.height))) {
                // collision detected
                 ctx.drawImage(bang, bird.x - 20, bird.y - 20, 50, 50);
                 ctx.font = "25px Courier New";
                 ctx.fillStyle = 'black';
                 ctx.fillText('no maidens?', 10, canvas.height / 2);
                showResetBtn();

                 return true;
            }
            
        
    }
    return false;
}