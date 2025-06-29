<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Strategy Tower Defense Game - Multiple Towers</title>
  <style>
    body { background: #222; color: #eee; font-family: sans-serif; }
    #ui {
      margin-bottom: 8px;
      padding: 12px;
      background: #171717;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }
    .tower-btn {
      border: none;
      border-radius: 5px;
      padding: 8px 18px;
      margin-right: 6px;
      font-weight: bold;
      cursor: pointer;
      outline: 2px solid transparent;
      transition: background .2s, outline .2s, filter .2s;
    }
    .tower-btn.selected {
      outline: 2px solid #fff55d;
      filter: brightness(1.2);
    }
    .tower-btn.unavailable {
      filter: grayscale(0.85) opacity(0.6);
      cursor: not-allowed;
    }
    #gameCanvas { background: #111; display:block; margin:auto; border-radius:8px;}
    #status {
      padding-left: 12px;
    }
    #nextWaveBtn {
      border:none;
      border-radius:5px;
      padding:8px 22px;
      background:#ffd857;
      color:#222; 
      font-weight:bold;
      margin-right:10px;
      cursor:pointer;
      box-shadow:0 1px 3px rgba(0,0,0,.18);
      transition:background .15s,filter .15s;
    }
    #nextWaveBtn[disabled]{
      background:#888;
      color:#333;
      cursor:not-allowed;
    }
    #upgradePanel {
      position:absolute; 
      background:#252525;
      border-radius:8px; 
      border:1.5px solid #ffd857;
      color:#ffe98d; 
      left:-9999px; top:-9999px; /* Hide by default */
      z-index:9;
      padding:13px 24px 13px 20px;
      min-width:170px;
      font-size:.96em;
    }
    #upgradePanel button {
      margin-top:7px; 
      font-weight:bold; 
      padding:6px 16px; 
      border-radius:4px; 
      border:none; 
      background:#ffe98d; color:#222; cursor:pointer;
    }
    #upgradePanel button[disabled] {
      background:#aaa;color:#333;cursor:not-allowed;
    }
  </style>
</head>
<body>
<div id="ui">
  <button id="tower-basic" class="tower-btn">Basic Tower ($50)</button>
  <button id="tower-sniper" class="tower-btn">Sniper ($100)</button>
  <button id="nextWaveBtn">Start Wave</button>
  <span id="status"></span>
</div>
<div id="upgradePanel" style="display:none;">
  <div id="upgradeDetails"></div>
  <button id="upgradeBtn">Upgrade</button>
</div>
<canvas id="gameCanvas" width="640" height="448"></canvas>
<script>
// --- GAME CONFIG ---
const GRID_SIZE = 32;
const MAP_W = 20, MAP_H = 14;
const CANVAS_W = GRID_SIZE * MAP_W, CANVAS_H = GRID_SIZE * MAP_H;

