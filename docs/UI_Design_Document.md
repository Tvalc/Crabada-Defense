# Crabada Defense - User Interface Design Document

## 1. UI Design Philosophy

### 1.1 Core Principles
- **Clarity**: Information is easy to read and understand
- **Accessibility**: UI works for players with different abilities
- **Responsiveness**: Adapts to different screen sizes
- **Consistency**: Uniform design language throughout
- **Efficiency**: Minimal clicks to perform actions

### 1.2 Visual Style
- **Theme**: Fantasy/Medieval with marine elements
- **Color Palette**: Vibrant, contrasting colors
- **Typography**: Clear, readable fonts
- **Icons**: Simple, recognizable symbols
- **Layout**: Clean, organized, uncluttered

## 2. Color Scheme

### 2.1 Primary Colors
- **Primary Blue**: #2E86AB (Ocean theme)
- **Secondary Gold**: #F4A261 (Currency/wealth)
- **Accent Red**: #E76F51 (Damage/danger)
- **Success Green**: #2A9D8F (Health/success)

### 2.2 Background Colors
- **Main Background**: #264653 (Dark blue-gray)
- **Panel Background**: #1E3A47 (Darker blue-gray)
- **Card Background**: #2A4A57 (Medium blue-gray)
- **Highlight**: #3A5A67 (Light blue-gray)

### 2.3 Text Colors
- **Primary Text**: #FFFFFF (White)
- **Secondary Text**: #B8C5CC (Light gray)
- **Disabled Text**: #6B7B85 (Medium gray)
- **Error Text**: #E76F51 (Red)

## 3. Typography

### 3.1 Font Hierarchy
- **Title Font**: 'Orbitron', sans-serif (Headers)
- **Body Font**: 'Roboto', sans-serif (General text)
- **UI Font**: 'Roboto Condensed', sans-serif (Buttons, labels)

### 3.2 Font Sizes
- **H1 (Main Title)**: 32px
- **H2 (Section Headers)**: 24px
- **H3 (Subsection Headers)**: 20px
- **Body Text**: 16px
- **Small Text**: 14px
- **UI Labels**: 12px

### 3.3 Font Weights
- **Bold**: 700 (Headers, important text)
- **Medium**: 500 (Buttons, emphasis)
- **Regular**: 400 (Body text)
- **Light**: 300 (Secondary text)

## 4. Layout Structure

### 4.1 Main Game Screen Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Header Bar (Top)                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Game Canvas Area                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Tower Panel (Left) │ Wave Info (Center) │ Resources (Right) │
├─────────────────────────────────────────────────────────────┤
│                    Control Bar (Bottom)                     │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Responsive Breakpoints
- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px-1199px (Condensed layout)
- **Mobile**: 320px-767px (Stacked layout)

## 5. Main Menu Interface

### 5.1 Main Menu Layout
```
┌─────────────────────────────────────────────────────────────┐
│                    CRABADA DEFENSE                          │
│                                                             │
│                    [PLAY GAME]                             │
│                    [LEVEL SELECT]                          │
│                    [SETTINGS]                              │
│                    [HELP]                                  │
│                    [CREDITS]                               │
│                                                             │
│                    Version 1.0.0                           │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Menu Elements
- **Logo**: Large, centered game title
- **Menu Buttons**: Large, prominent buttons
- **Version Info**: Small text at bottom
- **Background**: Animated ocean/beach scene

### 5.3 Button Specifications
- **Size**: 200px × 60px
- **Padding**: 16px
- **Border Radius**: 8px
- **Hover Effect**: Scale 1.05, glow effect
- **Click Effect**: Scale 0.95

## 6. Level Select Interface

### 6.1 Level Grid Layout
```
┌─────────────────────────────────────────────────────────────┐
│                    SELECT LEVEL                             │
│                                                             │
│  [1★] [2★★] [3★★★] [4★★] [5★★★]                          │
│  [6★★] [7★★★] [8★★] [9★★★] [10★★★]                       │
│  [11★★] [12★★★] [13★★] [14★★★] [15★★★]                   │
│  [16★★] [17★★★] [18★★] [19★★★] [20★★★]                   │
│                                                             │
│                    [BACK TO MENU]                          │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Level Card Design
- **Size**: 120px × 120px
- **Border**: 2px solid
- **Background**: Level preview image
- **Star Rating**: 1-3 stars displayed
- **Lock Status**: Locked levels are grayed out
- **Hover Effect**: Scale 1.1, show level info

