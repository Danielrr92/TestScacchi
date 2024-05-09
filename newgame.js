
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
                // Aggiungi l'immagine del pezzo come background della casella nel caso in cui esistesse il pezzo su quella casella    
                casella.appendChild(this.creaImgPezzo(pezzo, casella));         
            }
        });
    }

    creaImgPezzo(pezzo) {
        const htmlPieceImg = document.createElement('img');
        htmlPieceImg.src = pezzo.getImmagineUrl();
        htmlPieceImg.id = pezzo.id;
        htmlPieceImg.classList.add('piece');
        htmlPieceImg.style.position = 'absolute';
        htmlPieceImg.style.maxWidth = `80px`;
        htmlPieceImg.style.maxHeight = `80px`;
        htmlPieceImg.style.zIndex = 1000;
        htmlPieceImg.style.draggable = false;
        htmlPieceImg.style.cursor = 'grab';
        htmlPieceImg.dataset.dataNome = pezzo.tipo
        return htmlPieceImg;
    }

}