// Path points (row,col)
const path = [
  [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[5,7],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[10,9],[10,10],[11,10],[12,10],[13,10]
];

// Tower types
const TOWER_TYPES = [
  {
    name: "Basic",
    cost: 50,
    range: 90,
    damage: 18,
    cooldown: 600,
    color: "#34c759",
    radius: 13,
    upgradeCostBase: 40,
    rangeInc:18,
    damageInc:11,
    cooldownMul:.83
  },
  {
    name: "Sniper",
    cost: 100,
    range: 170,
    damage: 40,
    cooldown: 1700,
    color: "#3787d4",
    radius: 14,
    upgradeCostBase:60,
    rangeInc:30,
    damageInc:19,
    cooldownMul:.82
  }
];

// Enemy config
const ENEMY_HP = 70, ENEMY_SPEED = 0.43 + Math.random()*0.06, ENEMY_REWARD = 13; // SLOWED DOWN

let gold = 150, lives = 10, wave = 1;
let selectedTowerTypeIdx = 0;

// --- UTILS ---
function dist(ax,ay,bx,by) { return Math.hypot(ax-bx,ay-by); }

// --- GAME STATE ---
let towers = [];
let enemies = [];
let bullets = [];
let placingMode = true;

let betweenWaves = true;

let selectedTowerForUpgrade = null;

// --- CANVAS ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- UI SETUP ---
const statusEl = document.getElementById('status');
function updateUI() {
  statusEl.innerHTML =
    `<b>Gold:</b> $${gold} &nbsp; <b>Lives:</b> ${lives} &nbsp; <b>Wave:</b> ${wave}`;
}
function updateTowerButtons() {
  document.querySelectorAll('.tower-btn').forEach((btn,i)=>{
    btn.classList.toggle('selected', i===selectedTowerTypeIdx);
    btn.classList.toggle('unavailable', TOWER_TYPES[i].cost>gold);
    btn.disabled = (TOWER_TYPES[i].cost>gold);
  });
}
updateTowerButtons();

// Tower select buttons
document.getElementById('tower-basic').onclick = ()=>{selectedTowerTypeIdx=0;placingMode=true;updateTowerButtons();closeUpgradePanel();}
document.getElementById('tower-sniper').onclick= ()=>{selectedTowerTypeIdx=1;placingMode=true;updateTowerButtons();closeUpgradePanel();}

// --- MAP ---
function drawGrid(){
  ctx.save();
  ctx.strokeStyle='rgba(90,90,90,.4)';
  for(let x=0;x<=CANVAS_W;x+=GRID_SIZE){
    ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,CANVAS_H);ctx.stroke();
  }
  for(let y=0;y<=CANVAS_H;y+=GRID_SIZE){
    ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(CANVAS_W,y);ctx.stroke();
  }
  ctx.restore();
}
function isOnPath(row,col){
  return path.some(([r,c])=>r===row&&c===col);
}
function drawPath(){
  ctx.save();
  ctx.globalAlpha=0.19;
  for(let i=0;i<path.length;i++){
    let [r,c]=path[i];
    ctx.fillStyle="#ffd857";
    ctx.fillRect(c*GRID_SIZE,r*GRID_SIZE,GRID_SIZE,GRID_SIZE);
  }
  ctx.restore();
}

// --- ENEMIES ---
function spawnEnemy(){
  enemies.push({
    hp: ENEMY_HP+Math.floor(wave*3),
    maxHp: ENEMY_HP+Math.floor(wave*3),
    pathIdx:0,
    x:path[0][1]*GRID_SIZE+GRID_SIZE/2,
    y:path[0][0]*GRID_SIZE+GRID_SIZE/2,
    t:0
  });
}
let enemySpawnTimer = 0;
let enemiesToSpawn = Math.min(4+wave*2,24);

// --- TOWERS ---
function canPlaceTower(row,col){
  // Can't place on path or on another tower
  if(isOnPath(row,col)) return false;
  if(towers.some(t=>t.row===row&&t.col===col)) return false;
  return true;
}

// --- UPGRADE PANEL ---
const upgradePanel = document.getElementById('upgradePanel');
const upgradeDetails = document.getElementById('upgradeDetails');
const upgradeBtn = document.getElementById('upgradeBtn');
function showUpgradePanel(tower,x,y) {
  selectedTowerForUpgrade = tower;

  let typeIdx = tower.typeIdx || towers.indexOf(tower)>=0 && towers[towers.indexOf(tower)].typeIdx || (tower.name==="Basic"?0:1);
  let type = TOWER_TYPES[typeIdx];
  
  // Compute upgrade cost and preview stats
  let nextLevel = (tower.level||1)+1;
  let upgradeCost = type.upgradeCostBase * nextLevel + Math.round(type.cost*0.45*nextLevel);
  
  let previewRange = Math.round(tower.range + type.rangeInc);
  let previewDamage = tower.damage + type.damageInc;
  let previewCooldown = Math.round(tower.cooldown * type.cooldownMul);

  upgradeDetails.innerHTML =
   `<div><b>${type.name} Tower</b> (Lv.${tower.level||1})</div>
   <div>Range <span style="color:#bbea7c">${tower.range}</span> → <span style="color:#fff55d">${previewRange}</span></div>
   <div>Damage <span style="color:#bbea7c">${tower.damage}</span> → <span style="color:#fff55d">${previewDamage}</span></div>
   <div>Cooldown <span style="color:#bbea7c">${tower.cooldown}</span>ms → <span style="color:#fff55d">${previewCooldown}</span>ms</div>
   <div style="margin-top:.5em;">Upgrade Cost: <b style="color:${gold>=upgradeCost?'#f9e65e':'#f66'}">$${upgradeCost}</b></div>`;
  
   upgradeBtn.disabled = gold<upgradeCost;

   // Position panel near mouse (x,y relative to page)
   upgradePanel.style.left=(window.scrollX+x+25)+"px";
   upgradePanel.style.top =(window.scrollY+y-10)+"px";
   upgradePanel.style.display='block';
}
function closeUpgradePanel() {
   selectedTowerForUpgrade=null;
   upgradePanel.style.display='none';
}