### 6.3 Level Information Panel
```
┌─────────────────────────────────────────────────────────────┐
│ Level 3: Tank Territory                                     │
│                                                             │
│ Difficulty: ★★★☆☆                                          │
│ Best Score: 1,250                                           │
│ Stars Earned: ★★★                                          │
│                                                             │
│ [PLAY] [RESTART] [BACK]                                     │
└─────────────────────────────────────────────────────────────┘
```

## 7. Game Screen Interface

### 7.1 Header Bar
```
┌─────────────────────────────────────────────────────────────┐
│ Wave: 3/10 │ Lives: 15 │ Currency: 750 │ [PAUSE] [SETTINGS] │
└─────────────────────────────────────────────────────────────┘
```

**Elements**:
- **Wave Counter**: Current wave / total waves
- **Lives Display**: Heart icons with number
- **Currency Display**: Gold icon with amount
- **Pause Button**: Pause game
- **Settings Button**: Quick access to settings

### 7.2 Tower Panel (Left Side)
```
┌─────────────────┐
│   TOWERS        │
│                 │
│ [Basic] 100     │
│ [Sniper] 200    │
│ [Area] 300      │
│ [Slow] 150      │
│                 │
│ Selected: Basic │
│ Cost: 100       │
│                 │
│ [UPGRADE] [SELL]│
└─────────────────┘
```

**Tower Button Specifications**:
- **Size**: 80px × 80px
- **Icon**: Tower sprite
- **Cost**: Displayed below icon
- **Selected State**: Highlighted border
- **Disabled State**: Grayed out when insufficient funds

### 7.3 Wave Information (Center Bottom)
```
┌─────────────────────────────────────────────────────────────┐
│ Wave 3/10 - Enemies Remaining: 12                          │
│ [▶ PLAY] [⏸ PAUSE] [⏭ FAST FORWARD]                       │
└─────────────────────────────────────────────────────────────┘
```

**Elements**:
- **Wave Progress**: Current wave number
- **Enemy Counter**: Enemies remaining in current wave
- **Speed Controls**: Play, pause, fast forward
- **Next Wave Button**: Start next wave early

### 7.4 Resource Panel (Right Side)
```
┌─────────────────┐
│   RESOURCES     │
│                 │
│ Currency: 750   │
│ Income: +10/s   │
│                 │
│   STATISTICS    │
│                 │
│ Towers: 8       │
│ Enemies Killed: │
│ 45              │
│                 │
│ [RESTART]       │
└─────────────────┘
```

## 8. Game Canvas Interface

### 8.1 Canvas Layout
- **Size**: Responsive, maintains aspect ratio
- **Grid**: 20×15 tile grid (visible grid lines)
- **Tower Spots**: Highlighted when tower can be placed
- **Path**: Clear enemy path visualization
- **Range Indicators**: Show tower range when selected

### 8.2 Interactive Elements
- **Tower Placement**: Click to place selected tower
- **Tower Selection**: Click existing tower to select
- **Range Preview**: Show range when hovering over placement
- **Path Preview**: Show enemy path when hovering

### 8.3 Visual Feedback
- **Valid Placement**: Green highlight
- **Invalid Placement**: Red highlight
- **Tower Range**: Blue circle
- **Enemy Health**: Health bar above enemy
- **Damage Numbers**: Floating damage text

## 9. HUD Elements

### 9.1 Health Bar
```
┌─────────────────────────────────────────────────────────────┐
│ ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥ │
└─────────────────────────────────────────────────────────────┘
```

**Specifications**:
- **Style**: Heart icons or bar
- **Color**: Green (full) to red (empty)
- **Animation**: Smooth transitions
- **Position**: Top-left corner

### 9.2 Currency Display
```
┌─────────────────┐
│ 💰 750          │
└─────────────────┘
```

**Specifications**:
- **Icon**: Gold coin symbol
- **Font**: Bold, large
- **Animation**: Count up when gaining currency
- **Color**: Gold/yellow

### 9.3 Wave Counter
```
┌─────────────────┐
│ Wave 3/10       │
└─────────────────┘
```

**Specifications**:
- **Format**: "Wave X/Y"
- **Style**: Clean, readable
- **Animation**: Pulse when new wave starts

## 10. Modal Dialogs

