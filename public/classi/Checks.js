class Checks {

    constructor() {
        
    }

    //VERIFICO SE LA MOSSA GENERA UNO SCACCO AL MIO RE, IN TAL CASO è UNA MOSSA ILLEGALE
    checkIsPezzoInchiodatoSulMioRe(scacchiera) {
        // Posizione del mio re
        const posizioneMioRe = (scacchiera.mossaAl === COLOR_WHITE) ? scacchiera.posizioneReBianco : scacchiera.posizioneReNero;
        const coloreAttaccante = (scacchiera.mossaAl === COLOR_WHITE) ? COLOR_BLACK : COLOR_WHITE;

        // Se il mio re è sotto scacco nella nuova configurazione della scacchiera è una mossa illegale 
        if (this.isPosizioneAttaccata(posizioneMioRe, scacchiera, coloreAttaccante)) {
            stampaMessaggio("Questa mossa non è valida");
            return true
        }
        return false;
    }



    // Funzione per verificare se una posizione è attaccata da un pezzo avversario
    isPosizioneAttaccata(posizione, scacchiera, coloreAttaccante) {
        // Attraversa tutte le caselle della scacchiera
        for (let riga = 0; riga < 8; riga++) {
            for (let colonna = 0; colonna < 8; colonna++) {
                const pezzo = scacchiera.matrice[riga][colonna];
                if (pezzo && pezzo.colore === coloreAttaccante) {
                    // Se il pezzo nella casella attuale può muoversi sulla posizione specificata(che è quella del re), la posizione è attaccata
                    if (pezzo.trovaMosseDisponibili(scacchiera).includes(posizione)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }


    // //metodo per trovare se la mossa mette l'avversario sotto scacco
    isCheckReAvversario(scacchiera) {
        //VERIFICO SE LA MOSSA GENERA UNO SCACCO AL RE AVVERSARIO
        // Posizione del re avversario
        const posizioneReAvversario = (scacchiera.mossaAl === COLOR_WHITE) ? scacchiera.posizioneReNero : scacchiera.posizioneReBianco;
        const coloreAttaccante = (scacchiera.mossaAl === COLOR_WHITE) ? COLOR_WHITE : COLOR_BLACK;
        // Verifica se il re avversario è sotto attacco nella nuova configurazione della scacchiera
        if (this.isPosizioneAttaccata(posizioneReAvversario, scacchiera, coloreAttaccante)) {
            stampaMessaggio("Questa mossa non è valida");
            return true
        }
        return false;
    }

    // Funzione per verificare se è scacco matto
    checkIfIsScaccoMatto(scacchiera) {
        // Ottieni la posizione del re avversario
        const posizioneReAvversario = (scacchiera.mossaAl === COLOR_WHITE) ? scacchiera.posizioneReNero : scacchiera.posizioneReBianco;
        const re = scacchiera.ottieniPezzo(posizioneReAvversario);

        // Ottieni tutte le mosse legali del re
        const mosseLegaliRe = this.ottieniMosseLegaliRe(scacchiera, re);

        // Se il re ha mosse legali, non è scacco matto
        if (mosseLegaliRe.length > 0) {
            return false;
        }

        // Controlla tutte le mosse possibili degli altri pezzi del colore del re
        for (let i = 0; i < scacchiera.matrice.length; i++) {
            for (let j = 0; j < scacchiera.matrice[i].length; j++) {
                const pezzo = scacchiera.matrice[i][j];
                if (pezzo && pezzo.colore === re.colore) {
                    const mossePossibili = pezzo.trovaMosseDisponibili(scacchiera);
                    for (const mossa of mossePossibili) {
                        const mossaSimulata = new Mossa(pezzo,pezzo.posizione, mossa);
                        // Simula la mossa sulla scacchiera
                        scacchiera.aggiornaPosizionePezzo(mossaSimulata);
                        // Controlla se il re è ancora sotto scacco dopo la mossa
                        const isStillInCheck = this.isCheckReAvversario(scacchiera);
                        // Ripristina la scacchiera allo stato precedente
                        scacchiera.annullaUltimaMossa(mossaSimulata.pezzo, mossaSimulata.casellaPartenza);

                        // Se il re non è più sotto scacco, non è scacco matto
                        if (!isStillInCheck) {
                            return false;
                        }
                    }
                }
            }
        }

        // Se nessuna mossa legale è trovata, è scacco matto
        return true;
    }

    // Funzione per ottenere tutte le mosse legali del re
    ottieniMosseLegaliRe(scacchiera, re) {
        const mosseLegali = [];
        const mossePossibili = re.trovaMosseDisponibili(scacchiera);
        for (const mossa of mossePossibili) {
            const mossaSimulata = new Mossa(re, re.posizione, mossa);
            scacchiera.aggiornaPosizionePezzo(mossaSimulata);
            if (!this.isCheckReAvversario(scacchiera, re.colore)) {
                mosseLegali.push(mossa);
            }
            scacchiera.annullaUltimaMossa(mossaSimulata.pezzo,  mossaSimulata.casellaPartenza);
        }
        return mosseLegali;
    }
}





