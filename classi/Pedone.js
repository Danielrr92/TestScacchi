class Pedone extends Pezzo {
    
    // Costruttore della classe
    constructor(colore, posizioneIniziale) {
        super(colore,'pawn', posizioneIniziale)
    }

    calcolaMosseDisponibili(scacchiera, pezzo) {
        const [riga, colonna] = scacchiera.convertiPosizioneInIndice(pezzo.posizione);
        const mosseDisponibili = [];
    
        // Calcola la direzione del movimento in base al colore del pedone
        const direzioneMovimento = (pezzo.colore === 'white') ? -1 : 1;
    
        // Controlla la casella davanti al pedone
        const casellaDavanti = scacchiera.convertiIndiceInPosizione(riga + direzioneMovimento, colonna);
        if (!scacchiera.verificaCasellaOccupata(casellaDavanti)) {
            mosseDisponibili.push(casellaDavanti);
    
            // Controlla se è la prima mossa e se può avanzare di due caselle
            if ((pezzo.colore === 'white' && riga === 6) || (pezzo.colore === 'black' && riga === 1)) {
                const casellaDoppiaAvanti = scacchiera.convertiIndiceInPosizione(riga + 2 * direzioneMovimento, colonna);
                if (!scacchiera.verificaCasellaOccupata(casellaDoppiaAvanti)) {
                    mosseDisponibili.push(casellaDoppiaAvanti);
                }
            }
        }
    
        // Controlla le mosse di cattura diagonale
        const catturaSinistra = scacchiera.convertiIndiceInPosizione(riga + direzioneMovimento, colonna - 1);
        const catturaDestra = scacchiera.convertiIndiceInPosizione(riga + direzioneMovimento, colonna + 1);
        if (scacchiera.verificaCasellaOccupata(catturaSinistra) && scacchiera.ottieniPezzo(catturaSinistra).colore !== pezzo.colore) {
            mosseDisponibili.push(catturaSinistra);
        }
        if (scacchiera.verificaCasellaOccupata(catturaDestra) && scacchiera.ottieniPezzo(catturaDestra).colore !== pezzo.colore) {
            mosseDisponibili.push(catturaDestra);
        }
    
        return mosseDisponibili;
    }

    
    
}