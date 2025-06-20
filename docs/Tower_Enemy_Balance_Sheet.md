# Crabada Defense - Tower & Enemy Balance Sheet

## 1. Tower Balance Overview

### 1.1 Tower Categories
- **Basic Tower**: Balanced, all-purpose defense
- **Sniper Tower**: High damage, long range, slow fire rate
- **Area Damage Tower**: Splash damage, good for groups
- **Slow Tower**: Utility tower, slows enemies

### 1.2 Balance Philosophy
- **Cost vs. Effectiveness**: Higher cost = higher effectiveness
- **Specialization**: Each tower has unique strengths and weaknesses
- **Synergy**: Towers work better in combinations
- **Progression**: Upgrades provide meaningful improvements

## 2. Tower Specifications

### 2.1 Basic Tower
**Role**: Balanced, reliable defense
**Theme**: Standard defensive structure

#### Base Stats (Level 1)
- **Cost**: 100 currency
- **Damage**: 25 per shot
- **Range**: 3 tiles
- **Attack Speed**: 1.0 attacks/second
- **Projectile Speed**: 5 tiles/second
- **Target Priority**: First enemy in range
- **Special**: None

#### Upgrade Path
| Level | Cost | Damage | Range | Attack Speed | DPS | Cost Efficiency |
|-------|------|--------|-------|--------------|-----|-----------------|
| 1     | 100  | 25     | 3     | 1.0          | 25  | 1.0x            |
| 2     | 150  | 38     | 3.75  | 1.0          | 38  | 1.52x           |
| 3     | 300  | 50     | 4.5   | 1.25         | 63  | 2.52x           |

#### Total Investment Analysis
- **Total Cost**: 550 currency
- **Final DPS**: 63
- **Cost per DPS**: 8.73 currency
- **Range Coverage**: 4.5 tiles

### 2.2 Sniper Tower
**Role**: High damage, long range
**Theme**: Precision targeting system

#### Base Stats (Level 1)
- **Cost**: 200 currency
- **Damage**: 75 per shot
- **Range**: 6 tiles
- **Attack Speed**: 0.5 attacks/second
- **Projectile Speed**: 8 tiles/second
- **Target Priority**: Highest health enemy
- **Special**: Pierce through multiple enemies

#### Upgrade Path
| Level | Cost | Damage | Range | Attack Speed | DPS | Cost Efficiency |
|-------|------|--------|-------|--------------|-----|-----------------|
| 1     | 200  | 75     | 6     | 0.5          | 38  | 1.0x            |
| 2     | 300  | 113    | 7.5   | 0.5          | 57  | 1.5x            |
| 3     | 600  | 150    | 9     | 0.625        | 94  | 2.47x           |

#### Total Investment Analysis
- **Total Cost**: 1100 currency
- **Final DPS**: 94
- **Cost per DPS**: 11.7 currency
- **Range Coverage**: 9 tiles

### 2.3 Area Damage Tower
**Role**: Group damage, splash effects
**Theme**: Explosive projectile launcher

#### Base Stats (Level 1)
- **Cost**: 300 currency
- **Damage**: 40 (splash damage)
- **Range**: 2.5 tiles
- **Attack Speed**: 0.8 attacks/second
- **Projectile Speed**: 4 tiles/second
- **Target Priority**: Closest enemy
- **Special**: Splash radius 1.5 tiles

#### Upgrade Path
| Level | Cost | Damage | Range | Attack Speed | DPS | Cost Efficiency |
|-------|------|--------|-------|--------------|-----|-----------------|
| 1     | 300  | 40     | 2.5   | 0.8          | 32  | 1.0x            |
| 2     | 450  | 60     | 3.125 | 0.8          | 48  | 1.5x            |
| 3     | 900  | 80     | 3.75  | 1.0          | 80  | 2.5x            |

#### Total Investment Analysis
- **Total Cost**: 1650 currency
- **Final DPS**: 80
- **Cost per DPS**: 20.6 currency
- **Range Coverage**: 3.75 tiles

### 2.4 Slow Tower
**Role**: Utility, crowd control
**Theme**: Ice/freeze effect generator

#### Base Stats (Level 1)
- **Cost**: 150 currency
- **Damage**: 15 per shot
- **Range**: 3 tiles
- **Attack Speed**: 1.2 attacks/second
- **Projectile Speed**: 6 tiles/second
- **Target Priority**: First enemy in range
- **Special**: Slows enemies by 30% for 3 seconds

