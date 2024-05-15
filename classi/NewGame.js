class NewGame {

    constructor() {
        this.scacchiera = new Scacchiera();
    }

    start() {

        //creo la scacchiera che è una matrice 8x8 con all'interno posizionati gli oggetti Pezzi(Pedoni, Cavalli, Torri ecc..)
        this.scacchiera.generaPosizioneInizialeScacchiera();

        //disegno in html i vari pezzi seguendo come sono posizionati nella matrice scacchiera        
        this.disegnaPezziImgHtml(this.scacchiera);

        //eventi mouse per il trascinamento dei pezzi e per poter effettuare la mossa ( per ora non è possibile effettuare la mossa tramite il click del mouse sul pezzo seguito dal click sulla casella destinazione)
        inizializzaGestoriEventiMouse(this.scacchiera);
    }

    disegnaPezziImgHtml() {
        // Ottieni tutte le caselle della scacchiera
        const caselle = document.querySelectorAll('.square');

        // Attraversa ogni casella e posiziona il pezzo corrispondente
        caselle.forEach((casella) => {
            const pezzo = this.scacchiera.ottieniPezzo(casella.id);
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