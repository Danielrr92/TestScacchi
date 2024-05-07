class Scacchiera {
    constructor() {
        // Inizializzazione della scacchiera con una matrice di pezzi vuota
        this.matrice = Array(8).fill(null).map(() => Array(8).fill(null));
    }

    // Metodo per posizionare un pezzo nella scacchiera
    posizionaPezzo(pezzo) {
        
        this.matrice[riga][colonna] = pezzo;
    }

    // Metodo per ottenere il pezzo in una determinata posizione della scacchiera
    ottieniPezzo(riga, colonna) {
        return this.matrice[riga][colonna];
    }

    // Metodo per generare la disposizione iniziale dei pezzi sulla scacchiera
    generaPosizioneInizialePezziMatrice() {
        // Pezzi bianchi
        this.posizionaPezzo(new Pedone('white', 'a2'));
        this.posizionaPezzo(new Pedone('white', 'b2'));
        this.posizionaPezzo(new Pedone('white', 'c2'));
        this.posizionaPezzo(new Pedone('white', 'd2'));
        this.posizionaPezzo(new Pedone('white', 'e2'));
        this.posizionaPezzo(new Pedone('white', 'f2'));
        this.posizionaPezzo(new Pedone('white', 'g2'));
        this.posizionaPezzo(new Pedone('white', 'h2'));

        this.posizionaPezzo(new Torre('white', 'a1'));
        this.posizionaPezzo(new Cavallo('white', 'b1'));
        this.posizionaPezzo(new Alfiere('white', 'c1'));
        this.posizionaPezzo(new Regina('white', 'd1'));
        this.posizionaPezzo(new Re('white', 'e1'));
        this.posizionaPezzo(new Alfiere('white', 'f1'));
        this.posizionaPezzo(new Cavallo('white', 'g1'));
        this.posizionaPezzo(new Torre('white', 'h1'));

        this.posizionaPezzo(new Pedone('black', 'a7'));
        this.posizionaPezzo(new Pedone('black', 'b7'));
        this.posizionaPezzo(new Pedone('black', 'c7'));
        this.posizionaPezzo(new Pedone('black', 'd7'));
        this.posizionaPezzo(new Pedone('black', 'e7'));
        this.posizionaPezzo(new Pedone('black', 'f7'));
        this.posizionaPezzo(new Pedone('black', 'g7'));
        this.posizionaPezzo(new Pedone('black', 'h7'));

        this.posizionaPezzo(new Torre('black', 'a8'));
        this.posizionaPezzo(new Cavallo('black', 'b8'));
        this.posizionaPezzo(new Alfiere('black', 'c8'));
        this.posizionaPezzo(new Regina('black', 'd8'));
        this.posizionaPezzo(new Re('black', 'e8'));
        this.posizionaPezzo(new Alfiere('black', 'f8'));
        this.posizionaPezzo(new Cavallo('black', 'g8'));
        this.posizionaPezzo(new Torre('black', 'h8'));
    }


    disegnaPezzi() {
        // Ottieni tutte le caselle della scacchiera
        const caselle = document.querySelectorAll('.square');

        // Attraversa ogni casella e posiziona il pezzo corrispondente
        caselle.forEach((casella, indice) => {
            const riga = Math.floor(indice / 8);
            const colonna = indice % 8;
            const pezzo = this.ottieniPezzo(riga, colonna);
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