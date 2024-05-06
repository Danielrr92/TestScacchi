try {
  let isDragging = false;
  var initialPosition = null;
  var currentPosition = null;

  document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');

    //questa starting position è per assegnare i pezzi utilizzando il posizionamento assoluto ma gli elementi devono già trovarsi come immagini sullo schermo
    const startingPositions = {
      // Pezzi e le loro posizioni iniziali
      //pedoni bianchi
      "pawn_w_a2": "square_a2",
      "pawn_w_b2": "square_b2",
      "pawn_w_c2": "square_c2",
      "pawn_w_d2": "square_d2",
      "pawn_w_e2": "square_e2",
      "pawn_w_f2": "square_f2",
      "pawn_w_g2": "square_g2",
      "pawn_w_h2": "square_h2",
      //pezzi bianchi
      "rook_w_a1": "square_a1",
      "knight_w_b1": "square_b1",
      "bishop_w_c1": "square_c1",
      "queen_w_d1": "square_d1",
      "king_w_e1": "square_e1",
      "bishop_w_f1": "square_f1",
      "knight_w_g1": "square_g1",
      "rook_w_h1": "square_h1",

      //pedoni neri
      "pawn_b_a7": "square_a7",
      "pawn_b_b7": "square_b7",
      "pawn_b_c7": "square_c7",
      "pawn_b_d7": "square_d7",
      "pawn_b_e7": "square_e7",
      "pawn_b_f7": "square_f7",
      "pawn_b_g7": "square_g7",
      "pawn_b_h7": "square_h7",
      //pezzi neri
      "rook_b_a8": "square_a8",
      "knight_b_b8": "square_b8",
      "bishop_b_c8": "square_c8",
      "queen_b_d8": "square_d8",
      "king_b_e8": "square_e8",
      "bishop_b_f8": "square_f8",
      "knight_b_g8": "square_g8",
      "rook_b_h8": "square_h8",
    };



    const urlPics = {
      // Pezzi e le loro posizioni iniziali
      //pedoni bianchi
      'pawn_w_a2': 'img/white_pawn.png',
      'pawn_w_b2': 'img/white_pawn.png',
      'pawn_w_c2': 'img/white_pawn.png',
      'pawn_w_d2': 'img/white_pawn.png',
      'pawn_w_e2': 'img/white_pawn.png',
      'pawn_w_f2': 'img/white_pawn.png',
      'pawn_w_g2': 'img/white_pawn.png',
      'pawn_w_h2': 'img/white_pawn.png',

      //pezzi bianchi
      'rook_w_a1': 'img/white_rook.png',
      'knight_w_b1': 'img/white_knight.png',
      'bishop_w_c1': 'img/white_bishop.png',
      'queen_w_d1': 'img/white_queen.png',
      'king_w_e1': 'img/white_king.png',
      'bishop_w_f1': 'img/white_bishop.png',
      'knight_w_g1': 'img/white_knight.png',
      'rook_w_h1': 'img/white_rook.png',

      //pedoni neri
      'pawn_b_a7': 'img/black_pawn.png',
      'pawn_b_b7': 'img/black_pawn.png',
      'pawn_b_c7': 'img/black_pawn.png',
      'pawn_b_d7': 'img/black_pawn.png',
      'pawn_b_e7': 'img/black_pawn.png',
      'pawn_b_f7': 'img/black_pawn.png',
      'pawn_b_g7': 'img/black_pawn.png',
      'pawn_b_h7': 'img/black_pawn.png',

      //pezzi neri
      'rook_b_a8': 'img/black_rook.png',
      'knight_b_b8': 'img/black_knight.png',
      'bishop_b_c8': 'img/black_bishop.png',
      'queen_b_d8': 'img/black_queen.png',
      'king_b_e8': 'img/black_king.png',
      'bishop_b_f8': 'img/black_bishop.png',
      'knight_b_g8': 'img/black_knight.png',
      'rook_b_h8': 'img/black_rook.png',
    };



    //i pezzi hanno la casella in startingPosition e i pezzi hanno il path in urlPics
    for (let pieceId in startingPositions) {
      const square = document.getElementById(startingPositions[pieceId]);
      const piece = document.createElement('img');
      piece.src = urlPics[pieceId];
      piece.classList.add('piece');
      piece.id = pieceId;
      piece.style.position = 'absolute';
      piece.style.maxWidth = `80px`;
      piece.style.maxHeight = `80px`;
      piece.style.position = 'absolute';
      piece.style.zIndex = 1000;
      piece.style.cursor = 'grab';
      piece.draggable = "true"
      square.appendChild(piece);
    }


    const pieces = document.querySelectorAll('.piece');
    //starting position mettendo le immagini dei pezzi come background delle caselle
    // const startingPositions = {
    //   // Pezzi e le loro posizioni iniziali
    //   //pedoni bianchi
    //   'square_a2': 'img/white_pawn.png',
    //   'square_b2': 'img/white_pawn.png',
    //   'square_c2': 'img/white_pawn.png',
    //   'square_d2': 'img/white_pawn.png',
    //   'square_e2': 'img/white_pawn.png',
    //   'square_f2': 'img/white_pawn.png',
    //   'square_g2': 'img/white_pawn.png',
    //   'square_h2': 'img/white_pawn.png',

    //   //pezzi bianchi
    //   'square_a1': 'img/white_rook.png',
    //   'square_b1': 'img/white_knight.png',
    //   'square_c1': 'img/white_bishop.png',
    //   'square_d1': 'img/white_queen.png',
    //   'square_e1': 'img/white_king.png',
    //   'square_f1': 'img/white_bishop.png',
    //   'square_g1': 'img/white_knight.png',
    //   'square_h1': 'img/white_rook.png',

    //  //pedoni neri
    //  'square_a7': 'img/black_pawn.png',
    //  'square_b7': 'img/black_pawn.png',
    //  'square_c7': 'img/black_pawn.png',
    //  'square_d7': 'img/black_pawn.png',
    //  'square_e7': 'img/black_pawn.png',
    //  'square_f7': 'img/black_pawn.png',
    //  'square_g7': 'img/black_pawn.png',
    //  'square_h7': 'img/black_pawn.png',

    //   //pezzi neri
    //   'square_a8': 'img/black_rook.png',
    //   'square_b8': 'img/black_knight.png',
    //   'square_c8': 'img/black_bishop.png',
    //   'square_d8': 'img/black_queen.png',
    //   'square_e8': 'img/black_king.png',
    //   'square_f8': 'img/black_bishop.png',
    //   'square_g8': 'img/black_knight.png',
    //   'square_h8': 'img/black_rook.png',
    // };

    // squares.forEach(function(square) {
    //   var squareId = square.id;
    //   if (startingPositions.hasOwnProperty(squareId)) {
    //     square.style.backgroundImage = 'url(' + startingPositions[squareId] + ')';
    //     square.style.backgroundSize = 'cover';
    //   }
    // });

    pieces.forEach(piece => {
      piece.addEventListener('mousedown', (e) => {
        isDragging = true;
        piece.style.cursor = 'grabbing';

        initialPosition = {
          left: piece.style.left,
          top: piece.style.top
        };

        function onMouseMove(event) {
          if (isDragging) {
            piece.style.left = `${event.pageX - piece.offsetWidth / 2}px`;
            piece.style.top = `${event.pageY - piece.offsetHeight / 2}px`;
          }

        }

        document.addEventListener('mousemove', onMouseMove);

        piece.onmouseup = function () {
          isDragging = false;
          document.removeEventListener('mousemove', onMouseMove);
          piece.onMouseMove = null;
          piece.style.cursor = 'grab';

          // Calcola la casella di destinazione
          const pieceRect = piece.getBoundingClientRect();
          squares.forEach(square => {
            const squareRect = square.getBoundingClientRect();
            if ((pieceRect.left + ((pieceRect.right - pieceRect.left) / 2)) > squareRect.left &&
              (pieceRect.right - ((pieceRect.right - pieceRect.left) / 2)) < squareRect.right &&
              (pieceRect.top + ((pieceRect.bottom - pieceRect.top) / 2)) > squareRect.top &&
              (pieceRect.bottom - ((pieceRect.bottom - pieceRect.top) / 2)) < squareRect.bottom) {
              //prima controllo se la casella è libera, altrimenti non è possibile effettuare la mossa
              let newSquare = square;
              if () {
                //rimetto il pezzo nella posizione dove si trovava
                resetPiecePosition(piece);
              }
              else {
                movePieceToTargetSquare(piece, squareRect, square);
              }
            }
          });
        };
      });

      piece.ondragstart = function () {
        return false;
      };
      piece.ondrag
    });
  });

} catch (error) {
  console.error(error);
  // Expected output: ReferenceError: nonExistentFunction is not defined
  // (Note: the exact output may be browser-dependent)
}