### 10.1 Pause Menu
```
┌─────────────────────────────────────────────────────────────┐
│                        PAUSED                               │
│                                                             │
│                    [RESUME]                                │
│                    [RESTART]                               │
│                    [SETTINGS]                              │
│                    [MAIN MENU]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 10.2 Victory Screen
```
┌─────────────────────────────────────────────────────────────┐
│                        VICTORY!                             │
│                                                             │
│                    ★★★                                     │
│                                                             │
│                    Score: 1,250                            │
│                    Currency Earned: 350                    │
│                    Enemies Killed: 45                      │
│                                                             │
│                    [NEXT LEVEL] [REPLAY] [MAIN MENU]       │
└─────────────────────────────────────────────────────────────┘
```

### 10.3 Defeat Screen
```
┌─────────────────────────────────────────────────────────────┐
│                        DEFEAT                               │
│                                                             │
│                    ☠️                                      │
│                                                             │
│                    Wave Reached: 7/10                      │
│                    Enemies Killed: 32                      │
│                                                             │
│                    [RESTART] [MAIN MENU]                   │
└─────────────────────────────────────────────────────────────┘
```

## 11. Settings Interface

### 11.1 Settings Menu
```
┌─────────────────────────────────────────────────────────────┐
│                        SETTINGS                             │
│                                                             │
│ Audio                                                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Master Volume: ████████████████████████████████████ 80% │ │
│ │ Sound Effects: ████████████████████████████████████ 90% │ │
│ │ Music:         ████████████████████████████████████ 70% │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Graphics                                                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Quality: [High ▼]                                       │ │
│ │ Fullscreen: [☐]                                         │ │
│ │ Show FPS: [☐]                                           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Controls                                                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Mouse Sensitivity: ████████████████████████████████████ │ │
│ │ Show Tooltips: [☑]                                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                    [SAVE] [RESET] [BACK]                   │
└─────────────────────────────────────────────────────────────┘
```

## 12. Help/Tutorial Interface

### 12.1 Tutorial Overlay
```
┌─────────────────────────────────────────────────────────────┐
│                    TUTORIAL                                 │
│                                                             │
│ Click on a tower spot to place your Basic Tower.           │
│                                                             │
│ [NEXT] [SKIP TUTORIAL]                                     │
└─────────────────────────────────────────────────────────────┘
```

### 12.2 Help Menu
```
┌─────────────────────────────────────────────────────────────┐
│                        HELP                                 │
│                                                             │
│ [TUTORIAL] [TOWER GUIDE] [ENEMY GUIDE] [CONTROLS]          │
│                                                             │
│ Tower Guide:                                                │
│ • Basic Tower: Balanced damage, good range                 │
│ • Sniper Tower: High damage, long range, slow fire         │
│ • Area Tower: Splash damage, good for groups               │
│ • Slow Tower: Slows enemies, utility focus                 │
│                                                             │
│                    [BACK]                                   │
└─────────────────────────────────────────────────────────────┘
```

## 13. Accessibility Features

### 13.1 Visual Accessibility
- **High Contrast Mode**: Enhanced color contrast
- **Color Blind Support**: Alternative color schemes
- **Large Text Option**: Increased font sizes
- **Reduced Motion**: Disable animations

### 13.2 Audio Accessibility
- **Visual Audio Cues**: Visual indicators for sounds
- **Subtitle Support**: Text for audio content
- **Volume Controls**: Individual volume sliders

### 13.3 Input Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Mouse Alternatives**: Touch and gamepad support
- **Customizable Controls**: Remappable keys

## 14. Responsive Design

### 14.1 Mobile Layout
```
┌─────────────────┐
│ Header (Compact)│
├─────────────────┤
│                 │
│   Game Canvas   │
│                 │
├─────────────────┤
│ Tower Panel     │
│ (Scrollable)    │
├─────────────────┤
│ Controls        │
└─────────────────┘
```

### 14.2 Tablet Layout
```
┌─────────────────────────────────┐
│ Header                          │
├─────────────────────────────────┤
│ Game Canvas │ Tower Panel       │
│             │                   │
│             │ Resources         │
├─────────────────────────────────┤
│ Controls                        │
└─────────────────────────────────┘
```

## 15. Animation Guidelines

### 15.1 Transition Speeds
- **Fast**: 150ms (Button clicks, immediate feedback)
- **Medium**: 300ms (Menu transitions, hover effects)
- **Slow**: 500ms (Page transitions, major changes)

### 15.2 Animation Types
- **Fade**: Opacity transitions
- **Slide**: Position transitions
- **Scale**: Size transitions
- **Color**: Color transitions

### 15.3 Performance Considerations
- **Hardware Acceleration**: Use CSS transforms
- **Frame Rate**: Target 60 FPS
- **Reduced Motion**: Respect user preferences

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Date + 2 weeks] 