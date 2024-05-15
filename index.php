<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scacchiera Interattiva</title>
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
</head>

<body>

  <div class="board bordoScacchiera">
    <div class="chessBoardRow">
      <!-- 8 -->
      <div class="square light" id="A8"></div>
      <div class="square dark" id="B8"></div>
      <div class="square light" id="C8"></div>
      <div class="square dark" id="D8"></div>
      <div class="square light" id="E8"></div>
      <div class="square dark" id="F8"></div>
      <div class="square light" id="G8"></div>
      <div class="square dark" id="H8"></div>
    </div>
    <div class="chessBoardRow">
      <!-- 7 -->
      <div class="square dark" id="A7"></div>
      <div class="square light" id="B7"></div>
      <div class="square dark" id="C7"></div>
      <div class="square light" id="D7"></div>
      <div class="square dark" id="E7"></div>
      <div class="square light" id="F7"></div>
      <div class="square dark" id="G7"></div>
      <div class="square light" id="H7"></div>
    </div>
    <div class="chessBoardRow">
      <!-- 6 -->
      <div class="square light" id="A6"></div>
      <div class="square dark" id="B6"></div>
      <div class="square light" id="C6"></div>
      <div class="square dark" id="D6"></div>
      <div class="square light" id="E6"></div>
      <div class="square dark" id="F6"></div>
      <div class="square light" id="G6"></div>
      <div class="square dark" id="H6"></div>
    </div>
    <div class="chessBoardRow">
      <!-- 5 -->
      <div class="square dark" id="A5"></div>
      <div class="square light" id="B5"></div>
      <div class="square dark" id="C5"></div>
      <div class="square light" id="D5"></div>
      <div class="square dark" id="E5"></div>
      <div class="square light" id="F5"></div>
      <div class="square dark" id="G5"></div>
      <div class="square light" id="H5"></div>
    </div>
    <div class="chessBoardRow">
      <!-- 4 -->
      <div class="square light" id="A4"></div>
      <div class="square dark" id="B4"></div>
      <div class="square light" id="C4"></div>
      <div class="square dark" id="D4"></div>
      <div class="square light" id="E4"></div>
      <div class="square dark" id="F4"></div>
      <div class="square light" id="G4"></div>
      <div class="square dark" id="H4"></div>
    </div>
    <div class="chessBoardRow">
      <!-- 3 -->
      <div class="square dark" id="A3"></div>
      <div class="square light" id="B3"></div>
      <div class="square dark" id="C3"></div>
      <div class="square light" id="D3"></div>
      <div class="square dark" id="E3"></div>
      <div class="square light" id="F3"></div>
      <div class="square dark" id="G3"></div>
      <div class="square light" id="H3"></div>
    </div>
    <div class="chessBoardRow">
      <!-- 2 -->
      <div class="square light" id="A2"></div>
      <div class="square dark" id="B2"></div>
      <div class="square light" id="C2"></div>
      <div class="square dark" id="D2"></div>
      <div class="square light" id="E2"></div>
      <div class="square dark" id="F2"></div>
      <div class="square light" id="G2"></div>
      <div class="square dark" id="H2"></div>
    </div>
    <div class="chessBoardRow">
      <!-- 1 -->
      <div class="square dark" id="A1"></div>
      <div class="square light" id="B1"></div>
      <div class="square dark" id="C1"></div>
      <div class="square light" id="D1"></div>
      <div class="square dark" id="E1"></div>
      <div class="square light" id="F1"></div>
      <div class="square dark" id="G1"></div>
      <div class="square light" id="H1"></div>
    </div>
  </div>
  
  <script src="Utility/Costanti.js"></script>
  <script src="classiPezzi/Pezzo.js"></script>
  <script src="classiPezzi/Pedone.js"></script>
  <script src="classiPezzi/Torre.js"></script>
  <script src="classiPezzi/Cavallo.js"></script>
  <script src="classiPezzi/Alfiere.js"></script>
  <script src="classiPezzi/Regina.js"></script>
  <script src="classiPezzi/Re.js"></script>
  <script src="classi/Mossa.js"></script>
  <script src="classi/SerieDiMosse.js"></script>
  <script src="classi/Scacchiera.js"></script>
  <script src="classi/Checks.js"></script>
  <script src="classi/MovimentoPezzi.js"></script>
  <script src="classi/NewGame.js"></script>
  <script src="Scacchi.js"></script>
</body>

</html>