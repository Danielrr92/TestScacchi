
function togliTutteLePedineDallaScacchiera() {
    const pezzi = document.querySelectorAll('.piece');

    pezzi.forEach((pezzo) => {
        pezzo.parentNode.removeChild(pezzo);
    });
}

function disegnaPezziImgHtml(scacchiera) {
    // Ottieni tutte le caselle della scacchiera
    const caselle = document.querySelectorAll('.square');

    // Attraversa ogni casella e posiziona il pezzo corrispondente
    caselle.forEach((casella) => {
        const [riga, colonna] = convertiPosizioneInIndice(casella.id);
        const pezzo = scacchiera.matrice[riga][colonna];

        if (pezzo) {
            // Aggiungi l'immagine del pezzo come background della casella nel caso in cui esistesse il pezzo su quella casella    
            const htmlPieceImg = document.createElement('img');
            htmlPieceImg.src = getImmagineUrl(pezzo.colore, pezzo.tipo);
            htmlPieceImg.id = pezzo.id;
            htmlPieceImg.classList.add('piece');
            htmlPieceImg.style.draggable = false;
            htmlPieceImg.dataset.dataNome = pezzo.tipo
            casella.appendChild(htmlPieceImg);
        }
    });
}

// Metodo per convertire una posizione nella notazione 'a1' in un indice di matrice [riga][colonna]
function convertiPosizioneInIndice(posizione) {
    const colonna = posizione.charCodeAt(0) - 'a'.charCodeAt(0);
    const riga = 8 - parseInt(posizione[1]);

    // Verifica i limiti della scacchiera
    if (colonna < 0 || colonna >= 8 || riga < 0 || riga >= 8) {
        throw new Error('Posizione non valida sulla scacchiera.');
    }

    return [riga, colonna];
}

// Metodo per convertire un indice di matrice [riga][colonna] in una posizione nella notazione 'a1'
function convertiIndiceInPosizione(riga, colonna) {
    // Verifica i limiti della scacchiera
    if (riga < 0 || riga >= 8 || colonna < 0 || colonna >= 8) {
        throw new Error('Indice della scacchiera non valido.');
    }

    const colonnaChar = String.fromCharCode(colonna + 'a'.charCodeAt(0));
    const rigaNum = 8 - riga;

    return colonnaChar + rigaNum;
}


function getImmagineUrl(colore, tipo) {
    // Costruisci il percorso dell'immagine del pezzo
    return `./img/${colore}_${tipo}.png`; 
}
