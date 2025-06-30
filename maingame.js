// Crabada Defense - Main Game Logic

// ====== MAP & PATH (Level 1 sample) ======
const MAP_TILE_SIZE = 45; // px
const MAP_WIDTH = 12, MAP_HEIGHT = 18;
const PATH = [
    [0,9],[2,9],[2,6],[8,6],[8,13],[4,13],[4,16],[11,16]
];
const TOWER_SPOTS = [
    [1,7],[3,7],[4,7],[7,7],[9,7],
    [3,9],[5,9],[7,9],[9,9],
    [2,12],[5,12],[7,12],[10,12],
    [3,15],[6,15],[9,15]
];

// ====== CANVAS & CONTEXT ======
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// ====== UI ELEMENTS ======
const waveNumEl = document.getElementById('wave-num');
const livesNumEl = document.getElementById('lives-num');
const goldNumEl = document.getElementById('gold-num');
const towerBtns = Array.from(document.querySelectorAll('.tower-btn'));
const startWaveBtn = document.getElementById('start-wave-btn');
const upgradeModal = document.getElementById('upgrade-modal');
const upgradeTitle = document.getElementById('upgrade-title');
const towerStatsDiv = document.getElementById('tower-stats');
const upgradeBtn = document.getElementById('upgrade-btn');
const sellBtn = document.getElementById('sell-btn');
const closeUpgradeBtn = document.getElementById('close-upgrade-btn');

// ====== GAME STATE ======
let gameState = "idle"; // idle | running | placing | upgrading | wave_cooldown | lost
let gold = 500;
let lives = 20;
let currentWave = 1;
let enemies = [];
let towers = [];
let projectiles = [];
let placingTowerType = null;
let selectedTower = null;
let waveTimer = null;

// ====== CORE CONFIGS ======
// -- TOWERS --
const TOWER_CONFIGS = {
    basic:{ name:"Basic", cost:100, damage:[25,38,50], range:[135,168.75,202.5], fireRate:[1.0,1.0,0.8], projectileSpeed:[5], upgrades:[150,300], sell:[70,150], type:"all" },
    sniper:{ name:"Sniper", cost:200, damage:[75,113,150], range:[270,337.5,405], fireRate:[2.0,2.0,1.6], projectileSpeed:[8], upgrades:[300,600], sell:[140,300], type:"all", pierce:true },
    area:{ name:"Area", cost:300, damage:[40,60,80], range:[112.5,140.625,168.75], fireRate:[1.25,1.25,.96], projectileSpeed:[4], splashRadius:[67.5], upgrades:[450,900], sell:[210,450], type:"all", splash:true },
    slow:{ name:"Slow", cost:150, damage:[15,23,30], range:[135,168.75,202.5], fireRate:[.83,.83,.66], projectileSpeed:[6], slowAmount:[.3,.4,.5], slowDuration:[3], upgrades:[225,450], sell:[105,225], type:"all", slow:true }
};
// -- ENEMIES --
const ENEMY_CONFIGS = {
    basic:{ name:"Basic", health:100,speed:.75,reward:10,color:"#36c",size:34 },
    fast:{ name:"Fast", health:50,speed:1.5,reward:15,color:"#0c9",size:27 },
    tank:{ name:"Tank", health:300,speed:.4,reward:25,color:"#a81",size:44 ,defense:10},
    flying:{ name:"Flying", health:75,speed:.95,reward:20,color:"#f8b",size:34 ,flying:true },
    boss:{ name:"Boss", health:1000,speed:.65,reward:100,color:"#c33",size:60 ,defense:25,boss:true }
};
// -- WAVES --
function getWaveData(wave) {
    // Level 1 only basic enemies + boss on wave5/10
    let w=wave;
    let count=Math.floor(10*(1+.2*(w-1)));
    let hpMul=1+.1*(w-1);
    let spdMul=1+.05*(w-1);

    if(w===5||w===10) return [{type:'boss',count:w===5?1:2,hpMul:(w===10?2.0 :1.4),spdMul:(w===10?1.5 :1.2)}];
    return [{type:'basic',count,count,hpMul,hpMul}];
}

// ====== SOUND EFFECTS ======
function playBeep(f=800,dur=.08) {
   if(!soundOn) return;
   try{
     const ctx=new(window.AudioContext||window.webkitAudioContext)();
     const osc=ctx.createOscillator();
     osc.type='sine'; osc.frequency.value=f;
     osc.connect(ctx.destination);
     osc.start();
     osc.stop(ctx.currentTime+dur);
   }catch(e){}
}
let soundOn=true;
document.getElementById('sound-btn').onclick=function(){
   soundOn=!soundOn;
   this.innerHTML=soundOn?"&#128266;":"&#128263;";
};