// Upgrade logic
upgradeBtn.onclick=function() {
 if(!selectedTowerForUpgrade) return;
 let t=selectedTowerForUpgrade;

 let typeIdx = t.typeIdx!==undefined?t.typeIdx:(t.name==="Basic"?0:1);
 let type=TOWER_TYPES[typeIdx];
 let nextLevel=(t.level||1)+1;
 let upgradeCost=type.upgradeCostBase * nextLevel + Math.round(type.cost*0.45*nextLevel);

 if(gold>=upgradeCost) {
   gold-=upgradeCost;

   t.level=(t.level||1)+1;
   t.range=Math.round(t.range+type.rangeInc);
   t.damage+=type.damageInc;
   t.cooldown=Math.round(t.cooldown*type.cooldownMul);
   updateUI();
   updateTowerButtons();
   closeUpgradePanel();
 }
};

// Canvas click for placing or upgrading
canvas.addEventListener('click',e=>{
 const rect = canvas.getBoundingClientRect();
 const mx = e.clientX-rect.left, my=e.clientY-rect.top;
 const col = Math.floor(mx/GRID_SIZE), row=Math.floor(my/GRID_SIZE);

 // If not in placing mode and not clicking tower for upgrade
 if(!placingMode) {
   // Check for tower click for upgrading
   let tx=col*GRID_SIZE+GRID_SIZE/2, ty=row*GRID_SIZE+GRID_SIZE/2;
   for(let tow of towers){
     if(dist(mx,my,tow.x,tow.y)<(tow.radius||12)+6){
       // Show upgrade panel at mouse position (relative to window)
       showUpgradePanel(tow,e.clientX,e.clientY);
       return;
     }
   }
   closeUpgradePanel();
   return;
 }

 // Placing mode logic:
 if(canPlaceTower(row,col)){
   let type = TOWER_TYPES[selectedTowerTypeIdx];
   if(gold>=type.cost){
     towers.push({
       ...type,
       row,col,
       x: col*GRID_SIZE+GRID_SIZE/2,
       y: row*GRID_SIZE+GRID_SIZE/2,
       cd:0,// cooldown timer
       level:1,
       typeIdx:selectedTowerTypeIdx
     });
     gold -= type.cost;
     updateUI();
     updateTowerButtons();
     closeUpgradePanel();
   }
 }
});

// Right-click cancels placement and closes panel
canvas.addEventListener('contextmenu',function(e){
 e.preventDefault();
 placingMode=false;
 closeUpgradePanel();
});

// --- WAVE BUTTON ---
const nextWaveBtn=document.getElementById('nextWaveBtn');
function updateWaveBtn(){
 if(betweenWaves){
   nextWaveBtn.disabled=false;
   nextWaveBtn.textContent='Start Wave';
 } else{
   nextWaveBtn.disabled=true;
   nextWaveBtn.textContent='Wave in Progress...';
 }
}
nextWaveBtn.onclick=function(){
 if(betweenWaves){
   startNewWave();
 }
};
function startNewWave(){
 betweenWaves=false;
 enemiesToSpawn=Math.min(4+wave*2,28);
 enemySpawnTimer=700-(wave*17);
 updateWaveBtn();
}

