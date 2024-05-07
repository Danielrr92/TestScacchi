<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scacchiera Interattiva</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div class="board bordoScacchiera">
    <div class="row">
      <!-- 8 -->
      <div class="square light" id="a8"></div>
      <div class="square dark" id="b8"></div>
      <div class="square light" id="c8"></div>
      <div class="square dark" id="d8"></div>
      <div class="square light" id="e8"></div>
      <div class="square dark" id="f8"></div>
      <div class="square light" id="g8"></div>
      <div class="square dark" id="h8"></div>
    </div>
    <div class="row">
      <!-- 7 -->
      <div class="square dark" id="a7"></div>
      <div class="square light" id="b7"></div>
      <div class="square dark" id="c7"></div>
      <div class="square light" id="d7"></div>
      <div class="square dark" id="e7"></div>
      <div class="square light" id="f7"></div>
      <div class="square dark" id="g7"></div>
      <div class="square light" id="h7"></div>
    </div>
    <div class="row">
      <!-- 6 -->
      <div class="square light" id="a6"></div>
      <div class="square dark" id="b6"></div>
      <div class="square light" id="c6"></div>
      <div class="square dark" id="d6"></div>
      <div class="square light" id="e6"></div>
      <div class="square dark" id="f6"></div>
      <div class="square light" id="g6"></div>
      <div class="square dark" id="h6"></div>
    </div>
    <div class="row">
      <!-- 5 -->
      <div class="square dark" id="a5"></div>
      <div class="square light" id="b5"></div>
      <div class="square dark" id="c5"></div>
      <div class="square light" id="d5"></div>
      <div class="square dark" id="e5"></div>
      <div class="square light" id="f5"></div>
      <div class="square dark" id="g5"></div>
      <div class="square light" id="h5"></div>
    </div>
    <div class="row">
      <!-- 4 -->
      <div class="square light" id="a4"></div>
      <div class="square dark" id="b4"></div>
      <div class="square light" id="c4"></div>
      <div class="square dark" id="d4"></div>
      <div class="square light" id="e4"></div>
      <div class="square dark" id="f4"></div>
      <div class="square light" id="g4"></div>
      <div class="square dark" id="h4"></div>
    </div>
    <div class="row">
      <!-- 3 -->
      <div class="square dark" id="a3"></div>
      <div class="square light" id="b3"></div>
      <div class="square dark" id="c3"></div>
      <div class="square light" id="d3"></div>
      <div class="square dark" id="e3"></div>
      <div class="square light" id="f3"></div>
      <div class="square dark" id="g3"></div>
      <div class="square light" id="h3"></div>
    </div>
    <div class="row">
      <!-- 2 -->
      <div class="square light" id="a2"></div>
      <div class="square dark" id="b2"></div>
      <div class="square light" id="c2"></div>
      <div class="square dark" id="d2"></div>
      <div class="square light" id="e2"></div>
      <div class="square dark" id="f2"></div>
      <div class="square light" id="g2"></div>
      <div class="square dark" id="h2"></div>
    </div>
    <div class="row">
      <!-- 1 -->
      <div class="square dark" id="a1"></div>
      <div class="square light" id="b1"></div>
      <div class="square dark" id="c1"></div>
      <div class="square light" id="d1"></div>
      <div class="square dark" id="e1"></div>
      <div class="square light" id="f1"></div>
      <div class="square dark" id="g1"></div>
      <div class="square light" id="h1"></div>
    </div>
  </div>

  <script src="classi/Pezzo.js"></script>
  <script src="classi/Pedone.js"></script>
  <script src="classi/Torre.js"></script>
  <script src="classi/Cavallo.js"></script>
  <script src="classi/Alfiere.js"></script>
  <script src="classi/Regina.js"></script>
  <script src="classi/Re.js"></script>
  <script src="classi/Scacchiera.js"></script>
  <script src="GestoreEventiMouse.js"></script>
  <script src="NewGame.js"></script>  
  <script src="Scacchi.js"></script>
</body>

</html>