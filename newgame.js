
// Utilizzo delle classi Pezzo e Scacchiera per generare una nuova partita e disegnare i pezzi
class newGame{

    constructor() {
        scacchiera = new Scacchiera();

        scacchiera.generaPosizioneInizialePezziMatrice();
    
        scacchiera.disegnaPezziImgHtml(scacchiera);
    
        inizializzaGestoriEventiMouse(scacchiera);
    }
   
    disegnaPezziImgHtml(scacchiera) {
        // Ottieni tutte le caselle della scacchiera
        const caselle = document.querySelectorAll('.square');

        // Attraversa ogni casella e posiziona il pezzo corrispondente
        caselle.forEach((casella) => {
            const pezzo = this.scacchiera.ottieniPezzo(casella.id);
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