// ====== UTILS ======
function lerp(a,b,t){return a+(b-a)*t;}
function dist(ax,ay,bx,by){return Math.hypot(ax-bx,ay-by);}
function clamp(x,a,b){return Math.max(a,Math.min(b,x));}

// ====== ENEMY CLASS ======
class Enemy {
    constructor(type,data,path){
        this.type=type;
        this.cfg=ENEMY_CONFIGS[type];
        this.x=path[0][0]*MAP_TILE_SIZE+MAP_TILE_SIZE/2;
        this.y=path[0][1]*MAP_TILE_SIZE+MAP_TILE_SIZE/2;
        this.pathIdx=0; this.pathProg=0;
        this.hp=(data.hpMul||1)*this.cfg.health;
        this.maxHp=this.hp;
        this.speed=(data.spdMul||1)*this.cfg.speed*MAP_TILE_SIZE/18*60/1000*16.67;// px/frame
        this.reward=this.cfg.reward||10;
        this.size=this.cfg.size||34;
        this.defense=this.cfg.defense||0;
        this.flying=this.cfg.flying||false;
        this.boss=this.cfg.boss||false;
        this.slow=1.0; this.slowTimer=0;
        this.alive=true; this.reachedGoal=false;
    }
    update(dt){
        if(this.slowTimer>0){this.slowTimer-=dt/1000;if(this.slowTimer<=0)this.slow=1;}
        let targetPt=PATH[this.pathIdx+1];
        if(!targetPt){this.reachedGoal=true;return;}
        let [tx,ty]=[targetPt[0]*MAP_TILE_SIZE+MAP_TILE_SIZE/2,targetPt[1]*MAP_TILE_SIZE+MAP_TILE_SIZE/2];
        let dx=tx-this.x,dy=ty-this.y,l=Math.hypot(dx,dy);
        let spd=this.speed*this.slow*dt/16.67;
        if(l<spd){this.x=tx;this.y=ty;this.pathIdx++;}else{
            this.x+=dx/l*spd; this.y+=dy/l*spd;}
    }
    draw(ctx){
        ctx.save();
        ctx.globalAlpha=this.flying?.8 :1.0;

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size/2+2,this.boss?Math.PI*.25 :0,this.boss?Math.PI*1.75 :Math.PI*2);
        ctx.fillStyle=this.cfg.color||"#999";
        ctx.shadowBlur=this.boss?18 :6; ctx.shadowColor=this.cfg.color||"#999";
        ctx.fill();

        // HP bar
        ctx.globalAlpha=1.0; ctx.shadowBlur=0;
        ctx.fillStyle="#000"; ctx.fillRect(this.x-this.size/2,this.y-this.size/2-8,this.size,6);
        ctx.fillStyle="#3e3"; ctx.fillRect(this.x-this.size/2+1,this.y-this.size/2-7,(this.size-2)*(this.hp/this.maxHp),4);

        // Eyes
        ctx.fillStyle="#fff";
        ctx.beginPath();ctx.arc(this.x-6,this.y-5,this.flying?3 :4 ,0,Math.PI*2);ctx.arc(this.x+6,this.y-5,this.flying?3 :4 ,0,Math.PI*2);ctx.fill();

        // Boss symbol
        if(this.boss){
            ctx.font=`bold ${this.size*.44}px Arial`;ctx.fillStyle="#fff";
            ctx.fillText("👑",this.x-this.size*.19,this.y+this.size*.19);
        }
        ctx.restore();
    }
}