// --- GAME LOOP ---
function step(dt){
 // Spawn enemies only during waves
 if(!betweenWaves && enemiesToSpawn>0){
   enemySpawnTimer-=dt;
   if(enemySpawnTimer<=0){
     spawnEnemy();
     enemiesToSpawn--;
     enemySpawnTimer=800 - Math.min(400,wave*22);
   }
 }
 // Move enemies
 for(let en of enemies){
   let segA=path[en.pathIdx], segB=path[en.pathIdx+1];
   if(!segB) continue;
   let ax=segA[1]*GRID_SIZE+GRID_SIZE/2, ay=segA[0]*GRID_SIZE+GRID_SIZE/2;
   let bx=segB[1]*GRID_SIZE+GRID_SIZE/2, by=segB[0]*GRID_SIZE+GRID_SIZE/2;
   const dx=bx-ax, dy=by-ay;
   const len=Math.hypot(dx,dy);
   const speed=ENEMY_SPEED+wave*0.015; // Slowed further scaling
   en.t += dt*speed/len;
   if(en.t>=1){
     en.pathIdx++;
     en.t=0;
     if(en.pathIdx>=path.length-1){
       lives--;
       en.hp=-1;
       updateUI();
     }
   }else{
     en.x=ax+dx*en.t; en.y=ay+dy*en.t;
   }
 }

 // Remove dead enemies
 enemies=enemies.filter(e=>e.hp>0);

 // Towers fire
 for(let tow of towers){
   tow.cd-=dt;
   if(tow.cd<=0){
     // Find closest enemy in range
     let target=null,minDist=9999;
     for(let en of enemies){
       let d=dist(tow.x,tow.y,en.x,en.y);
       if(d<=tow.range && d<minDist){ target=en; minDist=d;}
     }
     if(target){
       let angle=Math.atan2(target.y-tow.y,target.x-tow.x);
       bullets.push({
         x:tow.x,y:tow.y,
         txRefObj:target,// reference to enemy object
         speedPxPerFrame:(tow.range/14)+3,
         damage:tow.damage,
         color:tow.color,
         angle,
         lastKnownTarget:{x:target.x,y:target.y}
       });
       tow.cd=tow.cooldown;
     }
   }
 }

 // Bullets move & home in on target every frame
 for(let b of bullets){
   // Home-in logic
   let target=b.txRefObj&&enemies.includes(b.txRefObj)?b.txRefObj:null;

   if(target){
     b.lastKnownTarget={x:target.x,y:target.y};
     let dx=target.x-b.x, dy=target.y-b.y, dn=Math.hypot(dx,dy);
     if(dn!==0){
       b.x+=dx/b.speedPxPerFrame;
       b.y+=dy/b.speedPxPerFrame;
     }
   }else{
     // Continue straight to last known target pos
     let dx=b.lastKnownTarget.x-b.x, dy=b.lastKnownTarget.y-b.y,dn=Math.hypot(dx,dy);
     if(dn!==0){
       b.x+=dx/b.speedPxPerFrame;
       b.y+=dy/b.speedPxPerFrame;
     }
   }
 }

 // Collisions (use enlarged hit radius)
 for(let b of bullets){
   let target=b.txRefObj&&enemies.includes(b.txRefObj)?b.txRefObj:null;

   // If target exists and not already dead
   if(target && dist(b.x,b.y,target.x,target.y)<17 && target.hp>0){
     target.hp-=b.damage;
     if(target.hp<=0){ gold+=ENEMY_REWARD+Math.floor(wave/2); updateUI(); updateTowerButtons();}
     b.hit=true;
   }else if(!target && dist(b.x,b.y,b.lastKnownTarget.x,b.lastKnownTarget.y)<17){
     b.hit=true;// Remove bullet even if target is dead/offscreen
   }
 }

 bullets=bullets.filter(b=>!b.hit && b.x>=-10&&b.x<CANVAS_W+10&&b.y>=-10&&b.y<CANVAS_H+10);

 // Win/loss/wave logic
 if(!betweenWaves && enemiesToSpawn<=0 && enemies.length==0){
   betweenWaves=true; wave++;
   updateWaveBtn();
 }

}

