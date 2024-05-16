class Scacchiera {

    constructor() {
        // Inizializzazione della scacchiera con una matrice di pezzi vuota
        this.matrice = Array(8).fill(null).map(() => Array(8).fill(null));

    }

    generaPosizioneInizialeScacchiera() {
        this.generaPosizioneInizialePezziMatrice();
        this.mossaAl = COLOR_WHITE;
        this.posizioneReBianco = COLONNE[4] + RIGHE[0];
        this.posizioneReNero = COLONNE[4] + RIGHE[7];
        this.listaMossePartita = [];
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
    aggiornaPosizionePezzo(mossa) {
        this.rimuoviPezzo(mossa.pezzo.posizione);
        mossa.pezzo.posizione = mossa.casellaDestinazione;
        this.posizionaPezzo(mossa.pezzo);
        this.aggiornaListaMosseEffettuate(mossa);
    }

    // Metodo per generare la disposizione iniziale dei pezzi sulla scacchiera
    generaPosizioneInizialePezziMatrice() {
        // Pezzi bianchi
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'a2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'b2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'c2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'd2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'e2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'f2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'g2'));
        this.posizionaPezzo(new Pedone(COLOR_WHITE, 'h2'));

        this.posizionaPezzo(new Torre(COLOR_WHITE, 'a1'));
        this.posizionaPezzo(new Cavallo(COLOR_WHITE, 'b1'));
        this.posizionaPezzo(new Alfiere(COLOR_WHITE, 'c1'));
        this.posizionaPezzo(new Regina(COLOR_WHITE, 'd1'));
        this.posizionaPezzo(new Re(COLOR_WHITE, 'e1'));
        this.posizionaPezzo(new Alfiere(COLOR_WHITE, 'f1'));
        this.posizionaPezzo(new Cavallo(COLOR_WHITE, 'g1'));
        this.posizionaPezzo(new Torre(COLOR_WHITE, 'h1'));

        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'a7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'b7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'c7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'd7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'e7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'f7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'g7'));
        this.posizionaPezzo(new Pedone(COLOR_BLACK, 'h7'));

        this.posizionaPezzo(new Torre(COLOR_BLACK, 'a8'));
        this.posizionaPezzo(new Cavallo(COLOR_BLACK, 'b8'));
        this.posizionaPezzo(new Alfiere(COLOR_BLACK, 'c8'));
        this.posizionaPezzo(new Regina(COLOR_BLACK, 'd8'));
        this.posizionaPezzo(new Re(COLOR_BLACK, 'e8'));
        this.posizionaPezzo(new Alfiere(COLOR_BLACK, 'f8'));
        this.posizionaPezzo(new Cavallo(COLOR_BLACK, 'g8'));
        this.posizionaPezzo(new Torre(COLOR_BLACK, 'h8'));

    }


    // Metodo per convertire una posizione nella notazione 'a1' in un indice di matrice [riga][colonna]
    convertiPosizioneInIndice(posizione) {
        const colonna = posizione.charCodeAt(0) - 'a'.charCodeAt(0);
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

        const colonnaChar = String.fromCharCode(colonna + 'a'.charCodeAt(0));
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
        if (this.mossaAl === COLOR_WHITE) {
            this.mossaAl = COLOR_BLACK;
        }
        else if (this.mossaAl === COLOR_BLACK) {
            this.mossaAl = COLOR_WHITE;
        }
    }

    verificaPosizioneValida(riga, colonna) {
        return riga >= 0 && riga < 8 && colonna >= 0 && colonna < 8;
    }

    aggiornaListaMosseEffettuate(mossa) {
        //salvo la mossa effettuata nella lista mosse che mi fa da storico
        if (this.mossaAl === COLOR_WHITE) {
            //quando tocca al bianco creo una nuova serie di mosse del tipo 1) e4
            const serieDiMosse = new SerieDiMosse();
            serieDiMosse.setMossaBianco(mossa);
            this.listaMossePartita.push(serieDiMosse);
        }
        else {
            // Aggiorna la mossa del nero dell'oggetto SerieDiMosse contenuto nella listaMosse del tipo 1) ... e5 (l'oggetto già esiste perchè è stato creato alla mossa del bianco)
            this.listaMossePartita[this.listaMossePartita.length - 1].setMossaNero(mossa);
        }
    }

    // Metodo per annullare l'ultima coppia di mosse
    annullaUltimaMossa(pezzo, pezzoMangiato, casellaPartenza) {
        if (this.mossaAl === COLOR_WHITE) {
            this.listaMossePartita.pop(); // Rimuove l'ultima coppia di mosse            
        } else {
            this.listaMossePartita[this.listaMossePartita.length - 1].setMossaNero(null);
        }
        //tolgo il pezzo dalla posizione illegale
        this.rimuoviPezzo(pezzo.posizione);
        //rimetto il pezzo che stavo muovendo nella posizione di partenza
        pezzo.posizione = casellaPartenza;
        this.posizionaPezzo(pezzo);
        if (pezzoMangiato) {
            //riposiziono il pezzo che era stato eliminato nel fare la mossa
            this.posizionaPezzo(pezzoMangiato)
        }
    }



}