// ====== TOWER CLASS ======
class Tower {
    constructor(type,x,y){
        this.type=type;
        this.lvl=0;// start at level 1 (index 0)
        this.cfg=TOWER_CONFIGS[type];
        this.x=x; this.y=y;
        this.cd=0;// cooldown
    }
    update(dt){
       // cooldown
       if(this.cd>0)this.cd-=dt/1000;
       if(this.cd<=0){
         let targets=getEnemiesInRange(this,this.range());
         if(targets.length){
             let e=this.type==="sniper"?targets.reduce((a,b)=>a.hp>b.hp?a:b):targets[0];
             shoot(this,e);
             this.cd=this.fireRate();
         }
       }
    }
    range(){return this.cfg.range[this.lvl];}
    damage(){return this.cfg.damage[this.lvl];}
    fireRate(){return this.cfg.fireRate[this.lvl];}
    canUpgrade(){return this.lvl<2;}
}
// ===== PROJECTILE CLASS =====
class Projectile{
 constructor(tower,target){
   this.x=tower.x;this.y=tower.y;this.target=target;this.tower=tower;this.lifetime=12000;//ms
   this.speed=tower.cfg.projectileSpeed[0]*MAP_TILE_SIZE/18*60/1000*16.67*1.12;// px/frame
   this.hit=false;
 }
 update(dt){
   if(!this.target.alive){this.hit=true;return;}
   let dx=this.target.x-this.x,dy=this.target.y-this.y,l=Math.hypot(dx,dy);
   let spd=this.speed*dt/16.67;if(l<spd){this.x=this.target.x;this.y=this.target.y;}
   else{this.x+=dx/l*spd;this.y+=dy/l*spd;}
   // hit?
   if(dist(this.x,this.y,this.target.x,this.target.y)<12){doProjectileHit(this);this.hit=true;}
   // expire
   if((this.lifetime-=dt)<0)this.hit=true;
 }
 draw(ctx){
   ctx.save();
   if(this.tower.cfg.splash){ctx.globalAlpha=.97;ctx.strokeStyle="#ffeb3b";ctx.lineWidth=5;}
   else if(this.tower.type==="sniper"){ctx.globalAlpha=.82;ctx.strokeStyle="#bdf";ctx.lineWidth=4;}
   else if(this.tower.type==="slow"){ctx.globalAlpha=.88;ctx.strokeStyle="#54f";ctx.lineWidth=4;}
   else{ctx.globalAlpha=.84;ctx.strokeStyle="#fff";ctx.lineWidth=3;}
   ctx.beginPath();ctx.moveTo(this.tower.x,this.tower.y);ctx.lineTo(this.x,this.y);ctx.stroke();
   ctx.restore();
 }
}

// ===== GAME LOGIC =====
function getEnemiesInRange(twr,rng){
 let arr=enemies.filter(e=>{
     if(!e.alive)return false;if(e.flying && twr.type!=="sniper" && twr.type!=="slow")return false;// area/basic can't shoot flying
     return dist(twr.x,twr.y,e.x,e.y)<=rng+e.size/3 && !e.reachedGoal;
 });
 arr.sort((a,b)=>a.pathIdx-b.pathIdx||a.pathProg-b.pathProg);
 return arr.length?arr :[];
}
function shoot(twr,e){
 projectiles.push(new Projectile(twr,e));
 playBeep(1200,.04);
}
function doProjectileHit(pj){
 let t=pj.tower,e=pj.target;

 // Damage calculation
 let dmg=Math.max(1,(t.damage()-(e.defense||0)));
 if(t.cfg.splash){
     // Splash all enemies in splash radius
     for(let en of enemies)
         if(en.alive && dist(pj.x,pj.y,en.x,en.y)<=t.cfg.splashRadius[0]) en.hp-=dmg,en.hp=Math.max(0,en.hp);
 }else{
     e.hp-=dmg;e.hp=Math.max(0,e.hp);
 }

 // Slow effect
 if(t.cfg.slow){
     e.slow=1-t.cfg.slowAmount[t.lvl];
     e.slowTimer=t.cfg.slowDuration[0];
 }

 // Sniper pierce (damage next enemy in line)
 if(t.cfg.pierce){
     let arr=getEnemiesInRange(t,t.range());
     if(arr.length>=2 && arr[0]===e && arr[1].alive){
         arr[1].hp-=dmg*0.65;// less damage to second enemy
     }
 }

 playBeep(900,.03);

}

function spawnEnemy(type,data){
 enemies.push(new Enemy(type,data||{},PATH));
}

function nextWave(){
 waveNumEl.textContent=currentWave+"/10";
 startWaveBtn.disabled=true;

 // Spawn logic
 let batch=getWaveData(currentWave);
 let spawnPlan=[];
 for(let g of batch)
     for(let i=0;i<g.count;i++)spawnPlan.push({...g});
 shuffle(spawnPlan);

 let idx=0,lastTime=performance.now(),spawnIntv=Math.max(340-(currentWave*11),90);

 function doSpawn(now){
     while(idx<spawnPlan.length && now-lastTime>=spawnIntv){
         lastTime+=spawnIntv;
         spawnEnemy(spawnPlan[idx].type,{hpMul:(spawnPlan[idx].hpMul),spdMul:(spawnPlan[idx].spdMul)});
         idx++;
     }
     if(idx<spawnPlan.length)setTimeout(()=>doSpawn(performance.now()),20);
     else startWaveBtn.disabled=true;// until wave is over.
 }

 doSpawn(performance.now());
 gameState="running";
}

