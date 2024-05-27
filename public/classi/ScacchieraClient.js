class ScacchieraClient {

    constructor() {

    }

    inizializza(scacchiera) {
        // Inizializzazione della scacchiera con una matrice di pezzi vuota
        this.matrice = Array(8).fill(null).map(() => Array(8).fill(null));
        this.generaPosizioneInizialePezziMatrice(scacchiera);
        this.pezzoMangiato = scacchiera.pezzoMangiato;
        this.isScaccoMatto = scacchiera.isScaccoMatto;
        this.mossaAl = scacchiera.mossaAl;
        this.posizioneReBianco = scacchiera.posizioneReBianco;
        this.posizioneReNero = scacchiera.posizioneReNero;
        this.listaMossePartita = [];
        this.listaMossePartita = this.generaListaMossePartita(scacchiera);
        this.gameId = scacchiera.gameId;
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
        //se sto mangiando un pezzo, mi salvo il pezzo mangiato
        this.pezzoMangiato = this.ottieniPezzo(mossa.casellaDestinazione);
        this.rimuoviPezzo(mossa.pezzo.posizione);
        mossa.pezzo.posizione = mossa.casellaDestinazione;
        this.posizionaPezzo(mossa.pezzo);
        //this.aggiornaListaMosseEffettuate(mossa);
        //segno che il pezzo ha mosso almeno una mossa
        mossa.pezzo.hasMoved = true;
        if (mossa.pezzo.tipo == KING) {
            if (mossa.pezzo.colore == COLOR_WHITE) {
                this.posizioneReBianco = mossa.pezzo.posizione;
            }
            else {
                this.posizioneReNero = mossa.pezzo.posizione;
            }
        }
    }

    aggiornaPosizioneArrocco(mossaRe, mossaTorre) {
        //mossa per il re
        this.rimuoviPezzo(mossaRe.pezzo.posizione);
        mossaRe.pezzo.posizione = mossaRe.casellaDestinazione;
        this.posizionaPezzo(mossaRe.pezzo);
        mossaRe.pezzo.hasMoved = true;

        //mossa per la torre
        this.rimuoviPezzo(mossaTorre.pezzo.posizione);
        mossaTorre.pezzo.posizione = mossaTorre.casellaDestinazione;
        this.posizionaPezzo(mossaTorre.pezzo);
        mossaRe.pezzo.hasMoved = true;

        //aggiorno posizione del re
        if (mossaRe.pezzo.colore == COLOR_WHITE) {
            this.posizioneReBianco = mossaRe.pezzo.posizione;
        }
        else {
            this.posizioneReNero = mossaRe.pezzo.posizione;
        }

        //la lista la aggiorno una sola volta perchè arrocco pur essendo lo spostamento di due pezzi conta come una mossa sola
        this.aggiornaListaMosseEffettuate(mossaRe);
    }

    // Metodo per generare la disposizione iniziale dei pezzi sulla scacchiera
    generaPosizioneInizialePezziMatrice(scacchiera) {
        for (let riga = 0; riga < 8; riga++) {
            for (let colonna = 0; colonna < 8; colonna++) {
                const pezzo = scacchiera.matrice[riga][colonna];
                if (pezzo) {
                    let nuovoPezzo;// = new Pezzo("","","");
                    switch (pezzo.tipo) {
                        case PAWN:
                            nuovoPezzo = new Pedone(pezzo.colore, pezzo.posizione);
                            nuovoPezzo.id = pezzo.id;
                            break;
                        case KING:
                            nuovoPezzo = new Re(pezzo.colore, pezzo.posizione);
                            nuovoPezzo.id = pezzo.id;
                            break;
                        case QUEEN:
                            nuovoPezzo = new Regina(pezzo.colore, pezzo.posizione);
                            nuovoPezzo.id = pezzo.id;
                            break;
                        case ROOK:
                            nuovoPezzo = new Torre(pezzo.colore, pezzo.posizione);
                            nuovoPezzo.id = pezzo.id;
                            break;
                        case BISHOP:
                            nuovoPezzo = new Alfiere(pezzo.colore, pezzo.posizione);
                            nuovoPezzo.id = pezzo.id;
                            break;
                        case KNIGHT:
                            nuovoPezzo = new Cavallo(pezzo.colore, pezzo.posizione);
                            nuovoPezzo.id = pezzo.id;
                            break;
                    }
                    this.posizionaPezzo(nuovoPezzo);
                }
                
            }
        }

    }

    generaListaMossePartita(scacchiera) {
        scacchiera.listaMossePartita.forEach((element) => {
            const serieDiMosse = new SerieDiMosse();
            let pezzo;
            //pezzo mosso
            switch (element.mossaBianco.pezzo.tipo) {
                case PAWN:
                    pezzo = new Pedone(element.mossaBianco.pezzo.colore, element.mossaBianco.pezzo.posizione);
                    break;
                case KING:
                    pezzo = new Re(element.mossaBianco.pezzo.colore, element.mossaBianco.pezzo.posizione);
                    break;
                case QUEEN:
                    pezzo = new Regina(element.mossaBianco.pezzo.colore, element.mossaBianco.pezzo.posizione);
                    break;
                case ROOK:
                    pezzo = new Torre(element.mossaBianco.pezzo.colore, element.mossaBianco.pezzo.posizione);
                    break;
                case BISHOP:
                    pezzo = new Alfiere(element.mossaBianco.pezzo.colore, element.mossaBianco.pezzo.posizione);
                    break;
                case KNIGHT:
                    pezzo = new Cavallo(element.mossaBianco.pezzo.colore, element.mossaBianco.pezzo.posizione);
                    break;
            }
            serieDiMosse.mossaBianco = new Mossa(pezzo, element.mossaBianco.casellaPartenza, element.mossaBianco.casellaDestinazione)
            //controllo se c'è anche la mossa del nero (devo fare il controllo perchè ad ogni riga 1) e4 2) e5 ecc.. potrebbe esserci solamente la mossa del bianco)
            if (element.mossaNero){
                switch (element.mossaNero.pezzo.tipo) {
                    case PAWN:
                        pezzo = new Pedone(element.mossaNero.pezzo.colore, element.mossaNero.pezzo.posizione);
                        break;
                    case KING:
                        pezzo = new Re(element.mossaNero.pezzo.colore, element.mossaNero.pezzo.posizione);
                        break;
                    case QUEEN:
                        pezzo = new Regina(element.mossaNero.pezzo.colore, element.mossaNero.pezzo.posizione);
                        break;
                    case ROOK:
                        pezzo = new Torre(element.mossaNero.pezzo.colore, element.mossaNero.pezzo.posizione);
                        break;
                    case BISHOP:
                        pezzo = new Alfiere(element.mossaNero.pezzo.colore, element.mossaNero.pezzo.posizione);
                        break;
                    case KNIGHT:
                        pezzo = new Cavallo(element.mossaNero.pezzo.colore, element.mossaNero.pezzo.posizione);
                        break;
                }
                serieDiMosse.mossaNero = new Mossa(pezzo, element.mossaNero.casellaPartenza, element.mossaNero.casellaDestinazione)
            }
            this.listaMossePartita.push(serieDiMosse);
        })

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
    annullaUltimaMossa(pezzo, casellaPartenza) {
         //tolgo il pezzo dalla posizione illegale
        this.rimuoviPezzo(pezzo.posizione);
        //rimetto il pezzo che stavo muovendo nella posizione di partenza
        pezzo.posizione = casellaPartenza;
        this.posizionaPezzo(pezzo);
        if (this.pezzoMangiato) {
            //riposiziono il pezzo che era stato eliminato nel fare la mossa
            this.posizionaPezzo(this.pezzoMangiato);
        }
        this.pezzoMangiato = null;
        //reimposto la posizione del re in caso stia annullando una sua mossa
        if (pezzo.tipo == KING && pezzo.colore == COLOR_WHITE) {
            this.posizioneReBianco = pezzo.posizione;
        }
        if (pezzo.tipo == KING && pezzo.colore == COLOR_BLACK) {
            this.posizioneReNero = pezzo.posizione;
        }
    }

    eseguiArrocco(colore, lato, casellaDestinazioneRe) {
        const posizioneRe = (colore === COLOR_WHITE) ? this.posizioneReBianco : this.posizioneReNero;
        const re = this.ottieniPezzo(posizioneRe)
        const torre = (lato === KING) ? this.ottieniTorreRe(colore) : this.ottieniTorreRegina(colore);

        let posizioneInizialeTorre = torre.posizione;

        let nuovaPosizioneTorre;
        switch (torre.id) {
            case "WhiteRookh1":
                nuovaPosizioneTorre = "f1";
                break;
            case "WhiteRooka1":
                nuovaPosizioneTorre = "d1";
                break;
            case "BlackRooka8":
                nuovaPosizioneTorre = "d8";
                break;
            case "BlackRookh8":
                nuovaPosizioneTorre = "f8";
                break;

        }

        const mossaRe = new Mossa(re, posizioneRe, casellaDestinazioneRe);
        mossaRe.isArrocco = true
        const mossaTorre = new Mossa(torre, torre.posizione, nuovaPosizioneTorre);
        //this.aggiornaPosizioneArrocco(mossaRe, mossaTorre);

        re.hasMoved = true;
        torre.hasMoved = true;
        return [posizioneInizialeTorre, nuovaPosizioneTorre];
    }


    isArroccoLegale(re, lato) {
        const torre = (lato === KING) ? this.ottieniTorreRe(re.colore) : this.ottieniTorreRegina(re.colore);
        //per fare arrocco ne il re, ne la torre devono essersi mai mossi
        if (re.hasMoved || torre.hasMoved) return false;

        // Controlla se ci sono pezzi tra re e torre
        const caselleTra = this.caselleTra(re, torre);
        for (const casella of caselleTra) {
            if (this.verificaCasellaOccupata(casella)) return false;
        }

        // Controlla se il re è, passa attraverso o finisce su una casella attaccata
        const checks = new Checks();
        const coloreAttaccante = (this.mossaAl === COLOR_WHITE) ? COLOR_BLACK : COLOR_WHITE;
        for (const casella of caselleTra) {
            if (checks.isPosizioneAttaccata(casella, this, coloreAttaccante)) return false;
        }

        return true;
    }

    caselleTra(re, torre) {
        const caselle = [];
        const [rigaRe, colonnaRe] = this.convertiPosizioneInIndice(re.posizione);
        const [rigaTorre, colonnaTorre] = this.convertiPosizioneInIndice(torre.posizione);
        const startCol = Math.min(colonnaRe, colonnaTorre) + 1;
        const endCol = Math.max(colonnaRe, colonnaTorre);
        for (let col = startCol; col < endCol; col++) {
            let posizioneCasella = this.convertiIndiceInPosizione(rigaTorre, col)
            caselle.push(posizioneCasella);
        }
        return caselle;
    }

    ottieniTorreRe(colore) {
        const row = (colore === COLOR_WHITE) ? 7 : 0;
        return this.matrice[row][7];
    }

    ottieniTorreRegina(colore) {
        const row = (colore === COLOR_WHITE) ? 7 : 0;
        return this.matrice[row][0];
    }





}
