const Pezzo = require('./Pezzo');
const Costanti = require('../classi/Costanti');

class Re extends Pezzo {

    // Costruttore della classe
    constructor(colore, posizioneIniziale) {
        super(colore, Costanti.KING, posizioneIniziale);
        this.isSottoScacco = false;
        this.notazione = Costanti.NOTAZIONE_KING;
    }

    
    isLegalMove(scacchiera, casellaDestinazione) {
        const mosseDisponibili = this.trovaMosseDisponibili(scacchiera);
        if (!mosseDisponibili.includes(casellaDestinazione))
            throw new Error("Questa mossa non è tra quelle disponibili per il Re");
    }

    trovaMosseDisponibili(scacchiera) {
        const mosse = [];
        const [riga, colonna] = scacchiera.convertiPosizioneInIndice(this.posizione);

        // Definisci tutte le possibili direzioni di movimento per il re
        const direzioni = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        // Per ogni direzione, controlla se la casella è valida e vuota, o se contiene un pezzo avversario
        direzioni.forEach((direzione) => {
            const nuovaRiga = riga + direzione[0];
            const nuovaColonna = colonna + direzione[1];
            if (scacchiera.verificaPosizioneValida(nuovaRiga, nuovaColonna)) {
                const posizione = scacchiera.convertiIndiceInPosizione(nuovaRiga, nuovaColonna);
                const pezzo = scacchiera.ottieniPezzo(posizione);
                if (!pezzo || pezzo.colore !== this.colore) {
                    mosse.push(posizione);
                }
            }
        });

        //controllo se arrocco è una mossa disponibile, se si, la aggiungo alla lista mosse

        return mosse;
    }

}

module.exports = Re;