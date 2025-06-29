<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Crabada Defense</title>
  <meta name="viewport" content="width=540, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="game-container">
    <!-- Top Bar -->
    <div id="top-bar">
      <button id="back-btn" title="Back">&#8592;</button>
      <span id="game-title">Crabada Defense</span>
      <button id="sound-btn" title="Toggle Sound">&#128266;</button>
    </div>
    <!-- Info Panel -->
    <div id="info-panel">
      <div>Wave: <span id="wave-num">1</span>/10</div>
      <div>Lives: <span id="lives-num">20</span></div>
      <div>Gold: <span id="gold-num">500</span></div>
    </div>
    <!-- Towers Panel -->
    <div id="towers-panel">
      <div class="panel-title">Towers</div>
      <button class="tower-btn" data-tower="basic">Basic<br><span>100</span></button>
      <button class="tower-btn" data-tower="sniper">Sniper<br><span>200</span></button>
      <button class="tower-btn" data-tower="area">Area<br><span>300</span></button>
      <button class="tower-btn" data-tower="slow">Slow<br><span>150</span></button>
      <button id="start-wave-btn">Start Wave</button>
    </div>
    <!-- Game Canvas -->
    <div id="canvas-container">
      <canvas id="game-canvas" width="540" height="960"></canvas>
    </div>
    <!-- Upgrade/Sell Modal -->
    <div id="upgrade-modal" class="hidden">
      <div id="upgrade-panel">
        <h2 id="upgrade-title"></h2>
        <div id="tower-stats"></div>
        <button id="upgrade-btn"></button>
        <button id="sell-btn"></button>
        <button id="close-upgrade-btn">Close</button>
      </div>
    </div>
  </div>
  <script src="maingame.js"></script>
</body>
</html>