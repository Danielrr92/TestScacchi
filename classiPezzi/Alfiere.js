class Alfiere extends Pezzo {

    // Costruttore della classe
    constructor(colore, posizioneIniziale) {
        super(colore, BISHOP, posizioneIniziale)
    }

    isLegalMove(scacchiera, casellaDestinazione) {
        const mosseDisponibili = this.trovaMosseDisponibili(scacchiera);
        if (!mosseDisponibili.includes(casellaDestinazione))
            throw new Error("Questa mossa non è tra quelle disponibili per l'Alfiere");
    }

    trovaMosseDisponibili(scacchiera) {
        const mosse = [];
        const [riga, colonna] = scacchiera.convertiPosizioneInIndice(this.posizione);

        // Definisci i possibili movimenti dell'alfiere: diagonali
        const direzioni = [
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ];

        // Per ogni direzione, controlla tutte le caselle fino a che non si incontra un ostacolo o si esce dalla scacchiera
        direzioni.forEach((direzione) => {
            let nuovaRiga = riga + direzione[0];
            let nuovaColonna = colonna + direzione[1];

            while (scacchiera.verificaPosizioneValida(nuovaRiga, nuovaColonna)) {
                const posizione = scacchiera.convertiIndiceInPosizione(nuovaRiga, nuovaColonna);
                const pezzo = scacchiera.ottieniPezzo(posizione);

                // Se la casella è vuota, aggiungi la mossa e vai avanti nella stessa direzione
                if (!pezzo) {
                    mosse.push(posizione);
                    nuovaRiga += direzione[0];
                    nuovaColonna += direzione[1];
                } else {
                    // Se c'è un pezzo avversario, aggiungi la mossa e interrompi la ricerca in questa direzione
                    if (pezzo.colore !== this.colore) {
                        mosse.push(posizione);
                    }
                    break;
                }
            }
        });

        return mosse;
    }

}