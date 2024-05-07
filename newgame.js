
// Utilizzo delle classi Pezzo e Scacchiera per generare una nuova partita e disegnare i pezzi
class newGame {

    constructor() {

    }

    start() {
        //creo la scacchiera che è una matrice 8x8 con all'interno posizionati gli oggetti Pezzi(Pedoni, Cavalli, Torri ecc..)
        //dopodichè disegno in html i vari pezzi seguendo come sono posizionati nella matrice scacchiera
        this.scacchiera = new Scacchiera();
        this.disegnaPezziImgHtml(this.scacchiera);

        inizializzaGestoriEventiMouse(this.scacchiera);
    }

    disegnaPezziImgHtml(scacchiera) {
        // Ottieni tutte le caselle della scacchiera
        const caselle = document.querySelectorAll('.square');

        // Attraversa ogni casella e posiziona il pezzo corrispondente
        caselle.forEach((casella) => {
            const pezzo = scacchiera.ottieniPezzo(casella.id);
            if (pezzo) {
                // Aggiungi l'immagine del pezzo come background della casella
                const piece = document.createElement('img');
                piece.src = pezzo.getImmagineUrl();
                piece.classList.add('piece');
                piece.id = pezzo.descrizione();
                piece.style.position = 'absolute';
                piece.style.maxWidth = `80px`;
                piece.style.maxHeight = `80px`;
                piece.style.zIndex = 1000;
                piece.style.cursor = 'grab';
                piece.dataset.dataNome = pezzo.tipo
                casella.appendChild(piece);
            }
        });
    }

}
