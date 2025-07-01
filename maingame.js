// Crabada Defense - Main Game Logic

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let gameState = "title"; // Possible states: title, playing, gameOver

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    switch (gameState) {
        case "title":
            drawTitle();
            break;
        case "playing":
            updateGame();
            drawGame();
            break;
        case "gameOver":
            drawGameOver();
            break;
    }
    
    requestAnimationFrame(gameLoop);
}

// Functions to draw different screens
function drawTitle() {
    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.fillText("Welcome to Crabada Defense", 50, 100);
    ctx.fillText("Press Enter to Start", 50, 150);
}

function updateGame() {
    // Update game logic (e.g., player movement, enemy spawning)
}

function drawGame() {
    // Draw game content (e.g., player, enemies, score)
}

function drawGameOver() {
    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 50, 100);
    ctx.fillText("Press R to Restart", 50, 150);
}

// Start the game loop
gameLoop();