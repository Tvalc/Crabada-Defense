# Crabada Defense - Level Design Document

## 1. Level Design Philosophy

### 1.1 Core Principles
- **Progressive Difficulty**: Each level builds upon previous challenges
- **Strategic Variety**: Different map layouts encourage diverse strategies
- **Balanced Challenge**: Difficulty increases gradually without being overwhelming
- **Replayability**: Multiple valid strategies for each level
- **Learning Curve**: Introduce new concepts gradually

### 1.2 Design Goals
- **Engagement**: Keep players interested for 15-30 minute sessions
- **Satisfaction**: Provide clear feedback and rewarding progression
- **Accessibility**: Easy to learn, challenging to master
- **Innovation**: Introduce new mechanics and challenges regularly

## 2. Wave System Design

### 2.1 Wave Structure
Each level contains exactly **10 waves** with the following pattern:

#### Wave Progression Formula
- **Enemy Count**: Base count × (1 + 0.2 × (wave - 1))
- **Enemy Health**: Base health × (1 + 0.1 × (wave - 1))
- **Enemy Speed**: Base speed × (1 + 0.05 × (wave - 1))
- **Boss Waves**: Waves 5 and 10 feature boss enemies

#### Example Wave Scaling (Level 1)
| Wave | Enemy Count | Health Multiplier | Speed Multiplier | Special |
|------|-------------|-------------------|------------------|---------|
| 1    | 10          | 1.0x              | 1.0x             | Basic   |
| 2    | 12          | 1.1x              | 1.05x            | Basic   |
| 3    | 14          | 1.2x              | 1.1x             | Basic   |
| 4    | 17          | 1.3x              | 1.15x            | Basic   |
| 5    | 20          | 1.4x              | 1.2x             | **Boss** |
| 6    | 24          | 1.5x              | 1.25x            | Mixed   |
| 7    | 29          | 1.6x              | 1.3x             | Mixed   |
| 8    | 35          | 1.7x              | 1.35x            | Mixed   |
| 9    | 42          | 1.8x              | 1.4x             | Mixed   |
| 10   | 50          | 2.0x              | 1.5x             | **Final Boss** |

### 2.2 Enemy Type Introduction Schedule

#### Level 1-5: Basic Introduction
- **Level 1**: Basic enemies only
- **Level 2**: Introduce Fast enemies
- **Level 3**: Introduce Tank enemies
- **Level 4**: Mix of all three types
- **Level 5**: Introduce Flying enemies

#### Level 6-10: Advanced Mechanics
- **Level 6**: Introduce special abilities
- **Level 7**: Complex enemy combinations
- **Level 8**: Speed challenges
- **Level 9**: Health challenges
- **Level 10**: Ultimate challenge

## 3. Level Progression

### 3.1 Level 1: "Beach Defense"
**Theme**: Introduction to basic mechanics
**Map Type**: Linear path with simple curves
**Starting Currency**: 500
**Starting Lives**: 20

#### Wave Breakdown
| Wave | Enemies | Strategy Focus |
|------|---------|----------------|
| 1-2  | Basic   | Tower placement basics |
| 3-4  | Basic   | Resource management |
| 5    | Basic Boss | First boss encounter |
| 6-9  | Basic   | Optimization |
| 10   | Basic Final Boss | Complete challenge |

**Learning Objectives**:
- Understand tower placement
- Learn resource management
- Experience boss mechanics
- Complete first level

### 3.2 Level 2: "Speed Challenge"
**Theme**: Introduction to fast enemies
**Map Type**: Multiple paths
**Starting Currency**: 600
**Starting Lives**: 18

#### Wave Breakdown
| Wave | Enemies | Strategy Focus |
|------|---------|----------------|
| 1-2  | Basic   | Review basics |
| 3-4  | Fast    | Speed management |
| 5    | Fast Boss | Fast boss challenge |
| 6-9  | Mixed   | Combined strategies |
| 10   | Mixed Final Boss | Speed + health challenge |

**Learning Objectives**:
- Handle fast-moving enemies
- Use slow towers effectively
- Manage multiple paths
- Combine different tower types

### 3.3 Level 3: "Tank Territory"
**Theme**: Introduction to high-health enemies
**Map Type**: Single path with wide areas
**Starting Currency**: 700
**Starting Lives**: 16