#### Upgrade Path
| Level | Cost | Damage | Range | Attack Speed | DPS | Slow Effect | Cost Efficiency |
|-------|------|--------|-------|--------------|-----|-------------|-----------------|
| 1     | 150  | 15     | 3     | 1.2          | 18  | 30%         | 1.0x            |
| 2     | 225  | 23     | 3.75  | 1.2          | 28  | 40%         | 1.56x           |
| 3     | 450  | 30     | 4.5   | 1.5          | 45  | 50%         | 2.5x            |

#### Total Investment Analysis
- **Total Cost**: 825 currency
- **Final DPS**: 45
- **Cost per DPS**: 18.3 currency
- **Range Coverage**: 4.5 tiles
- **Slow Effect**: 50% for 3 seconds

## 3. Enemy Balance Specifications

### 3.1 Basic Enemy
**Role**: Standard unit, balanced stats
**Theme**: Regular infantry

#### Base Stats
- **Health**: 100
- **Speed**: 1.0 tiles/second
- **Defense**: 0
- **Reward**: 10 currency
- **Size**: Medium
- **Path Time**: Varies by map (typically 15-30 seconds)

#### Difficulty Analysis
- **Time to Kill (Basic Tower)**: 4 seconds
- **Time to Kill (Sniper Tower)**: 1.33 seconds
- **Time to Kill (Area Tower)**: 3.125 seconds
- **Time to Kill (Slow Tower)**: 5.56 seconds

### 3.2 Fast Enemy
**Role**: Speed challenge, low health
**Theme**: Swift scout unit

#### Base Stats
- **Health**: 50
- **Speed**: 2.0 tiles/second
- **Defense**: 0
- **Reward**: 15 currency
- **Size**: Small
- **Path Time**: 7.5-15 seconds

#### Difficulty Analysis
- **Time to Kill (Basic Tower)**: 2 seconds
- **Time to Kill (Sniper Tower)**: 0.67 seconds
- **Time to Kill (Area Tower)**: 1.56 seconds
- **Time to Kill (Slow Tower)**: 2.78 seconds
- **Effectiveness vs Slow Tower**: Reduced to 1.4 tiles/second

### 3.3 Tank Enemy
**Role**: High health, slow movement
**Theme**: Heavy armored unit

#### Base Stats
- **Health**: 300
- **Speed**: 0.5 tiles/second
- **Defense**: 10 (reduces damage by 10)
- **Reward**: 25 currency
- **Size**: Large
- **Path Time**: 30-60 seconds

#### Difficulty Analysis
- **Effective Health**: 330 (with defense)
- **Time to Kill (Basic Tower)**: 13.2 seconds
- **Time to Kill (Sniper Tower)**: 4.4 seconds
- **Time to Kill (Area Tower)**: 10.3 seconds
- **Time to Kill (Slow Tower)**: 18.3 seconds

### 3.4 Flying Enemy
**Role**: Air unit, bypasses ground towers
**Theme**: Aerial assault unit

#### Base Stats
- **Health**: 75
- **Speed**: 1.5 tiles/second
- **Defense**: 0
- **Reward**: 20 currency
- **Size**: Medium
- **Path Time**: 10-20 seconds

#### Difficulty Analysis
- **Time to Kill (Basic Tower)**: 3 seconds
- **Time to Kill (Sniper Tower)**: 1 second
- **Time to Kill (Area Tower)**: 2.34 seconds
- **Time to Kill (Slow Tower)**: 4.17 seconds
- **Special Consideration**: Only certain towers can target

### 3.5 Boss Enemy
**Role**: Level boss, significant challenge
**Theme**: Elite commander unit

#### Base Stats
- **Health**: 1000
- **Speed**: 0.8 tiles/second
- **Defense**: 25 (reduces damage by 25)
- **Reward**: 100 currency
- **Size**: Extra Large
- **Path Time**: 18.75-37.5 seconds

#### Special Abilities
- **Regeneration**: Heals 1% health per second (10 HP/s)
- **Rage Mode**: At 50% health, +50% speed and damage
- **Wave 10 Boss**: Additional special attacks

#### Difficulty Analysis
- **Effective Health**: 1250 (with defense)
- **Time to Kill (Basic Tower)**: 50 seconds
- **Time to Kill (Sniper Tower)**: 16.7 seconds
- **Time to Kill (Area Tower)**: 39 seconds
- **Time to Kill (Slow Tower)**: 69.4 seconds

## 4. Tower vs Enemy Effectiveness Matrix