function startGame(){
 gold=500;lives=20;currentWave=1;towers=[];projectiles=[];enemies=[];
 waveNumEl.textContent=currentWave+"/10";
 livesNumEl.textContent=lives.toString();
 goldNumEl.textContent=gold.toString();
 startWaveBtn.disabled=false;
 gameState="idle";
 drawGame();
}

function updateGame(dt){
 // Update enemies
 for(let e of enemies)if(e.alive && !e.reachedGoal) e.update(dt);

 // Remove dead/reached-goal enemies & process gold/lives
 for(let i=enemies.length-1;i>=0;i--){
     let e=enemies[i];
     if(e.alive && e.hp<=0){
         e.alive=false;
         gold+=e.reward|0;if(e.boss)gold+=e.reward|0;// bosses drop extra
         goldNumEl.textContent=gold.toString();
         playBeep(400,.05);
     }
     else if(e.reachedGoal && e.alive){e.alive=false;lives--;livesNumEl.textContent=lives.toString();playBeep(200,.09);}
 }
 enemies=enemies.filter(e=>e.alive);

 // Update towers
 for(let t of towers)t.update(dt);

 // Update projectiles
 for(let i=projectiles.length-1;i>=0;i--){
     projectiles[i].update(dt);
     if(projectiles[i].hit)projectiles.splice(i,1);
 }

 // Check lose condition
 if(lives<=0 && gameState!=="lost"){gameState="lost";setTimeout(()=>alert("You Lost! Try again!"),350);}
}

function drawMap(){
 // Tiles & Path
 ctx.save();

 // Draw sand bg
 ctx.fillStyle="#ffeabf";
 ctx.fillRect(0,0,MAP_WIDTH*MAP_TILE_SIZE,MAP_HEIGHT*MAP_TILE_SIZE);

 // Draw path
 ctx.beginPath();
 for(let i=0;i<PATH.length;i++){
     let [x,y]=PATH[i];
     if(i===0)ctx.moveTo(x*MAP_TILE_SIZE+MAP_TILE_SIZE/2,y*MAP_TILE_SIZE+MAP_TILE_SIZE/2);
     else ctx.lineTo(x*MAP_TILE_SIZE+MAP_TILE_SIZE/2,y*MAP_TILE_SIZE+MAP_TILE_SIZE/2);
 }
 ctx.strokeStyle="#d9bc87";ctx.lineWidth=26;ctx.lineCap="round";ctx.stroke();

 // Path outline
 ctx.beginPath();
 for(let i=0;i<PATH.length;i++){
     let [x,y]=PATH[i];
     if(i===0)ctx.moveTo(x*MAP_TILE_SIZE+MAP_TILE_SIZE/2,y*MAP_TILE_SIZE+MAP_TILE_SIZE/2);
     else ctx.lineTo(x*MAP_TILE_SIZE+MAP_TILE_SIZE/2,y*MAP_TILE_SIZE+MAP_TILE_SIZE/2);
 }
 ctx.strokeStyle="#c29b62";ctx.lineWidth=6;ctx.stroke();

 // Tower spots
 for(let [tx,ty] of TOWER_SPOTS){
     ctx.save();
     ctx.beginPath();
     ctx.arc(tx*MAP_TILE_SIZE+MAP_TILE_SIZE/2,
             ty*MAP_TILE_SIZE+MAP_TILE_SIZE/2,
             MAP_TILE_SIZE*.37,
             0,
             Math.PI*2);
     ctx.fillStyle="#bdeeff";
     ctx.globalAlpha=.95;
     ctx.shadowBlur=4;ctx.shadowColor="#bdeeff";
     ctx.fill();ctx.restore();
 }

 ctx.restore();
}

