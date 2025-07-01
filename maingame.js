// Crabada Defense - Main Game Logic

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game states
let gameState = 'start'; // Possible states: 'start', 'level1'

// Start Screen Setup
function showStartScreen() {
    document.getElementById('startScreen').style.display = 'block';
    canvas.style.display = 'none';
}

// Start Game Function
function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    canvas.style.display = 'block';
    gameState = 'level1';
    initLevelOne();
}

// Level One Variables
let player = { x: 50, y: 300, width: 50, height: 50 };
let enemies = [];
let enemySpawnInterval;

// Initialize Level One
function initLevelOne() {
    enemies = [];
    clearInterval(enemySpawnInterval);
    enemySpawnInterval = setInterval(spawnEnemy, 2000); // Spawn an enemy every 2 seconds
    gameLoop();
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameState === 'level1') {
        updateLevelOne();
        drawLevelOne();
    }
    requestAnimationFrame(gameLoop);
}

// Update Level One
function updateLevelOne() {
    // Move player or update game logic here
}

// Draw Level One
function drawLevelOne() {
    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw enemies
    for (let enemy of enemies) {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

// Spawn Enemy Function
function spawnEnemy() {
    enemies.push({ x: canvas.width, y: 300, width: 50, height: 50 });
}

// Event Listeners
document.getElementById('startButton').addEventListener('click', startGame);

// Show Start Screen on Load
showStartScreen();