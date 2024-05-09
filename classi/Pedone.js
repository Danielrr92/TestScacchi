class Pedone extends Pezzo {

    // Costruttore della classe
    constructor(colore, posizioneIniziale) {
        super(colore, 'Pawn', posizioneIniziale)
        this.primaMossa = true;
        this.promozione = false;
    }


    isLegalMove(scacchiera, casellaDestinazione) {
        const mosseDisponibili = this.trovaMosseDisponibili(scacchiera);
        if (!mosseDisponibili.includes(casellaDestinazione))
            return false;

        return true;
    }


    trovaMosseDisponibili(scacchiera) {
        const mosse = [];
        const [riga, colonna] = scacchiera.convertiPosizioneInIndice(this.posizione);
        const direzione = (this.colore === 'white') ? -1 : 1;

        // Calcola la casella davanti al pedone
        const nuovaRiga = riga + direzione;

        // Verifica se la casella davanti al pedone è all'interno della scacchiera e se è libera
        //casellaDaControllare 

        if (scacchiera.verificaPosizioneValida(nuovaRiga, colonna)) {
            if (!scacchiera.verificaPosizioneOccupata(nuovaRiga, colonna)) {
                mosse.push(scacchiera.convertiIndiceInPosizione(nuovaRiga, colonna));

                // Se è la prima mossa del pedone, verifica se può muoversi di due caselle in avanti
                if (this.primaMossa && scacchiera.verificaPosizioneValida(nuovaRiga + direzione, colonna)) {
                    if (!scacchiera.verificaPosizioneOccupata(nuovaRiga + direzione, colonna)) {
                        mosse.push(scacchiera.convertiIndiceInPosizione(nuovaRiga + direzione, colonna));
                    }
                }

                // se la casella avanti è l'ottava traversa(pezzo bianco) o la prima traversa(pezzo nero) effettuo la promozione
                if((nuovaRiga == 0 && this.colore =='white') || (nuovaRiga == 7 && this.colore == 'black')){
                    this.promozione = true;
                }
            }
        }

        // Calcola la casella diagonale sinistra per la possibile cattura
        if (scacchiera.verificaPosizioneValida(nuovaRiga, colonna - 1)) {
            const catturaSinistra = scacchiera.convertiIndiceInPosizione(nuovaRiga, colonna - 1);
            // Se ci sono pezzi avversari nelle caselle diagonali, può catturare
            if (catturaSinistra && scacchiera.verificaCasellaOccupata(catturaSinistra) && scacchiera.ottieniPezzo(catturaSinistra).colore !== this.colore) {
                mosse.push(catturaSinistra);
            }
        }

        if (scacchiera.verificaPosizioneValida(nuovaRiga, colonna + 1)) {
            const catturaDestra = scacchiera.convertiIndiceInPosizione(nuovaRiga, colonna + 1);

            if (catturaDestra && scacchiera.verificaCasellaOccupata(catturaDestra) && scacchiera.ottieniPezzo(catturaDestra).colore !== this.colore) {
                mosse.push(catturaDestra);
            }

        }
        return mosse;


    }

}