function drawGame(){
 // Clear canvas
 ctx.clearRect(0,0,canvas.width,canvas.height);

 drawMap();

 // Draw towers under projectiles/enemies for clarity
 for(let t of towers){
     ctx.save();
     // Range indicator (if placing or selected)
     if(gameState==="placing" && placingTowerType && t===selectedTower){
         ctx.beginPath();ctx.arc(t.x,t.y,TOWER_CONFIGS[placingTowerType].range[t.lvl],0,Math.PI*2);
         ctx.strokeStyle="#ebde67";ctx.globalAlpha=.22;ctx.lineWidth=19;ctx.stroke();
         ctx.globalAlpha=.99;
     }
     // Tower base shape
     ctx.beginPath();ctx.arc(t.x,t.y,t.type==="area"?18:t.type==="sniper"?14:t.type==="slow"?14 :13 ,0,Math.PI*2);
     ctx.fillStyle=t.type==="basic"?"#37c":t.type==="sniper"?"#bdf":t.type==="area"?"#fea":t.type==="slow"?"#7cf":"#666";
     ctx.shadowBlur=t.lvl*6+6;ctx.shadowColor="#fff";
     ctx.fill();
     // Tower level ring
     for(let l=0;l<=t.lvl;l++){
         ctx.beginPath();ctx.arc(t.x,t.y,(24+l*5),Math.PI*.18*l,(Math.PI*.18*l)+Math.PI*.56,false);
         ctx.strokeStyle=["#ffe076","#bdcbf7","#ffb347"][l];ctx.lineWidth=l===t.lvl?7 :3;ctx.globalAlpha=.55;l===t.lvl&&(ctx.globalAlpha=.95);ctx.stroke();
     }
     // Tower symbol
     ctx.font=`bold ${t.type==="area"?22:t.type==="sniper"?19:t.type==="slow"?19 :17}px Arial`;
     ctx.fillStyle="#234";
     let syb=t.type==="basic"?"⬤":t.type==="sniper"?"➹":t.type==="area"?"💥":t.type==="slow"?"❄":"?";
     ctx.fillText(syb,t.x-10,t.y+8);
     ctx.restore();
 }

 // Projectiles
 for(let p of projectiles)p.draw(ctx);

 // Enemies on top (for clarity)
 for(let e of enemies)e.draw(ctx);

 // If placing tower show preview + range at mouse pos (handled in mousemove)
}

function gameLoop(){
   if(gameState==="lost")return;

   updateGame(16.67);// ~60fps logic step

   drawGame();

   requestAnimationFrame(gameLoop);
}

// ===== MOUSE / INPUT HANDLING ======
let mouse={x:-99,y:-99};
canvas.addEventListener('mousemove',e=>{
   const rect=canvas.getBoundingClientRect();
   mouse.x=e.clientX-rect.left;
   mouse.y=e.clientY-rect.top;

   if(gameState==="placing" && placingTowerType!==null){
       drawGame();
       // Draw range + ghost tower at mouse pos:
       let cfg=TOWER_CONFIGS[placingTowerType];
       ctx.save();
       ctx.globalAlpha=.19;ctx.beginPath();
       ctx.arc(mouse.x,mouse.y,cfg.range[0],0,Math.PI*2);ctx.fillStyle="#ffe076";ctx.fill();
       ctx.restore();

       ctx.save();ctx.globalAlpha=.52;
       ctx.beginPath();ctx.arc(mouse.x,mouse.y,cfg.range[0]/3.5+11+(cfg.cost/110),0,Math.PI*2);ctx.fillStyle="#236";ctx.fill();
       ctx.restore();

       // Show invalid if not on tower spot or blocked by existing tower:
       let spot=getNearestTowerSpot(mouse.x,mouse.y);
       let occupied=towers.some(t=>dist(t.x,t.y,(spot&&spot[0])||-999,(spot&&spot[1])||-999)<19);
       if(!spot || occupied){
           ctx.save();ctx.globalAlpha=.43;ctx.beginPath();
           ctx.arc(mouse.x,mouse.y,cfg.range[0]/3.5+11+(cfg.cost/110),Math.PI*-.09,(Math.PI*2)-Math.PI*.09);ctx.strokeStyle="#c33";ctx.lineWidth=7;ctx.stroke();ctx.restore();
       }
   }
});

canvas.addEventListener('mouseleave',()=>{mouse.x=-9999;mouse.y=-9999;if(gameState==="placing"){drawGame();}});

