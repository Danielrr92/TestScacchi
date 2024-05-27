function togliTutteLePedineDallaScacchiera() {
    const pezzi = document.querySelectorAll('.piece');

    pezzi.forEach((pezzo) => {
        pezzo.parentNode.removeChild(pezzo);
    });
}

function disegnaPezziImgHtml(scacchiera, colore) {
    //istruzioni per la visione della scacchiera da nero
    const scacchieraElement = document.getElementById('scacchiera');
    const rowScacchiera = document.querySelectorAll('.row-Scacchiera');
    if (colore == COLOR_BLACK) {
        scacchieraElement.classList.add('black');
        rowScacchiera.forEach((riga) => riga.classList.add('black'))
    } else {
        scacchieraElement.classList.remove('black');
        rowScacchiera.forEach((riga) => riga.classList.remove('black'))
    }

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
            htmlPieceImg.dataset.nome = pezzo.tipo;
            htmlPieceImg.dataset.colore = pezzo.colore;
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

function eseguiMossaGraficamente(scacchiera, mossa) {
    //invece che riaggiornare tutta la scacchiera, eseguo a livello grafico solamente la mossa effettuata
    //gli id delle img dei pezzi sono gli stessi degli id dei pezzi sulla classe scacchiera quindi

    const divCasellaPartenza = document.getElementById(mossa.casellaPartenza);
    const divCasellaDestinazione = document.getElementById(mossa.casellaDestinazione);


    if (scacchiera.pezzoMangiato) {
        const imgPezzoMangiato = document.getElementById(scacchiera.pezzoMangiato.id);
        //elimino il pezzo mangiato dal DOM
        divCasellaDestinazione.removeChild(imgPezzoMangiato);
    }

    if (mossa.isArrocco) {
        // quando l'avversario esegue arrocco, oltre a muovere il re devo muovere anche la torre quindi:
        //a seconda della posizione in cui va il re capisco di che arrocco si tratta, la posizione della torre da spostare la conosco per forza perchè se non fosse stata spostata anche solo una volta non sarebbe stato possibile arroccare
        let divTorrePrimaDiArroccare;
        let divTorreArroccata;
        let imgTorreArrocco;
        switch (mossa.casellaDestinazione) {
            case "g1":
                //arrocco corto del bianco, la torre va in f1
                divTorrePrimaDiArroccare = document.getElementById('h1');
                divTorreArroccata = document.getElementById('f1');
                imgTorreArrocco = document.getElementById('WhiteRookh1');
                break;
            case "c1":
                //arrocco lungo del bianco, la torre va in d1
                divTorrePrimaDiArroccare = document.getElementById('a1');
                divTorreArroccata = document.getElementById('d1');
                imgTorreArrocco = document.getElementById('WhiteRooka1');
                break;
            case "g8":
                //arrocco corto del nero, la torre va in f8
                divTorrePrimaDiArroccare = document.getElementById('h8');
                divTorreArroccata = document.getElementById('f8');
                imgTorreArrocco = document.getElementById('BlackRookh8');
                break;
            case "c8":
                //arrocco lungo del nero, la torre va in d8
                divTorrePrimaDiArroccare = document.getElementById('a8');
                divTorreArroccata = document.getElementById('d8');
                imgTorreArrocco = document.getElementById('BlackRooka8');
                break;
        }
        divTorrePrimaDiArroccare.removeChild(imgTorreArrocco);
        divTorreArroccata.appendChild(imgTorreArrocco);
    }

    const pezzoSelezionato = document.getElementById(mossa.pezzo.id);
    //sposto il pezzo graficamente sul DOM
    divCasellaPartenza.removeChild(pezzoSelezionato);
    divCasellaDestinazione.appendChild(pezzoSelezionato);
}