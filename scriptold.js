document.addEventListener('DOMContentLoaded', () => {
  generaScacchieraIniziale();
  
});

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

function isLegalMove(piece, newSquare) {
  let isLegal = true;
  if (newSquare.classList.contains('occupata')) {
    isLegal = false
    //controllo se può mangiare, se si è legale e devo far sparire il pezzo mangiato dalla casella dove sto mettendo il mio pezzo
  }
  if (!canPieceMoveLikeThat(piece, newSquare)){
    isLegal = false;
  }
  return isLegal

}

function canPieceMoveLikeThat(piece, newSquare) {
  let result = false;
  switch (getPieceType(piece)) {       // Codice da eseguire se valore è uguale a 'valore1'
    case 'pawn':
      // verifico se è la prima mossa del pedone
      console.log('sto muovendo un pedone');
      if (firstTimePawn(piece)){
        if(mossaDiPedone(true, piece, newSquare)){
          result = true;
        }
      }
      else{
        if(mossaDiPedone(false, piece, newSquare)){
          result = true;
        }
      }
      break;
    case 'torre':
      // Codice da eseguire se valore è uguale a 'valore2'
      console.log('Il valore è valore2');
      break;
    case 're':
      // Codice da eseguire se valore è uguale a 'valore3'
      console.log('Il valore è valore3');
      break;
    default:
      // Codice da eseguire se nessun caso corrisponde
      console.log('Valore non riconosciuto');
      break;
  }
  return result;
}



function firstTimePawn(piece){
  let isFirstTimeMove = false;
  let pos_now = piecesPositionsDuringGame[piece.id];
  let init_pos = startingPositions[piece.id];

  if (pos_now == init_pos){
    isFirstTimeMove = true
  } 
  return isFirstTimeMove;
}


function mossaDiPedone(isFirstTimeMove, piece, newSquare){
  let possoMuovereIlPedone = false;
  //calcolare se il pezzo è bianco o nero
  //1) il pedone è bianco - devo aggiungere 1 al numero della riga della casa
  //2) il pedone è nero - devo sottrarre 1 al numero della riga della casa 
  //3) casi particolari caselle 8 e 1 Promozione
    if (piece.id.includes("_w_")){
      let nomeCasellaAttuale = piecesPositionsDuringGame[piece.id]
      let numeroTraversa = nomeCasellaAttuale.charAt(nomeCasellaAttuale.length - 1);
      let numeroIntero = parseInt(numeroTraversa, 10);
      let numeroNuovaTraversa = numeroIntero + 1;
      let nuovaCasellaPossibile = nomeCasellaAttuale.slice(0, -1)
      nuovaCasellaPossibile = nuovaCasellaPossibile.concat(numeroNuovaTraversa)

      if (newSquare.id == nuovaCasellaPossibile)
        possoMuovereIlPedone=true

    }
    else{

    }
    return possoMuovereIlPedone;
}

