#### Wave Breakdown
| Wave | Enemies | Strategy Focus |
|------|---------|----------------|
| 1-2  | Mixed   | Review previous types |
| 3-4  | Tank    | High damage output needed |
| 5    | Tank Boss | Massive health challenge |
| 6-9  | Mixed   | Damage optimization |
| 10   | Mixed Final Boss | Ultimate damage test |

**Learning Objectives**:
- Deal with high-health enemies
- Optimize damage output
- Use sniper towers effectively
- Manage resource allocation

### 3.4 Level 4: "Aerial Assault"
**Theme**: Introduction to flying enemies
**Map Type**: Crossing paths
**Starting Currency**: 800
**Starting Lives**: 15

#### Wave Breakdown
| Wave | Enemies | Strategy Focus |
|------|---------|----------------|
| 1-2  | Mixed   | Review ground enemies |
| 3-4  | Flying  | Anti-air strategies |
| 5    | Flying Boss | Flying boss challenge |
| 6-9  | Mixed   | Ground + air defense |
| 10   | Mixed Final Boss | Complete defense test |

**Learning Objectives**:
- Handle flying enemies
- Manage crossing paths
- Balance ground and air defense
- Strategic tower placement

### 3.5 Level 5: "The Gauntlet"
**Theme**: All enemy types combined
**Map Type**: Complex maze-like path
**Starting Currency**: 900
**Starting Lives**: 14

#### Wave Breakdown
| Wave | Enemies | Strategy Focus |
|------|---------|----------------|
| 1-2  | Mixed   | All enemy types |
| 3-4  | Mixed   | Complex strategies |
| 5    | Mixed Boss | Ultimate boss |
| 6-9  | Mixed   | Mastery test |
| 10   | Mixed Final Boss | Complete mastery |

**Learning Objectives**:
- Master all enemy types
- Complex strategic thinking
- Resource optimization
- Complete level mastery

## 4. Enemy Type Specifications

### 4.1 Basic Enemy
**Role**: Standard unit, balanced stats
**Introduced**: Level 1
**Strategy**: Foundation for all strategies

**Stats**:
- **Health**: 100 (base)
- **Speed**: 1.0 tiles/second
- **Defense**: 0
- **Reward**: 10 currency
- **Size**: Medium
- **Animation**: 4-frame walk cycle

**Behavior**:
- Follows path directly
- No special abilities
- Standard target priority

### 4.2 Fast Enemy
**Role**: Speed challenge, low health
**Introduced**: Level 2
**Strategy**: Requires quick response and slow effects

**Stats**:
- **Health**: 50 (base)
- **Speed**: 2.0 tiles/second
- **Defense**: 0
- **Reward**: 15 currency
- **Size**: Small
- **Animation**: 6-frame run cycle

**Behavior**:
- Moves quickly along path
- Vulnerable to slow effects
- Can overwhelm unprepared defenses

### 4.3 Tank Enemy
**Role**: High health, slow movement
**Introduced**: Level 3
**Strategy**: Requires sustained damage output

**Stats**:
- **Health**: 300 (base)
- **Speed**: 0.5 tiles/second
- **Defense**: 10
- **Reward**: 25 currency
- **Size**: Large
- **Animation**: 3-frame lumbering walk

**Behavior**:
- Moves slowly but steadily
- High damage resistance
- Can absorb significant punishment

### 4.4 Flying Enemy
**Role**: Air unit, bypasses ground towers
**Introduced**: Level 4
**Strategy**: Requires anti-air towers

**Stats**:
- **Health**: 75 (base)
- **Speed**: 1.5 tiles/second
- **Defense**: 0
- **Reward**: 20 currency
- **Size**: Medium
- **Animation**: 4-frame flying cycle

**Behavior**:
- Flies over ground obstacles
- Cannot be hit by ground-only towers
- Requires specialized defense

### 4.5 Boss Enemy
**Role**: Level boss, significant challenge
**Introduced**: Wave 5 and 10 of each level
**Strategy**: Ultimate test of current level skills

**Stats**:
- **Health**: 1000 (base)
- **Speed**: 0.8 tiles/second
- **Defense**: 25
- **Reward**: 100 currency
- **Size**: Extra Large
- **Animation**: 6-frame boss walk

