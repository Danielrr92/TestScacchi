class Scacchiera {

    constructor() {
        // Inizializzazione della scacchiera con una matrice di pezzi vuota
        this.matrice = Array(8).fill(null).map(() => Array(8).fill(null));
        this.generaPosizioneInizialePezziMatrice();
        this.mossaAl = 'bianco';
    }

    // Metodo per posizionare un pezzo nella scacchiera
    posizionaPezzo(pezzo) {
        const [riga, colonna] = this.convertiPosizioneInIndice(pezzo.posizione);
        this.matrice[riga][colonna] = pezzo;
    }

    // Metodo per ottenere il pezzo in una determinata posizione della scacchiera
    ottieniPezzo(posizione) {
        const [riga, colonna] = this.convertiPosizioneInIndice(posizione);
        return this.matrice[riga][colonna];
    }

    // Metodo per rimuovere un pezzo in una determinata posizione della scacchiera
    rimuoviPezzo(posizione) {
        const [riga, colonna] = this.convertiPosizioneInIndice(posizione);
        this.matrice[riga][colonna] = null;
    }

    // Metodo per aggiornare la posizione di un pezzo sulla scacchiera
    aggiornaPosizionePezzo(pezzo, nuovaPosizione) {
        this.rimuoviPezzo(pezzo.posizione);
        pezzo.posizione = nuovaPosizione;
        this.posizionaPezzo(pezzo);
    }

    // Metodo per generare la disposizione iniziale dei pezzi sulla scacchiera
    generaPosizioneInizialePezziMatrice() {
        // Pezzi bianchi
        this.posizionaPezzo(new Pedone('White', 'A2'));
        this.posizionaPezzo(new Pedone('White', 'B2'));
        this.posizionaPezzo(new Pedone('White', 'C2'));
        this.posizionaPezzo(new Pedone('White', 'D2'));
        this.posizionaPezzo(new Pedone('White', 'E2'));
        this.posizionaPezzo(new Pedone('White', 'F2'));
        this.posizionaPezzo(new Pedone('White', 'G2'));
        this.posizionaPezzo(new Pedone('White', 'H2'));

        this.posizionaPezzo(new Torre('White', 'A1'));
        this.posizionaPezzo(new Cavallo('White', 'B1'));
        this.posizionaPezzo(new Alfiere('White', 'C1'));
        this.posizionaPezzo(new Regina('White', 'D1'));
        this.posizionaPezzo(new Re('White', 'E1'));
        this.posizionaPezzo(new Alfiere('White', 'F1'));
        this.posizionaPezzo(new Cavallo('White', 'G1'));
        this.posizionaPezzo(new Torre('White', 'H1'));

        this.posizionaPezzo(new Pedone('Black', 'A7'));
        this.posizionaPezzo(new Pedone('Black', 'B7'));
        this.posizionaPezzo(new Pedone('Black', 'C7'));
        this.posizionaPezzo(new Pedone('Black', 'D7'));
        this.posizionaPezzo(new Pedone('Black', 'E7'));
        this.posizionaPezzo(new Pedone('Black', 'F7'));
        this.posizionaPezzo(new Pedone('Black', 'G7'));
        this.posizionaPezzo(new Pedone('Black', 'H7'));

        this.posizionaPezzo(new Torre('Black', 'A8'));
        this.posizionaPezzo(new Cavallo('Black', 'B8'));
        this.posizionaPezzo(new Alfiere('Black', 'C8'));
        this.posizionaPezzo(new Regina('Black', 'D8'));
        this.posizionaPezzo(new Re('Black', 'E8'));
        this.posizionaPezzo(new Alfiere('Black', 'F8'));
        this.posizionaPezzo(new Cavallo('Black', 'G8'));
        this.posizionaPezzo(new Torre('Black', 'H8'));
    }


    // Metodo per convertire una posizione nella notazione 'a1' in un indice di matrice [riga][colonna]
    convertiPosizioneInIndice(posizione) {
        const colonna = posizione.charCodeAt(0) - 'A'.charCodeAt(0);
        const riga = 8 - parseInt(posizione[1]);

        // Verifica i limiti della scacchiera
        if (colonna < 0 || colonna >= 8 || riga < 0 || riga >= 8) {
            throw new Error('Posizione non valida sulla scacchiera.');
        }

        return [riga, colonna];
    }

    // Metodo per convertire un indice di matrice [riga][colonna] in una posizione nella notazione 'a1'
    convertiIndiceInPosizione(riga, colonna) {
        // Verifica i limiti della scacchiera
        if (riga < 0 || riga >= 8 || colonna < 0 || colonna >= 8) {
            throw new Error('Indice della scacchiera non valido.');
        }

        const colonnaChar = String.fromCharCode(colonna + 'A'.charCodeAt(0));
        const rigaNum = 8 - riga;

        return colonnaChar + rigaNum;
    }

    verificaCasellaOccupata(posizione) {
        const [riga, colonna] = this.convertiPosizioneInIndice(posizione);
        if (this.matrice[riga][colonna] == null)
            return false;
        else
            return true;
    }
    
    verificaPosizioneOccupata(riga, colonna) {
        if (this.matrice[riga][colonna] == null)
            return false;
        else
            return true;
    }

    aggiornaMossaAl() {
        if (this.mossaAl == 'bianco') {
            this.mossaAl = 'nero';
        }
        else if (this.mossaAl == 'nero') {
            this.mossaAl = 'bianco';
        }
    }

    verificaPosizioneValida(riga, colonna) {
        return riga >= 0 && riga < 8 && colonna >= 0 && colonna < 8;
    }




}