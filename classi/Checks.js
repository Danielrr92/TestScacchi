

//metodo per trovare se la mossa mette l'avversario sotto scacco
function isCheckReAvversario(mossa, scacchiera) {
    //VERIFICO SE LA MOSSA GENERA UNO SCACCO AL RE AVVERSARIO
    // Posizione del re avversario
    const posizioneReAvversario = (scacchiera.mossaAl === COLORE_BIANCO) ? scacchiera.posizioneReNero : scacchiera.posizioneReBianco;

    // Simula la mossa
    const scacchieraSimulata = simulaMossa(mossa, scacchiera);

    // Verifica se il re avversario è sotto attacco nella nuova configurazione della scacchiera
    const isSottoScacco = scacchiera.isPosizioneAttaccata(posizioneReAvversario);

    return isSottoScacco;
}

function isPezzoInchiodato(scacchiera, pezzo, casellaDestinazione) {
    //VERIFICO SE LA MOSSA GENERA UNO SCACCO AL MIO RE, IN TAL CASO è UNA MOSSA ILLEGALE
    // Posizione del mio re
    const posizioneMioRe = (scacchiera.mossaAl === COLORE_BIANCO) ? scacchiera.posizioneReBianco : scacchiera.posizioneReNero;

    // Simula la mossa
    const scacchieraSimulata = simulaMossa(scacchiera, pezzo, casellaDestinazione);

    // Verifica se il re avversario è sotto attacco nella nuova configurazione della scacchiera
    const isSottoScacco = scacchiera.isPosizioneAttaccata(posizioneMioRe);

    return isSottoScacco;
}



// Funzione per simulare una mossa sulla scacchiera - la funzione ritorna una scacchiera copia in cui è stata effettuata la mossa
function simulaMossa(pezzo, casellaDestinazione) {
    // Effettua una copia della scacchiera corrente
    const nuovaScacchiera = copiaScacchiera();

    // Effettua la mossa sulla copia della scacchiera
    // (implementa la logica per effettuare la mossa)
    nuovaScacchiera.aggiornaPosizionePezzo(pezzo, casellaDestinazione)

    consolelog
    return nuovaScacchiera;
}

// Funzione per verificare se una posizione è attaccata da un pezzo avversario
function isPosizioneAttaccata(posizione, scacchiera) {
    const avversarioColore = (scacchiera.mossaAl === COLORE_BIANCO) ? COLORE_NERO : COLORE_BIANCO;

    // Attraversa tutte le caselle della scacchiera
    for (let riga = 0; riga < 8; riga++) {
        for (let colonna = 0; colonna < 8; colonna++) {
            const casella = scacchiera[riga][colonna];
            if (casella && casella.pezzo && casella.pezzo.colore === avversarioColore) {
                // Se il pezzo nella casella attuale può muoversi sulla posizione specificata(che è quella del re), la posizione è attaccata
                if (casella.pezzo.trovaMosseDisponibili(scacchiera).includes(posizione)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function copiaScacchiera(scacchiera) {
    nuovaScacchiera = new Scacchiera;
    // Crea una nuova matrice vuota
    copia.matrice = [];

    // Copia i pezzi dalla matrice originale alla nuova matrice
    for (let riga = 0; riga < 8; riga++) {
        nuovaScacchiera.matrice[riga] = [];
        for (let colonna = 0; colonna < 8; colonna++) {
            const casella = scacchiera[riga][colonna];
            nuovaScacchiera.matrice[riga][colonna] = casella ? { ...casella } : null;
        }
    }

    return nuovaScacchiera;
}
