// Crabada Defense - Main Game Logic
// Level 1 Implementation

const MAP_TILE_SIZE = 40;
const LEVEL_ONE_MAP = [
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

// Enemy types configuration
const ENEMY_TYPES = [
    { type: 'Goblin', health: 100, speed: 1, damage: 10 },
    { type: 'Orc', health: 150, speed: 1.5, damage: 20 },
    { type: 'Troll', health: 200, speed: 1, damage: 30 }
];

// Class definition for Enemy
class Enemy {
    constructor(type, health, speed, damage) {
        this.type = type;
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.position = { x: 0, y: 0 }; // Starting position
    }

    move() {
        // Logic for enemy movement
        this.position.x += this.speed; // Move right as an example
    }

    draw(ctx) {
        ctx.fillStyle = this.type === 'Goblin' ? 'green' : this.type === 'Orc' ? 'darkgreen' : 'brown';
        ctx.fillRect(this.position.x, this.position.y, MAP_TILE_SIZE, MAP_TILE_SIZE);
    }
}

// Array to hold current enemies
let enemies = [];

// Function to spawn enemies based on the level design
function spawnEnemies() {
    const enemyType = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
    enemies.push(new Enemy(enemyType.type, enemyType.health, enemyType.speed, enemyType.damage));
    setTimeout(spawnEnemies, 2000); // Spawn new enemies every 2 seconds
}

// Function to draw the map
function drawMap(ctx) {
    for (let row = 0; row < LEVEL_ONE_MAP.length; row++) {
        for (let col = 0; col < LEVEL_ONE_MAP[row].length; col++) {
            if (LEVEL_ONE_MAP[row][col] === 1) {
                ctx.fillStyle = 'lightgrey'; // Pathway color
                ctx.fillRect(col * MAP_TILE_SIZE, row * MAP_TILE_SIZE, MAP_TILE_SIZE, MAP_TILE_SIZE);
            }
        }
    }
}

// Main game loop
function gameLoop(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap(ctx); // Draw the level map
    enemies.forEach(enemy => {
        enemy.move(); // Move the enemy
        enemy.draw(ctx); // Draw the enemy
    });
    requestAnimationFrame(() => gameLoop(canvas, ctx));
}

// Initialize the game level
function initLevel() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = LEVEL_ONE_MAP[0].length * MAP_TILE_SIZE;
    canvas.height = LEVEL_ONE_MAP.length * MAP_TILE_SIZE;

    drawMap(ctx); // Initial map drawing
    spawnEnemies(); // Start spawning enemies
    gameLoop(canvas, ctx); // Start the main game loop
}

// Start Level 1
initLevel();