class Cavallo extends Pezzo {

    // Costruttore della classe
    constructor(colore, posizione) {
        super(colore, KNIGHT, posizione);
        this.notazione = NOTAZIONE_KNIGHT;
    }


    isLegalMove(scacchiera, casellaDestinazione) {
        const mosseDisponibili = this.trovaMosseDisponibili(scacchiera);
        if (!mosseDisponibili.includes(casellaDestinazione))
            throw new Error("Questa mossa non è tra quelle disponibili per il Cavallo");
    }

     trovaMosseDisponibili(scacchiera) {
        const mosse = [];
        const [riga, colonna] = scacchiera.convertiPosizioneInIndice(this.posizione);

        // Array delle possibili combinazioni di movimento per il cavallo
        const combinazioniMovimento = [
            [1, 2], [1, -2], [-1, 2], [-1, -2],
            [2, 1], [2, -1], [-2, 1], [-2, -1]
        ];

        // Per ogni combinazione di movimento, verifica se la nuova posizione è valida e aggiungila alle mosse disponibili
        combinazioniMovimento.forEach((combinazione) => {
            const nuovaRiga = riga + combinazione[0];
            const nuovaColonna = colonna + combinazione[1];

            if (scacchiera.verificaPosizioneValida(nuovaRiga, nuovaColonna)) {
                const posizione = scacchiera.convertiIndiceInPosizione(nuovaRiga, nuovaColonna);
                const pezzo = scacchiera.ottieniPezzo(posizione);

                // Se la casella è vuota, aggiungi la mossa e vai avanti nella stessa direzione
                if (!pezzo) {
                    mosse.push(posizione);
                } else {
                    // Se c'è un pezzo avversario, aggiungi la mossa e interrompi la ricerca in questa direzione
                    if (pezzo.colore !== this.colore) {
                        mosse.push(posizione);
                    }
                }
            }
        });

        return mosse;
    }
}