// --- RENDERING ---
function render(){
 ctx.clearRect(0,0,CANVAS_W,CANVAS_H);
 drawPath();
 drawGrid();

 // Draw towers
 for(const t of towers){
   ctx.save();
   ctx.strokeStyle=t.color; ctx.globalAlpha=0.13+(t.level?Math.min(.12+.07*t.level,.33):0);
   ctx.beginPath();ctx.arc(t.x,t.y,t.range,0,Math.PI*2);ctx.stroke();
   ctx.globalAlpha=1.0; ctx.fillStyle=t.color;

   ctx.beginPath();ctx.arc(t.x,t.y,t.radius||12,0,Math.PI*2);ctx.fill();

   // Draw level indicator
   ctx.globalAlpha=.94;ctx.fillStyle="#111";ctx.font="bold .95em monospace";
   ctx.textAlign='center';ctx.textBaseline='middle';
   ctx.fillText(t.level||"1",t.x,t.y+2.5);

   ctx.restore();
 }

 // Draw enemies
 for(const en of enemies){
   ctx.save();
   ctx.strokeStyle="#111"; ctx.lineWidth=3.3;
   ctx.beginPath();ctx.arc(en.x,en.y,13,0,Math.PI*2);ctx.stroke();
   ctx.fillStyle="#e94e36";
   ctx.beginPath();ctx.arc(en.x,en.y,12,0,Math.PI*2);ctx.fill();

   // Health bar
   ctx.fillStyle="#222";
   ctx.fillRect(en.x-13,en.y-18,26,5);
   ctx.fillStyle="#5fc23c";
   const barW=Math.max(1,(en.hp/en.maxHp)*26);
   ctx.fillRect(en.x-13,en.y-18,barW,5);

   ctx.restore();
 }

 // Draw bullets (short trail)
 for(const b of bullets){
   ctx.save();
   ctx.strokeStyle=b.color; ctx.lineWidth=3.5;

   const trailLen=7+(Math.random()*4|0);
   const bx=b.x-Math.cos(b.angle)*trailLen, by=b.y-Math.sin(b.angle)*trailLen;

   ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(bx,by);ctx.stroke();

   ctx.restore();
 }

 // Placement preview
 if(placingMode && canvas.matches(':hover')){
   canvas.style.cursor='crosshair';
   const mx=_lastMouse[0], my=_lastMouse[1];
   const col=Math.floor(mx/GRID_SIZE), row=Math.floor(my/GRID_SIZE);
   if(col>=0&&col<MAP_W&&row>=0&&row<MAP_H){
     let valid=canPlaceTower(row,col)&&TOWER_TYPES[selectedTowerTypeIdx].cost<=gold;
     let x=col*GRID_SIZE+GRID_SIZE/2,y=row*GRID_SIZE+GRID_SIZE/2;
     ctx.save();
     ctx.globalAlpha=.25; ctx.fillStyle=TOWER_TYPES[selectedTowerTypeIdx].color;
     ctx.beginPath();ctx.arc(x,y,TOWER_TYPES[selectedTowerTypeIdx].radius||12,0,Math.PI*2);ctx.fill();
     ctx.globalAlpha=.15;ctx.beginPath();ctx.arc(x,y,TOWER_TYPES[selectedTowerTypeIdx].range,0,Math.PI*2);ctx.fill();
     if(!valid){ctx.globalAlpha=.55;ctx.strokeStyle="#f44";ctx.setLineDash([4]);ctx.beginPath();ctx.arc(x,y,TOWER_TYPES[selectedTowerTypeIdx].radius||12,0,Math.PI*2);ctx.stroke();}
     ctx.restore();
   }
 } else canvas.style.cursor='default';

}

// Track mouse for placement preview & upgrades
let _lastMouse=[-99,-99];
canvas.addEventListener('mousemove',e=>{
 const rect=canvas.getBoundingClientRect();
 _lastMouse=[e.clientX-rect.left,e.clientY-rect.top];
});

// Close upgrade panel on click elsewhere (outside panel/canvas)
document.body.addEventListener('mousedown',e=>{
 if(upgradePanel.style.display==='block'){
     if(!upgradePanel.contains(e.target)&&e.target!==canvas){
        closeUpgradePanel();
        placingMode=false;//leave placing mode after using upgrade UI
     }
 }
});

// --- MAIN LOOP ---
let lastTime=performance.now();
function loop(now){
 let dt=Math.min(60,(now-lastTime));
 step(dt);
 render();
 lastTime=now;
 requestAnimationFrame(loop);
}
updateUI();
updateWaveBtn();
closeUpgradePanel();
loop(performance.now());

</script>
</body>
</html>