// Funzione per reimpostare la posizione del pezzo alla posizione iniziale
function resetPiecePosition(piece) {
  // Reimposta le coordinate del pezzo alla posizione iniziale
  piece.style.left = initialPosition.left;
  piece.style.top = initialPosition.top;
}

// Funzione per spostare il pezzo nella casella di destinazione
function movePieceToTargetSquare(piece, squareRect, square) {
  // Posiziona l'immagine del pezzo all'interno della casella
  piece.style.left = `${squareRect.left}px`;
  piece.style.top = `${squareRect.top}px`;

  // Rimuovi l'immagine dalla posizione iniziale se non è già stata spostata
  if (!piece.getAttribute('data-dragged')) {
    piece.parentNode.removeChild(piece);
    square.appendChild(piece);
  }
  //la casella di partenza che prima era occupata ora è libera, devo togliere la classe occupied
  let startingSquare = document.getElementById(piecesPositionsDuringGame[piece.id]);
  startingSquare.classList.remove("occupata");

  let arrivingSquare = document.getElementById(square.id);
  arrivingSquare.classList.add("occupata");
  piecesPositionsDuringGame[piece.id] = square.id;
}

let piecesPositionsDuringGame = {
  // Pezzi e le loro posizioni iniziali
  //pedoni bianchi
  "pawn_w_a2": "square_a2",
  "pawn_w_b2": "square_b2",
  "pawn_w_c2": "square_c2",
  "pawn_w_d2": "square_d2",
  "pawn_w_e2": "square_e2",
  "pawn_w_f2": "square_f2",
  "pawn_w_g2": "square_g2",
  "pawn_w_h2": "square_h2",
  //pezzi bianchi
  "rook_w_a1": "square_a1",
  "knight_w_b1": "square_b1",
  "bishop_w_c1": "square_c1",
  "queen_w_d1": "square_d1",
  "king_w_e1": "square_e1",
  "bishop_w_f1": "square_f1",
  "knight_w_g1": "square_g1",
  "rook_w_h1": "square_h1",

  //pedoni neri
  "pawn_b_a7": "square_a7",
  "pawn_b_b7": "square_b7",
  "pawn_b_c7": "square_c7",
  "pawn_b_d7": "square_d7",
  "pawn_b_e7": "square_e7",
  "pawn_b_f7": "square_f7",
  "pawn_b_g7": "square_g7",
  "pawn_b_h7": "square_h7",
  //pezzi neri
  "rook_b_a8": "square_a8",
  "knight_b_b8": "square_b8",
  "bishop_b_c8": "square_c8",
  "queen_b_d8": "square_d8",
  "king_b_e8": "square_e8",
  "bishop_b_f8": "square_f8",
  "knight_b_g8": "square_g8",
  "rook_b_h8": "square_h8",
};