**Special Abilities**:
- **Wave 5 Boss**: Enhanced health and damage
- **Wave 10 Boss**: All abilities + special attacks
- **Regeneration**: Heals 1% health per second
- **Rage Mode**: Increases speed and damage at 50% health

## 5. Difficulty Balancing

### 5.1 Difficulty Factors
1. **Enemy Count**: More enemies = higher difficulty
2. **Enemy Health**: Higher health = longer to defeat
3. **Enemy Speed**: Faster enemies = less time to react
4. **Enemy Types**: Mixed types = more complex strategies
5. **Map Layout**: Complex paths = harder to defend
6. **Resource Constraints**: Less starting currency = harder

### 5.2 Difficulty Curve
```
Difficulty Level by Level:
Level 1: 1.0 (Baseline)
Level 2: 1.3 (Speed challenge)
Level 3: 1.6 (Health challenge)
Level 4: 1.9 (Air challenge)
Level 5: 2.2 (Combined challenge)
Level 6: 2.5 (Advanced mechanics)
Level 7: 2.8 (Complex strategies)
Level 8: 3.1 (Speed + health)
Level 9: 3.4 (Air + ground)
Level 10: 3.7 (Ultimate challenge)
```

### 5.3 Balance Testing Guidelines
- **Win Rate Target**: 60-70% for average players
- **Clear Rate**: 80% of players should complete first 5 levels
- **Challenge**: Top 20% of players should struggle with later levels
- **Replayability**: Multiple valid strategies per level

## 6. Map Design Guidelines

### 6.1 Map Types

#### Linear Paths
- **Use Case**: Tutorial levels, basic challenges
- **Difficulty**: Low to Medium
- **Strategy**: Simple tower placement
- **Example**: Level 1

#### Multiple Paths
- **Use Case**: Speed challenges, resource management
- **Difficulty**: Medium
- **Strategy**: Path prioritization
- **Example**: Level 2

#### Crossing Paths
- **Use Case**: Complex strategies, air defense
- **Difficulty**: Medium to High
- **Strategy**: Multi-directional defense
- **Example**: Level 4

#### Open Areas
- **Use Case**: Ultimate challenges, mastery tests
- **Difficulty**: High
- **Strategy**: Optimal positioning
- **Example**: Level 5

### 6.2 Tower Placement Rules
- **Minimum Spots**: 8 tower positions per level
- **Maximum Spots**: 15 tower positions per level
- **Strategic Variety**: Mix of isolated and grouped positions
- **Path Coverage**: Ensure all paths can be defended
- **Resource Balance**: Not too many or too few options

## 7. Progression Rewards

### 7.1 Star Rating System
**3 Stars**: Perfect defense (no lives lost)
**2 Stars**: Good defense (1-5 lives lost)
**1 Star**: Basic completion (6+ lives lost)

### 7.2 Unlock System
- **Level 2**: Complete Level 1 with 1+ stars
- **Level 3**: Complete Level 2 with 1+ stars
- **Level 4**: Complete Level 3 with 2+ stars
- **Level 5**: Complete Level 4 with 2+ stars
- **Advanced Levels**: Complete Level 5 with 3 stars

### 7.3 Reward Currency
- **Base Reward**: 100 currency per level
- **Star Bonus**: +50 currency per star
- **Perfect Bonus**: +100 currency for 3 stars
- **Total Possible**: 350 currency per level

## 8. Testing and Iteration

### 8.1 Playtesting Checklist
- [ ] Level can be completed with basic strategy
- [ ] Multiple valid strategies exist
- [ ] Difficulty feels appropriate
- [ ] No impossible situations
- [ ] Clear feedback on success/failure
- [ ] Rewards feel satisfying

### 8.2 Balance Metrics
- **Average Completion Time**: 10-15 minutes per level
- **Resource Usage**: 70-90% of available currency
- **Tower Variety**: 2-4 different tower types used
- **Retry Rate**: < 3 attempts for average players

### 8.3 Iteration Process
1. **Initial Design**: Create level concept
2. **Internal Testing**: Developer playtesting
3. **Balance Adjustments**: Tweak difficulty and rewards
4. **External Testing**: Player feedback
5. **Final Polish**: Refine based on feedback
6. **Release**: Monitor player data

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Date + 2 weeks] 