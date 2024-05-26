const Alfiere = require('../classiPezzi/Alfiere');
const Cavallo = require('../classiPezzi/Cavallo');
const Pedone = require('../classiPezzi/Pedone');
const Re = require('../classiPezzi/Re');
const Regina = require('../classiPezzi/Regina');
const Torre = require('../classiPezzi/Torre');
const Costanti = require('./Costanti');
const SerieDiMosse = require('./SerieDiMosse');

class Scacchiera {

    constructor() {
        // Inizializzazione della scacchiera con una matrice di pezzi vuota
        this.matrice = Array(8).fill(null).map(() => Array(8).fill(null));
        this.generaPosizioneInizialePezziMatrice();
        this.pezzoMangiato = null;
        this.isScaccoMatto = false;
        this.mossaAl = Costanti.COLOR_WHITE;
        this.posizioneReBianco = Costanti.COLONNE[4] + Costanti.RIGHE[0];
        this.posizioneReNero = Costanti.COLONNE[4] + Costanti.RIGHE[7];
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
        //se sto mangiando un pezzo, mi salvo il pezzo mangiato
        this.pezzoMangiato = this.ottieniPezzo(mossa.casellaDestinazione);
        this.rimuoviPezzo(mossa.pezzo.posizione);
        mossa.pezzo.posizione = mossa.casellaDestinazione;
        this.posizionaPezzo(mossa.pezzo);
        this.aggiornaListaMosseEffettuate(mossa);
        //segno che il pezzo ha mosso almeno una mossa
        mossa.pezzo.hasMoved = true;
        if (mossa.pezzo.tipo == Costanti.KING) {
            if (mossa.pezzo.colore == Costanti.COLOR_WHITE) {
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
        if (mossaRe.pezzo.colore == Costanti.COLOR_WHITE) {
            this.posizioneReBianco = mossaRe.pezzo.posizione;
        }
        else {
            this.posizioneReNero = mossaRe.pezzo.posizione;
        }
        
        //la lista la aggiorno una sola volta perchè arrocco pur essendo lo spostamento di due pezzi conta come una mossa sola
        this.aggiornaListaMosseEffettuate(mossaRe);
    }

    // Metodo per generare la disposizione iniziale dei pezzi sulla scacchiera
    generaPosizioneInizialePezziMatrice() {
        // Pezzi bianchi
        this.posizionaPezzo(new Pedone(Costanti.COLOR_WHITE, 'a2'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_WHITE, 'b2'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_WHITE, 'c2'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_WHITE, 'd2'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_WHITE, 'e2'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_WHITE, 'f2'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_WHITE, 'g2'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_WHITE, 'h2'));

        this.posizionaPezzo(new Torre(Costanti.COLOR_WHITE, 'a1'));
        this.posizionaPezzo(new Cavallo(Costanti.COLOR_WHITE, 'b1'));
        this.posizionaPezzo(new Alfiere(Costanti.COLOR_WHITE, 'c1'));
        this.posizionaPezzo(new Regina(Costanti.COLOR_WHITE, 'd1'));
        this.posizionaPezzo(new Re(Costanti.COLOR_WHITE, 'e1'));
        this.posizionaPezzo(new Alfiere(Costanti.COLOR_WHITE, 'f1'));
        this.posizionaPezzo(new Cavallo(Costanti.COLOR_WHITE, 'g1'));
        this.posizionaPezzo(new Torre(Costanti.COLOR_WHITE, 'h1'));

        this.posizionaPezzo(new Pedone(Costanti.COLOR_BLACK, 'a7'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_BLACK, 'b7'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_BLACK, 'c7'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_BLACK, 'd7'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_BLACK, 'e7'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_BLACK, 'f7'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_BLACK, 'g7'));
        this.posizionaPezzo(new Pedone(Costanti.COLOR_BLACK, 'h7'));

        this.posizionaPezzo(new Torre(Costanti.COLOR_BLACK, 'a8'));
        this.posizionaPezzo(new Cavallo(Costanti.COLOR_BLACK, 'b8'));
        this.posizionaPezzo(new Alfiere(Costanti.COLOR_BLACK, 'c8'));
        this.posizionaPezzo(new Regina(Costanti.COLOR_BLACK, 'd8'));
        this.posizionaPezzo(new Re(Costanti.COLOR_BLACK, 'e8'));
        this.posizionaPezzo(new Alfiere(Costanti.COLOR_BLACK, 'f8'));
        this.posizionaPezzo(new Cavallo(Costanti.COLOR_BLACK, 'g8'));
        this.posizionaPezzo(new Torre(Costanti.COLOR_BLACK, 'h8'));

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
        if (this.mossaAl === Costanti.COLOR_WHITE) {
            this.mossaAl = Costanti.COLOR_BLACK;
        }
        else if (this.mossaAl === Costanti.COLOR_BLACK) {
            this.mossaAl = Costanti.COLOR_WHITE;
        }
    }

    verificaPosizioneValida(riga, colonna) {
        return riga >= 0 && riga < 8 && colonna >= 0 && colonna < 8;
    }

    aggiornaListaMosseEffettuate(mossa) {
        //salvo la mossa effettuata nella lista mosse che mi fa da storico
        if (this.mossaAl === Costanti.COLOR_WHITE) {
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
        if (this.mossaAl === Costanti.COLOR_WHITE) {
            this.listaMossePartita.pop(); // Rimuove l'ultima coppia di mosse            
        } else {
            this.listaMossePartita[this.listaMossePartita.length - 1].setMossaNero(null);
        }
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
        if (pezzo.tipo == KING && pezzo.colore == Costanti.COLOR_WHITE) {
            this.posizioneReBianco = pezzo.posizione;
        }
        if (pezzo.tipo == KING && pezzo.colore == Costanti.COLOR_BLACK) {
            this.posizioneReNero = pezzo.posizione;
        }
    }

    eseguiArrocco(colore, lato, casellaDestinazioneRe) {
        const posizioneRe = (colore === Costanti.COLOR_WHITE) ? this.posizioneReBianco : this.posizioneReNero;
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
        this.aggiornaPosizioneArrocco(mossaRe, mossaTorre);

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
        const coloreAttaccante = (this.mossaAl === Costanti.COLOR_WHITE) ? Costanti.COLOR_BLACK : Costanti.COLOR_WHITE;
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
        const row = (colore === Costanti.COLOR_WHITE) ? 7 : 0;
        return this.matrice[row][7];
    }

    ottieniTorreRegina(colore) {
        const row = (colore === Costanti.COLOR_WHITE) ? 7 : 0;
        return this.matrice[row][0];
    }





}

module.exports = Scacchiera;