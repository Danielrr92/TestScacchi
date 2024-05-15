class Checks {

    constructor(){

    }
    
    //VERIFICO SE LA MOSSA GENERA UNO SCACCO AL MIO RE, IN TAL CASO è UNA MOSSA ILLEGALE
    checkIsPezzoInchiodatoSulMioRe(scacchiera) {
        // Posizione del mio re
        const posizioneMioRe = (scacchiera.mossaAl === COLOR_WHITE) ? scacchiera.posizioneReBianco : scacchiera.posizioneReNero;

        // Se il mio re è sotto scacco nella nuova configurazione della scacchiera è una mossa illegale 
        if (this.isPosizioneAttaccata(posizioneMioRe, scacchiera)){            
            console.log("Commento mio scritto a mano nella classe Checks: checkIsPezzoInchiodatoSulMioRe: isPosizioneAttaccata = true");
            return true
        }
        return false;
    }

    // Funzione per verificare se una posizione è attaccata da un pezzo avversario
    isPosizioneAttaccata(posizione, scacchiera) {
        const avversarioColore = (scacchiera.mossaAl === COLOR_WHITE) ? COLOR_BLACK : COLOR_BLACK;

        // Attraversa tutte le caselle della scacchiera
        for (let riga = 0; riga < 8; riga++) {
            for (let colonna = 0; colonna < 8; colonna++) {
                const pezzo = scacchiera.matrice[riga][colonna];
                if (pezzo && pezzo.colore === avversarioColore) {
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
// function isCheckReAvversario(mossa, scacchiera) {
//     //VERIFICO SE LA MOSSA GENERA UNO SCACCO AL RE AVVERSARIO
//     // Posizione del re avversario
//     const posizioneReAvversario = (scacchiera.mossaAl === COLOR_WHITE) ? scacchiera.posizioneReNero : scacchiera.posizioneReBianco;

//     // Verifica se il re avversario è sotto attacco nella nuova configurazione della scacchiera
//     const isSottoScacco = scacchiera.isPosizioneAttaccata(posizioneReAvversario, scacchieraSimulata);

//     return isSottoScacco;
// }

}