canvas.addEventListener('click',e=>{
   const rect=canvas.getBoundingClientRect();
   const mx=e.clientX-rect.left,my=e.clientY-rect.top;

   if(gameState==="placing" && placingTowerType!==null){
       let spot=getNearestTowerSpot(mx,my);
       let occupied=towers.some(t=>dist(t.x,t.y,(spot&&spot[0])||-999,(spot&&spot[1])||-999)<19);
       if(spot && !occupied && gold>=TOWER_CONFIGS[placingTowerType].cost){
           towers.push(new Tower(placingTowerType,
               spot[0]*MAP_TILE_SIZE+MAP_TILE_SIZE/2,
               spot[1]*MAP_TILE_SIZE+MAP_TILE_SIZE/2));
           gold-=TOWER_CONFIGS[placingTowerType].cost;
           goldNumEl.textContent=gold.toString();
           playBeep(1600,.07); 
           gameState="idle";placingTowerType=null;towerBtns.forEach(b=>b.classList.remove("selected"));
           drawGame();return;
       }else{playBeep(320,.04);}
   }else{
       // If clicking an existing tower open upgrade modal:
       for(let t of towers)
         if(dist(mx,my,t.x,t.y)<22){ openUpgradeModal(t); return;}
   }
});

// Get nearest tower spot within threshold px:
function getNearestTowerSpot(x,y){
   for(let [tx,ty] of TOWER_SPOTS){
       let cx=tx*MAP_TILE_SIZE+MAP_TILE_SIZE/2,
           cy=ty*MAP_TILE_SIZE+MAP_TILE_SIZE/2;
       if(dist(x,y,cx,cy)<26)return [tx,ty];
   }return null;
}

// Tower select buttons:
towerBtns.forEach(btn=>{
 btn.onclick=function(){
   towerBtns.forEach(b=>b.classList.remove("selected"));
   btn.classList.add("selected");
   placingTowerType=this.dataset.tower;
   gameState="placing";
 };
});

// Start wave button:
startWaveBtn.onclick=function(){
   if(gameState!=="running" && lives>0 && currentWave<=10){nextWave();}
};

// Upgrade modal handling:
function openUpgradeModal(tower){
 selectedTower=tower;

 upgradeModal.classList.remove("hidden");
 upgradeTitle.textContent=`${TOWER_CONFIGS[tower.type].name} Tower L${tower.lvl+1}`;
 towerStatsDiv.innerHTML=`<b>Damage:</b> ${tower.damage()}<br><b>Range:</b> ${(tower.range()/MAP_TILE_SIZE).toFixed(2)} tiles<br><b>Fire Rate:</b> ${(1/tower.fireRate()).toFixed(2)}/s${tower.type==='area'?`<br><b>Splash:</b> Yes`:''}${tower.type==='slow'?`<br><b>Slow:</b> ${(TOWER_CONFIGS[tower.type].slowAmount[tower.lvl]*100).toFixed(0)}%`:""}<br>`;
 upgradeBtn.style.display=tower.canUpgrade()?"":"none";
 sellBtn.style.display="";
 upgradeBtn.textContent=tower.canUpgrade()?`Upgrade (${TOWER_CONFIGS[tower.type].upgrades[tower.lvl]}G)`:"";
 sellBtn.textContent=`Sell (${TOWER_CONFIGS[tower.type].sell[tower.lvl]}G)`;
 upgradeBtn.disabled=!tower.canUpgrade()||gold<TOWER_CONFIGS[tower.type].upgrades[tower.lvl];
}

// Modal event listeners:
closeUpgradeBtn.onclick=function(){upgradeModal.classList.add("hidden");};
upgradeBtn.onclick=function(){
 if(!selectedTower)return;if(gold<TOWER_CONFIGS[selectedTower.type].upgrades[selectedTower.lvl])return;
 gold-=TOWER_CONFIGS[selectedTower.type].upgrades[selectedTower.lvl];
 selectedTower.lvl++;
 goldNumEl.textContent=gold.toString();
 playBeep(1333,.09);openUpgradeModal(selectedTower);drawGame();
};
sellBtn.onclick=function(){
 gold+=TOWER_CONFIGS[selectedTower.type].sell[selectedTower.lvl];
 towers.splice(towers.indexOf(selectedTower),1);
 goldNumEl.textContent=gold.toString(); selectedTower=null;
 playBeep(330,.09);upgradeModal.classList.add("hidden");drawGame();
};

// Back button restarts game:
document.getElementById('back-btn').onclick=startGame;

// Start initial game:
startGame();
// Main loop:
requestAnimationFrame(gameLoop);

// Shuffle utility for wave spawns:
function shuffle(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}