# Crabada Defense - Technical Design Document

## 1. Technology Stack

### 1.1 Frontend Technologies
- **HTML5**: Game canvas and UI structure
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Core game logic and interactivity
- **Canvas API**: 2D rendering for game graphics
- **Web Audio API**: Sound effects and music

### 1.2 Development Tools
- **Build System**: Webpack or Vite for bundling
- **Package Manager**: npm or yarn
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest for unit tests

### 1.3 External Libraries
- **Game Engine**: Custom engine built with vanilla JavaScript
- **UI Framework**: Custom UI components
- **Audio**: Howler.js for audio management
- **Storage**: LocalStorage for save data

## 2. Architecture Overview

### 2.1 High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   UI Layer      │    │   Game Engine   │    │   Data Layer    │
│                 │    │                 │    │                 │
│ - Menu System   │◄──►│ - Game Loop     │◄──►│ - Level Data    │
│ - HUD           │    │ - Entity System │    │ - Save System   │
│ - Controls      │    │ - Renderer      │    │ - Config        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 2.2 Core Systems
1. **Game Engine**: Main game loop and systems management
2. **Entity System**: Towers, enemies, and projectiles
3. **Renderer**: Canvas-based 2D graphics rendering
4. **Audio System**: Sound effects and music management
5. **Input System**: Mouse and keyboard handling
6. **Save System**: Progress persistence
7. **UI System**: Menu and HUD management

## 3. Game Engine Architecture

### 3.1 Game Loop
```javascript
class GameEngine {
    constructor() {
        this.lastTime = 0;
        this.entities = [];
        this.systems = [];
    }
    
    update(deltaTime) {
        // Update all systems
        this.systems.forEach(system => system.update(deltaTime));
        
        // Update all entities
        this.entities.forEach(entity => entity.update(deltaTime));
    }
    
    render() {
        // Clear canvas
        // Render all entities
        // Render UI overlay
    }
}
```

### 3.2 Entity Component System (ECS)
```javascript
class Entity {
    constructor() {
        this.id = generateId();
        this.components = new Map();
        this.active = true;
    }
    
    addComponent(component) {
        this.components.set(component.constructor.name, component);
    }
    
    getComponent(componentType) {
        return this.components.get(componentType.name);
    }
}
```

### 3.3 Core Components
- **TransformComponent**: Position, rotation, scale
- **SpriteComponent**: Visual representation
- **HealthComponent**: Health and damage handling
- **MovementComponent**: Path following and movement
- **AttackComponent**: Tower attack logic
- **TowerComponent**: Tower-specific properties
- **EnemyComponent**: Enemy-specific properties

## 4. Data Structures

### 4.1 Level Data Format
```javascript
const levelData = {
    id: "level_1",
    name: "Beach Defense",
    map: {
        width: 20,
        height: 15,
        tiles: [...], // 2D array of tile types
        path: [...],  // Array of path coordinates
        towerSpots: [...] // Array of valid tower positions
    },
    waves: [
        {
            waveNumber: 1,
            enemies: [
                { type: "basic", count: 10, spawnRate: 1.0 },
                { type: "fast", count: 5, spawnRate: 0.5 }
            ]
        }
        // ... more waves
    ],
    startingCurrency: 500,
    startingLives: 20
};
```

### 4.2 Tower Configuration
```javascript
const towerConfigs = {
    basic: {
        name: "Basic Tower",
        cost: 100,
        damage: 25,
        range: 3,
        attackSpeed: 1.0,
        projectileSpeed: 5,
        upgrades: [
            { cost: 150, damageMultiplier: 1.5, rangeMultiplier: 1.25 },
            { cost: 300, damageMultiplier: 2.0, rangeMultiplier: 1.5, speedMultiplier: 1.25 }
        ]
    }
    // ... other tower types
};
```

### 4.3 Enemy Configuration
```javascript
const enemyConfigs = {
    basic: {
        name: "Basic Enemy",
        health: 100,
        speed: 1.0,
        defense: 0,
        reward: 10,
        sprite: "enemy_basic.png",
        animation: {
            frames: 4,
            frameTime: 0.2
        }
    }
    // ... other enemy types
};
```

## 5. Rendering System

### 5.1 Render Pipeline
1. **Background Layer**: Map tiles and decorations
2. **Entity Layer**: Towers, enemies, projectiles
3. **Effect Layer**: Visual effects (explosions, slow effects)
4. **UI Layer**: HUD, menus, tooltips

### 5.2 Sprite Management
```javascript
class SpriteManager {
    constructor() {
        this.sprites = new Map();
        this.loadedSprites = new Map();
    }
    
    async loadSprite(name, path) {
        const image = new Image();
        image.src = path;
        await new Promise(resolve => image.onload = resolve);
        this.loadedSprites.set(name, image);
    }
    
    drawSprite(ctx, spriteName, x, y, options = {}) {
        const sprite = this.loadedSprites.get(spriteName);
        if (sprite) {
            ctx.drawImage(sprite, x, y, options.width, options.height);
        }
    }
}
```