function isLegalMove(piece, newSquare) {
  let isLegal = true;
  if (square.classList.contains('occupata')) {
    isLegal = false
    //controllo se può mangiare, se si è legale e devo far sparire il pezzo mangiato dalla casella dove sto mettendo il mio pezzo
  }

  return isLegal

}

function canPieceMoveLikeThat(piece, newSquare) {
  switch (piece) {
    case 'valore1':
      // Codice da eseguire se valore è uguale a 'valore1'
      console.log('Il valore è valore1');
      break;
    case 'valore2':
      // Codice da eseguire se valore è uguale a 'valore2'
      console.log('Il valore è valore2');
      break;
    case 'valore3':
      // Codice da eseguire se valore è uguale a 'valore3'
      console.log('Il valore è valore3');
      break;
    default:
      // Codice da eseguire se nessun caso corrisponde
      console.log('Valore non riconosciuto');
      break;
  }
}

function getPieceType(piece) {
  let type = '';
  switch (piece.id) {
    case "pawn_w_a2", "pawn_w_b2", "pawn_w_c2", "pawn_w_d2", "pawn_w_e2", "pawn_w_f2", "pawn_w_g2", "pawn_w_h2", "pawn_b_a7","pawn_b_b7","pawn_b_c7","pawn_b_d7","pawn_b_e7","pawn_b_f7","pawn_b_g7","pawn_b_h7":
      // Codice da eseguire se valore è uguale a 'valore1'
      type = 'pedone';
      break;
    case 'rook_w_a1','rook_w_h1','rook_b_a8','rook_b_a8':
      // Codice da eseguire se valore è uguale a 'valore2'
      console.log('Il valore è valore2');
      break;
    case 'valore3':
      // Codice da eseguire se valore è uguale a 'valore3'
      console.log('Il valore è valore3');
      break;
    default:
      // Codice da eseguire se nessun caso corrisponde
      console.log('Valore non riconosciuto');
      break;
  }
}