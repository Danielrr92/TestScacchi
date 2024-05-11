class Scacchiera {

    constructor() {
        // Inizializzazione della scacchiera con una matrice di pezzi vuota
        this.matrice = Array(8).fill(null).map(() => Array(8).fill(null));
        this.generaPosizioneInizialePezziMatrice();
        this.mossaAl = COLOR_WHITE;
        this.posizioneReBianco = COLONNE[4] + RIGHE[1];
        this.posizioneReNero = COLONNE[4] + RIGHE[8];
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
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'A2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'B2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'C2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'D2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'E2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'F2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'G2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'H2'));

        this.posizionaPezzo(new Torre(COLOR_WHITE, 'A1'));
        this.posizionaPezzo(new Cavallo(COLOR_WHITE, 'B1'));
        this.posizionaPezzo(new Alfiere(COLOR_WHITE, 'C1'));
        this.posizionaPezzo(new Regina(COLOR_WHITE, 'D1'));
        this.posizionaPezzo(new Re(COLOR_WHITE, 'E1'));
        this.posizionaPezzo(new Alfiere(COLOR_WHITE, 'F1'));
        this.posizionaPezzo(new Cavallo(COLOR_WHITE, 'G1'));
        this.posizionaPezzo(new Torre(COLOR_WHITE, 'H1'));

        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'A7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'B7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'C7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'D7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'E7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'F7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'G7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'H7'));

        this.posizionaPezzo(new Torre(COLOR_BLACK, 'A8'));
        this.posizionaPezzo(new Cavallo(COLOR_BLACK, 'B8'));
        this.posizionaPezzo(new Alfiere(COLOR_BLACK, 'C8'));
        this.posizionaPezzo(new Regina(COLOR_BLACK, 'D8'));
        this.posizionaPezzo(new Re(COLOR_BLACK, 'E8'));
        this.posizionaPezzo(new Alfiere(COLOR_BLACK, 'F8'));
        this.posizionaPezzo(new Cavallo(COLOR_BLACK, 'G8'));
        this.posizionaPezzo(new Torre(COLOR_BLACK, 'H8'));

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
        if (this.mossaAl == COLOR_WHITE) {
            this.mossaAl = COLOR_BLACK;
        }
        else if (this.mossaAl == COLOR_BLACK) {
            this.mossaAl = COLOR_WHITE;
        }
    }

    verificaPosizioneValida(riga, colonna) {
        return riga >= 0 && riga < 8 && colonna >= 0 && colonna < 8;
    }


    //metodo per trovare se la mossa mette l'avversario sotto scacco
    isCheck(mossa) {
        // Posizione del re avversario
        const posizioneReAvversario  = (this.mossaAl === COLORE_BIANCO) ? this.posizioneReNero : this.posizioneReBianco;

        // Simula la mossa
        const scacchieraSimulata = this.simulaMossa(mossa);

        // Verifica se il re avversario è sotto attacco nella nuova configurazione della scacchiera
        const isSottoScacco = this.isPosizioneAttaccata(posizioneReAvversario);

        return isSottoScacco;
    }

    // Funzione per trovare la posizione del re avversario
    trovaPosizioneReAvversario() {
        let reAvversarioPosizione = null;

        // Attraversa tutte le caselle della scacchiera
        for (let riga = 0; riga < 8; riga++) {
            for (let colonna = 0; colonna < 8; colonna++) {
                const casella = this.scacchiera[riga][colonna];
                if (casella && casella.pezzo instanceof Re && casella.pezzo.colore !== turnoCorrente) {
                    // Trovato il re avversario
                    reAvversarioPosizione = { riga, colonna };
                    break;
                }
            }
            if (reAvversarioPosizione) break;
        }

        return reAvversarioPosizione;
    }

    // Funzione per simulare una mossa sulla scacchiera
    simulaMossa(mossa) {
        // Effettua una copia della scacchiera corrente
        const nuovaScacchiera = this.copiaScacchiera();

        // Effettua la mossa sulla copia della scacchiera
        // (implementa la logica per effettuare la mossa)

        return nuovaScacchiera;
    }

    // Funzione per verificare se una posizione è attaccata da un pezzo avversario
    isPosizioneAttaccata(posizione) {
        const avversarioColore = (this.mossaAl === COLORE_BIANCO) ? COLORE_NERO : COLORE_BIANCO;

        // Attraversa tutte le caselle della scacchiera
        for (let riga = 0; riga < 8; riga++) {
            for (let colonna = 0; colonna < 8; colonna++) {
                const casella = this.scacchiera[riga][colonna];
                if (casella && casella.pezzo && casella.pezzo.colore === avversarioColore) {
                    // Se il pezzo nella casella attuale può muoversi sulla posizione specificata, la posizione è attaccata
                    if (casella.pezzo.trovaMosseDisponibili(this).includes(posizione)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }




}