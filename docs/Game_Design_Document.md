// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI elements
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreEl = document.getElementById('score');
const gameOverDiv = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');

// Game constants
const PLAYER_SIZE = 40;
const PLAYER_SPEED = 5;
const COIN_SIZE = 24;
const OBSTACLE_SIZE = 36;

// Game variables
let player, coins, obstacles, score, gameActive, frameCount, speedMultiplier;

// Sound effects (optional, simple beep)
function playBeep() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.05);
}

// Player object
function resetPlayer() {
    player = {
        x: canvas.width / 2 - PLAYER_SIZE / 2,
        y: canvas.height - PLAYER_SIZE - 10,
        w: PLAYER_SIZE,
        h: PLAYER_SIZE,
        dx: 0,
        dy: 0
    };
}

// Coin object
function spawnCoin() {
    return {
        x: Math.random() * (canvas.width - COIN_SIZE),
        y: -COIN_SIZE,
        w: COIN_SIZE,
        h: COIN_SIZE,
        speed: Math.random() * .7 + .7 + speedMultiplier * .4
    };
}

// Obstacle object
function spawnObstacle() {
    return {
        x: Math.random() * (canvas.width - OBSTACLE_SIZE),
        y: -OBSTACLE_SIZE,
        w: OBSTACLE_SIZE,
        h: OBSTACLE_SIZE,
        speed: Math.random() * .8 + .8 + speedMultiplier * .5
    };
}

// Input handling
let keys = {};
document.addEventListener('keydown', (e) => { keys[e.key] = true; });
document.addEventListener('keyup', (e) => { keys[e.key] = false; });

// Main game functions
function startGame() {
    score = 0;
    frameCount = 0;
    speedMultiplier = 1;
    resetPlayer();
    coins = [spawnCoin()];
    obstacles = [spawnObstacle()];
    gameActive = true;

    startBtn.classList.add('hidden');
    gameOverDiv.classList.add('hidden');
    updateScore();
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameActive = false;
    finalScoreEl.textContent = `Final Score: ${score}`;
    gameOverDiv.classList.remove('hidden');
}

function updateScore() {
    scoreEl.textContent = `Score: ${score}`;
}

// Collision detection
function isColliding(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

// Draw functions
function drawPlayer() {
    ctx.fillStyle = '#36c';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Simple face
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(player.x + player.w/2 -8, player.y + player.h/2 -6,3,0,Math.PI*2);
    ctx.arc(player.x + player.w/2 +8, player.y + player.h/2 -6,3,0,Math.PI*2);
    ctx.fill();
}

function drawCoin(coin) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(coin.x + coin.w/2, coin.y + coin.h/2, COIN_SIZE/2,0,Math.PI*2);
    ctx.fillStyle = '#fc3';
    ctx.shadowColor = "#fe0";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();
}

function drawObstacle(obstacle) {
    ctx.save();
    ctx.fillStyle = "#c33";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(obstacle.x + obstacle.w/2, obstacle.y + obstacle.h/2, OBSTACLE_SIZE/2,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Angry face!
    ctx.save();
    ctx.strokeStyle="#fff";
    ctx.lineWidth=1.5;
    // Eyes
    ctx.beginPath();
    ctx.arc(obstacle.x+OBSTACLE_SIZE/2-7,obstacle.y+OBSTACLE_SIZE/2-6,2.5,0,Math.PI*2);
    ctx.arc(obstacle.x+OBSTACLE_SIZE/2+7,obstacle.y+OBSTACLE_SIZE/2-6,2.5,0,Math.PI*2);
    ctx.stroke();
    // Mouth
    ctx.beginPath();
    ctx.moveTo(obstacle.x+OBSTACLE_SIZE/2-6,obstacle.y+OBSTACLE_SIZE/2+8);
    ctx.lineTo(obstacle.x+OBSTACLE_SIZE/2+6,obstacle.y+OBSTACLE_SIZE/2+8);
    ctx.stroke();
    ctx.restore();
}

// Game loop
function gameLoop() {
    if (!gameActive) return;

    // Update difficulty scaling
    frameCount++;
    if (frameCount %240 ===0) speedMultiplier += .12;

    // Clear
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Move player
    if (keys['ArrowLeft'] || keys['a']) player.x -= PLAYER_SPEED;
    if (keys['ArrowRight'] || keys['d']) player.x += PLAYER_SPEED;

    // Clamp player
    player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));

    // Coins logic
    for (let i=coins.length-1;i>=0;i--) {
        let coin=coins[i];
        coin.y += coin.speed;

        // Draw coin
        drawCoin(coin);

        // Collect
        if (isColliding(player, coin)) {
            coins.splice(i,1);
            score +=10;
            updateScore();
            playBeep();

            // Add new coin
            coins.push(spawnCoin());
            continue;
        }

        // Off screen?
        if (coin.y > canvas.height) 
            coins[i]=spawnCoin();
    }

    // Obstacles logic
    for (let i=obstacles.length-1;i>=0;i--) {
        let obs=obstacles[i];
        obs.y += obs.speed;

        // Draw obstacle
        drawObstacle(obs);

        // Hit?
        if (isColliding(player, obs)) {
            playBeep(); playBeep(); // Double beep for hit!
            endGame();
            return;
        }

        // Off screen?
        if (obs.y > canvas.height)
            obstacles[i]=spawnObstacle();
        
        // Occasionally add more obstacles as score increases
        if (score>=40 && obstacles.length<2) obstacles.push(spawnObstacle());
        if (score>=100 && obstacles.length<3) obstacles.push(spawnObstacle());
        if (score>=200 && obstacles.length<4) obstacles.push(spawnObstacle());
    }

    // Draw player last (on top)
    drawPlayer();

    requestAnimationFrame(gameLoop);
}

// Button events
startBtn.onclick=startGame;
restartBtn.onclick=startGame;

// Touch controls for mobile:
canvas.addEventListener('touchstart', function(e){
   if(!gameActive)return;
   const touchX=e.touches[0].clientX-canvas.getBoundingClientRect().left;
   if(touchX<player.x) keys['ArrowLeft']=true;
   else if(touchX>player.x+player.w) keys['ArrowRight']=true;
});
canvas.addEventListener('touchend', function(){
   keys['ArrowLeft']=false; keys['ArrowRight']=false;
});

// Initial state
gameOverDiv.classList.add('hidden');