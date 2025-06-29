<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Generated Game</title>
    <style>
        body { margin: 0; padding: 0; background: #000; font-family: Arial, sans-serif; overflow: hidden; }
        canvas { display: block; margin: 0 auto; }
        #gameContainer { width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; }
        
    </style>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div id="game"></div>
    </div>
    
    <script>
        # Crabada Defense - Game Design Document

## 1. Game Overview

### 1.1 Game Title
**Crabada Defense**

### 1.2 Genre
Web-based Tower Defense Strategy Game

### 1.3 Target Platform
- **Primary:** Web browsers (HTML5/JavaScript)
- **Responsive design:** Desktop and tablet play

### 1.4 Target Audience
- **Age:** 13+
- **Profile:** Strategy game enthusiasts, casual to mid-core gamers, players who enjoy progression and optimization

### 1.5 Game Summary
Crabada Defense is a strategic tower defense game where players defend their territory against waves of increasingly challenging enemies. Players strategically place and upgrade various tower types to prevent enemies from reaching their base, earning resources to improve their defenses and unlock new content.

---

## 2. Core Gameplay

### 2.1 Primary Objective
Defend the player's base by preventing enemies from reaching the end of the path. Each enemy that reaches the base reduces the player's lives. The game ends when all lives are lost.

### 2.2 Core Mechanics
- **Tower Placement:** Strategic positioning of defensive towers along enemy paths
- **Resource Management:** Earn and spend currency on towers and upgrades
- **Wave Progression:** Survive 10 waves per level with increasing difficulty
- **Tower Upgrades:** Improve existing towers for enhanced performance
- **Enemy Variety:** Different enemy types with unique abilities and weaknesses

### 2.3 Game Flow
1. **Level Selection:** Choose from available levels
2. **Preparation Phase:** Analyze map layout and plan tower placement
3. **Wave Combat:** Defend against 10 waves of enemies
4. **Resource Collection:** Earn currency from defeated enemies
5. **Tower Management:** Build, upgrade, and sell towers as needed
6. **Level Completion:** Unlock next level and earn rewards

---

## 3. Tower System

### 3.1 Tower Types

#### Basic Tower
- **Cost:** 100 currency
- **Damage:** 25
- **Range:** 3 tiles
- **Attack Speed:** 1.0 attacks/second
- **Target Priority:** First enemy in range

#### Sniper Tower
- **Cost:** 200 currency
- **Damage:** 75
- **Range:** 6 tiles
- **Attack Speed:** 0.5 attacks/second
- **Target Priority:** Highest health enemy
- **Special:** Pierces through multiple enemies

#### Area Damage Tower
- **Cost:** 300 currency
- **Damage:** 40 (splash damage)
- **Range:** 2.5 tiles
- **Attack Speed:** 0.8 attacks/second
- **Target Priority:** Closest enemy
- **Special:** Deals damage to all enemies in a splash radius

#### Slow Tower
- **Cost:** 150 currency
- **Damage:** 15
- **Range:** 3 tiles
- **Attack Speed:** 1.2 attacks/second
- **Target Priority:** First enemy in range
- **Special:** Slows enemies by 30% for 3 seconds

### 3.2 Upgrade System

Each tower can be upgraded up to 3 levels:
- **Level 1:** Base tower (initial purchase)
- **Level 2:** +50% damage, +25% range (cost: 150% of base cost)
- **Level 3:** +100% damage, +50% range, +25% attack speed (cost: 300% of base cost)

### 3.3 Tower Placement Rules

- Towers can only be placed on designated tower spots.
- Cannot place towers on enemy paths.
- Maximum 20 towers per level.
- Towers cannot be moved once placed (can be sold and rebuilt).

---

## 4. Enemy System

### 4.1 Enemy Types

#### Basic Enemy
- **Health:** 100
- **Speed:** 1.0 tiles/second
- **Defense:** 0
- **Reward:** 10 currency
- **Special:** None

#### Fast Enemy
- **Health:** 50
- **Speed:** 2.0 tiles/second
- **Defense:** 0
- **Reward:** 15 currency
- **Special:** Moves quickly but is fragile

#### Tank Enemy
- **Health:** 300
- **Speed:** 0.5 tiles/second
- **Defense:** 10
- **Reward:** 25 currency
- **Special:** High health and defense

#### Flying Enemy
- **Health:** 75
- **Speed:** 1.5 tiles/second
- **Defense:** 0
- **Reward:** 20 currency
- **Special:** Cannot be hit by ground-based towers

#### Boss Enemy
- **Health:** 1000
- **Speed:** 0.8 tiles/second
- **Defense:** 25
- **Reward:** 100 currency
- **Special:**
    - Appears every 5th wave (waves 5 & 10)
    - Has special abilities (e.g., regeneration, rage mode on low health)

### 4.2 Wave Progression

- Each level contains exactly 10 waves.
    - Enemy count increases by 20% per wave.
    - Enemy health increases by 10% per wave.
    - Boss enemies appear on waves 5 and 10.
    - Final wave (wave 10) is significantly more challenging.

---

## 5. Level System

### 5.1 Level Structure

- **Total Levels:** 20 (initially, expandable)
- **Unlock System:** Complete previous level to unlock next.
- **Difficulty Curve:** Gradual increase in challenge.
- **Map Variety:** Different layouts and tower placement options.

### 5.2 Level Types

- Linear paths (simple straight or curved enemy paths)
- Multiple paths (enemies can take different routes)
- Crossing paths (paths that intersect, requiring strategic tower placement)
- Open areas (large spaces with multiple tower placement options)

### 5.3 Progression Rewards

- Currency: Earned from defeating enemies.
- Stars: Earned per level based on performance (lives remaining, towers used).
- Unlockables: New tower types, special abilities, cosmetic items.

---

## 6. Economy System

### 6.1 Currency

- Primary Currency: Gold (earned from defeating enemies)
- Starting Currency: 500 per level (may increase in later levels)
- Income Rate: Passive income of +10 gold/sec during combat

### 6.2 Costs

| Tower Type           | Base Cost | Upgrade Lvl2 | Upgrade Lvl3 |
|----------------------|-----------|--------------|--------------|
| Basic Tower          |   100     |   +150       |   +300       |
| Sniper Tower         |   200     |   +300       |   +600       |
| Area Damage Tower    |   300     |   +450       |   +900       |
| Slow Tower           |   150     |   +225       |   +450       |

*Upgrades are calculated as per system above.*

**Sell Value**: Player receives back ~70% of total investment (tower + upgrades).

---

## 7. User Interface

### 7.1 Main Game Screen

Features:
- Game Area: Central map display with path and tower spots.
- Tower Panel: Available towers and their costs.
- Wave Information: Current wave, enemies remaining.
- Resource Display: Current currency (gold), lives remaining.
- Pause/Options: Game control buttons.

### 7.2 Menu System

Features:
- Main Menu: Level selection, settings, help.
- Level Select: Grid/list of available levels with star ratings.
- Settings: Audio, graphics, controls.
- Help/Tutorial: Game instructions and tips.

---

## 8. Visual Style

### 8.1 Art Direction

**Style**: Cartoon/Anime-inspired  
**Color Palette**: Vibrant, contrasting colors  
**Theme**: Fantasy/Medieval with crab/marine elements  
**Resolution**: Responsive design supporting various screen sizes  

### 8.2 Asset Requirements

| Category      | Description                                              |
|---------------|---------------------------------------------------------|
| Towers        | Four base types × three upgrade levels (12 sprites)     |
| Enemies       | Five types with animation frames                        |
| Environment   | Map tiles, decorations, UI elements                     |
| Effects       | Projectiles, explosions, slow effects, etc              |

---

## 9. Audio Design

### 9.1 Sound Effects

| Category      | Description                               |
|---------------|-------------------------------------------|
| Tower Sounds  | Firing sounds per tower type              |
| Enemy Sounds  | Death sounds, movement audio              |
| UI Sounds     | Button clicks, menu navigation            |
| Ambient       | Background environment sounds             |

### 9.2 Music

| Context       | Description                               |
|---------------|-------------------------------------------|
| Main Menu     | Upbeat/adventurous theme                  |
| Gameplay      | Tension-building background music         |
| Victory       | Triumphant completion music               |
| Defeat        | Somber failure music                      |

---

## 10. Technical Requirements

### 10.1 Performance Targets

| Metric        | Target                                    |
|---------------|-------------------------------------------|
| Frame Rate    | Stable at 60 FPS                          |
| Load Time     | <3 seconds initial load                   |
| Memory Usage  | <100MB RAM                                |
| Compatibility | Chrome, Firefox, Safari, Edge (latest)    |

### 10.2 Save System

| Feature           | Description                           |
|-------------------|---------------------------------------|
| Auto-Save         | Progress saved automatically          |
| Cloud Sync        | Optional cloud save support           |
| Save Data         | Level progress, currency, unlocks     |

---

## 11. Monetization (Future Consideration)

### Potential Features:
- Premium content (additional levels/tower types)
- Cosmetic items (tower skins/map themes)
- Boost items (temporary power-ups)
- Ad integration (optional rewarded ads)

---

## 12. Success Metrics

### Engagement Metrics:

| Metric          | Target                                  |
|-----------------|-----------------------------------------|
| Session Length  | Target average of 15–30 minutes         |
| Retention       | Day7 retention target of ≥40%           |
| Completion Rate | ≥60% of players complete first five lvls |

### Performance Metrics:

| Metric        | Target                                    |
|---------------|-------------------------------------------|
| Load Time     | <3 seconds                                |
| Crash Rate    | <1%                                       |
| Satisfaction  | ≥4 star user rating                       |

---

## 13. Visually Exciting Implementation Plan (No User Assets)

### Visual Style & Theme:
Stylized cartoon/anime aesthetic themed around an undersea kingdom, animated coral reefs and bioluminescent elements; each tower is a unique crustacean-inspired construct; enemies are whimsical sea creatures with unique silhouettes.

### Animation & Effects:
Smooth expressive animations for all characters and towers; particle effects for water splashes, bubbles; dynamic lighting for underwater caustics; parallax backgrounds for depth.

### Interactive & Responsive UI:
Animated UI elements with underwater effects; tower placement shows animated range indicators; enemy health bars are stylish and animated.

### Audio–Visual Synergy:
Aquatic-themed sound effects; adaptive soundtrack intensifies as waves progress; major events feature synchronized visual/audio cues.

### Technical Implementation:
WebGL/Canvas hybrid rendering for high performance; procedural asset generation for backgrounds/towers/enemies/effects; performance optimization for stable FPS.

---

**Document Version**: v1.1  
**Last Updated**: [Current Date]
    </script>
</body>
</html>