### 4.1 Damage Efficiency (DPS vs Enemy Health)
| Tower Type | Basic Enemy | Fast Enemy | Tank Enemy | Flying Enemy | Boss Enemy |
|------------|-------------|------------|------------|--------------|------------|
| Basic      | 25 DPS      | 25 DPS     | 15 DPS     | 25 DPS       | 15 DPS     |
| Sniper     | 38 DPS      | 38 DPS     | 28 DPS     | 38 DPS       | 28 DPS     |
| Area       | 32 DPS      | 32 DPS     | 22 DPS     | 22 DPS       | 22 DPS     |
| Slow       | 18 DPS      | 18 DPS     | 8 DPS      | 18 DPS       | 8 DPS      |

### 4.2 Time to Kill Analysis
| Tower Type | Basic (100 HP) | Fast (50 HP) | Tank (330 HP) | Flying (75 HP) | Boss (1250 HP) |
|------------|----------------|--------------|---------------|----------------|----------------|
| Basic      | 4.0s          | 2.0s         | 22.0s         | 3.0s           | 83.3s          |
| Sniper     | 2.6s          | 1.3s         | 11.8s         | 2.0s           | 44.6s          |
| Area       | 3.1s          | 1.6s         | 15.0s         | 3.4s           | 56.8s          |
| Slow       | 5.6s          | 2.8s         | 41.3s         | 4.2s           | 156.3s         |

### 4.3 Cost Efficiency Analysis
| Tower Type | Cost | DPS | Cost per DPS | Best Against | Weak Against |
|------------|------|-----|--------------|--------------|--------------|
| Basic      | 100  | 25  | 4.0          | All          | High health  |
| Sniper     | 200  | 38  | 5.3          | High health  | Groups       |
| Area       | 300  | 32  | 9.4          | Groups       | Single targets |
| Slow       | 150  | 18  | 8.3          | Fast enemies | High health  |

## 5. Strategic Combinations

### 5.1 Early Game (Levels 1-2)
**Recommended Strategy**: Basic Tower spam
- **Cost**: 100 per tower
- **Effectiveness**: Good against basic enemies
- **Flexibility**: Can be upgraded later

### 5.2 Mid Game (Levels 3-4)
**Recommended Strategy**: Mixed approach
- **Basic + Sniper**: Cover different ranges
- **Basic + Slow**: Control and damage
- **Area + Basic**: Handle groups and singles

### 5.3 Late Game (Levels 5+)
**Recommended Strategy**: Specialized defense
- **Sniper + Slow**: Handle bosses and fast enemies
- **Area + Sniper**: Groups and high-value targets
- **All Types**: Maximum flexibility

## 6. Economy Balance

### 6.1 Currency Flow
- **Starting Currency**: 500-900 per level
- **Enemy Rewards**: 10-100 currency per enemy
- **Passive Income**: 10 currency per second
- **Total Available**: ~1500-2500 per level

### 6.2 Optimal Spending
- **Early Game**: 70% on towers, 30% saved for upgrades
- **Mid Game**: 60% on towers, 40% on upgrades
- **Late Game**: 50% on towers, 50% on upgrades

### 6.3 Tower Investment Strategy
| Tower Type | Early Investment | Mid Investment | Late Investment |
|------------|------------------|----------------|-----------------|
| Basic      | High            | Medium         | Low             |
| Sniper     | Low             | High           | High            |
| Area       | Medium          | High           | Medium          |
| Slow       | Low             | Medium         | High            |

## 7. Balance Testing Metrics

### 7.1 Win Rate Targets
- **Level 1**: 90% win rate
- **Level 2**: 80% win rate
- **Level 3**: 70% win rate
- **Level 4**: 60% win rate
- **Level 5**: 50% win rate

### 7.2 Performance Metrics
- **Average Completion Time**: 10-15 minutes
- **Resource Usage**: 70-90% of available currency
- **Tower Variety**: 2-4 different types used
- **Upgrade Usage**: 60-80% of towers upgraded

### 7.3 Balance Indicators
- **Overpowered**: Win rate > 80% on intended difficulty
- **Underpowered**: Win rate < 40% on intended difficulty
- **Balanced**: Win rate 50-70% on intended difficulty

## 8. Future Balance Considerations

### 8.1 Potential Additions
- **New Tower Types**: Anti-air, support, healing
- **New Enemy Types**: Stealth, flying tanks, swarms
- **Special Abilities**: Tower abilities, enemy abilities
- **Environmental Effects**: Weather, terrain modifiers

### 8.2 Scaling Considerations
- **Higher Levels**: Exponential difficulty scaling
- **New Mechanics**: Complex interactions
- **Meta Progression**: Permanent upgrades
- **Competitive Elements**: Leaderboards, challenges

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Date + 2 weeks] 