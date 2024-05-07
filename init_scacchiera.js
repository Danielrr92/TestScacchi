
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

  
    //posizionamento dei pezzi sulla scacchiera nella posizione iniziale
    //i pezzi hanno la casella in startingPosition e i pezzi hanno il path in urlPics
    function generaScacchieraIniziale(){
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
      
      
          const squares = document.querySelectorAll('.square');
          const pieces = document.querySelectorAll('.piece');
      
      
          pieces.forEach(piece => {
            piece.addEventListener('mousedown', (e) => {
              e.preventDefault();
              isDragging = true;
              console.log('drag iniziato pezzo: ' + piece.id)
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
                console.log('drag terminato pezzo: ' + piece.id)
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
                    //ho trovato la casella nella quale voglio muovere il mio pezzo
                    //prima controllo se la casella è libera, altrimenti non è possibile effettuare la mossa
                    let newSquare = square;
                    if (!isLegalMove(piece, newSquare)) {
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
    }
    

  function getPieceType(piece) {
    let type = '';
    if (piece.id.includes("pawn")){
      type = 'pawn'; 
    }
    return type;
  }