### 5.3 Animation System
```javascript
class Animation {
    constructor(spriteSheet, frameWidth, frameHeight, frameCount, frameTime) {
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.frameTime = frameTime;
        this.currentFrame = 0;
        this.timeAccumulator = 0;
    }
    
    update(deltaTime) {
        this.timeAccumulator += deltaTime;
        if (this.timeAccumulator >= this.frameTime) {
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            this.timeAccumulator = 0;
        }
    }
}
```

## 6. Audio System

### 6.1 Audio Manager
```javascript
class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.music = new Map();
        this.masterVolume = 1.0;
        this.soundVolume = 0.8;
        this.musicVolume = 0.6;
    }
    
    loadSound(name, path) {
        const sound = new Howl({
            src: [path],
            volume: this.soundVolume * this.masterVolume
        });
        this.sounds.set(name, sound);
    }
    
    playSound(name) {
        const sound = this.sounds.get(name);
        if (sound) {
            sound.play();
        }
    }
}
```

## 7. Input System

### 7.1 Input Manager
```javascript
class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.mousePosition = { x: 0, y: 0 };
        this.mousePressed = false;
        this.keys = new Set();
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mousedown', () => {
            this.mousePressed = true;
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.mousePressed = false;
        });
    }
}
```

## 8. Save System

### 8.1 Save Data Structure
```javascript
const saveData = {
    version: "1.0.0",
    player: {
        unlockedLevels: ["level_1", "level_2"],
        totalCurrency: 1500,
        totalStars: 8,
        settings: {
            soundVolume: 0.8,
            musicVolume: 0.6,
            graphicsQuality: "high"
        }
    },
    levelProgress: {
        "level_1": {
            completed: true,
            stars: 3,
            bestScore: 1500,
            towersUsed: 8
        }
        // ... other levels
    }
};
```

### 8.2 Save Manager
```javascript
class SaveManager {
    constructor() {
        this.saveKey = "crabada_defense_save";
    }
    
    save(data) {
        try {
            localStorage.setItem(this.saveKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Failed to save game:", error);
            return false;
        }
    }
    
    load() {
        try {
            const data = localStorage.getItem(this.saveKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Failed to load game:", error);
            return null;
        }
    }
}
```

## 9. Performance Optimization

### 9.1 Rendering Optimizations
- **Object Pooling**: Reuse projectile and effect objects
- **Spatial Partitioning**: Quad-tree for collision detection
- **Culling**: Only render visible entities
- **Batch Rendering**: Group similar draw calls

### 9.2 Memory Management
- **Asset Loading**: Lazy loading of sprites and sounds
- **Garbage Collection**: Proper cleanup of unused objects
- **Memory Monitoring**: Track memory usage during development

### 9.3 Frame Rate Management
```javascript
class FrameRateManager {
    constructor(targetFPS = 60) {
        this.targetFPS = targetFPS;
        this.targetFrameTime = 1000 / targetFPS;
        this.lastFrameTime = 0;
    }
    
    shouldUpdate(currentTime) {
        const deltaTime = currentTime - this.lastFrameTime;
        if (deltaTime >= this.targetFrameTime) {
            this.lastFrameTime = currentTime;
            return true;
        }
        return false;
    }
}
```

## 10. Testing Strategy

### 10.1 Unit Tests
- **Entity System**: Test component interactions
- **Game Logic**: Test tower damage, enemy movement
- **Save System**: Test data persistence
- **Audio System**: Test sound playback

### 10.2 Integration Tests
- **Level Loading**: Test level data parsing
- **Wave System**: Test enemy spawning and progression
- **UI Integration**: Test menu and HUD functionality

### 10.3 Performance Tests
- **Frame Rate**: Maintain 60 FPS under load
- **Memory Usage**: Monitor memory leaks
- **Load Times**: Asset loading performance

## 11. Deployment

### 11.1 Build Process
1. **Development**: Hot reload with development server
2. **Production**: Minified and optimized build
3. **Testing**: Automated testing before deployment
4. **Deployment**: Static file hosting (Netlify, Vercel, etc.)

### 11.2 File Structure
```
crabada-defense/
├── src/
│   ├── engine/
│   │   ├── GameEngine.js
│   │   ├── Entity.js
│   │   └── Component.js
│   ├── systems/
│   │   ├── RenderSystem.js
│   │   ├── AudioSystem.js
│   │   └── InputSystem.js
│   ├── entities/
│   │   ├── Tower.js
│   │   ├── Enemy.js
│   │   └── Projectile.js
│   ├── data/
│   │   ├── levels.js
│   │   ├── towers.js
│   │   └── enemies.js
│   ├── ui/
│   │   ├── Menu.js
│   │   ├── HUD.js
│   │   └── LevelSelect.js
│   └── main.js
├── assets/
│   ├── sprites/
│   ├── sounds/
│   └── music/
├── docs/
├── tests/
├── package.json
└── index.html
```

## 12. Future Considerations

### 12.1 Scalability
- **Modular Architecture**: Easy to add new features
- **Plugin System**: Support for custom towers/enemies
- **Multiplayer**: Potential for cooperative play

### 12.2 Platform Expansion
- **Mobile**: Touch controls and responsive design
- **PWA**: Offline play capability
- **Steam**: Desktop application wrapper

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Date + 2 weeks] 