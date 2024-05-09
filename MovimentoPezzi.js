let pezzoSelezionato = null; // Variabile globale per memorizzare il pezzo selezionato


//PROSSIMI STEP
//CALCOLO DELLE MOSSE DISPONIBILI(CASELLE IN CUI PUOI ANDARE) RISPETTO AL PEZZO SELEZIONATO
//se la casella selezionata non è tra quelle disponibili blocco il movimento a prescindere

//se è tra queste eseguo la mossa, se mangio copro la posizione del pezzo dove sto andando ed elimino il pezzo che c'era prima dalla scacchiera




function inizializzaGestoriEventiMouse(scacchiera) {
    const pezzi = document.querySelectorAll('.piece');

    pezzi.forEach((pezzo) => {
        pezzo.addEventListener('mousedown', (event) => iniziaTrascinamento(event, scacchiera));
        pezzo.addEventListener('mouseup', (event) => terminaTrascinamento(event, scacchiera));
    });

    //document.addEventListener('mouseup', (event) => terminaTrascinamento(event, scacchiera));
}

function iniziaTrascinamento(event, scacchiera) {
    event.preventDefault();

    pezzoSelezionato = event.target; // Imposta il pezzo selezionato
    //per debug
    console.log('Inizio Trascinameto: ' + pezzoSelezionato.id + ' Casella iniziale ' + pezzoSelezionato.offsetParent.id);

    // Memorizza le coordinate del punto in cui è iniziato il trascinamento
    pezzoSelezionato.inizioX = event.clientX;
    pezzoSelezionato.inizioY = event.clientY;

    // Memorizza la posizione iniziale del pezzo prima del trascinamento
    pezzoSelezionato.posizioneInizialeX = pezzoSelezionato.offsetLeft;
    pezzoSelezionato.posizioneInizialeY = pezzoSelezionato.offsetTop;

    // Imposta il cursore a 'grabbing' durante il trascinamento
    pezzoSelezionato.style.cursor = 'grabbing';

    // Aggiunge un evento mousemove al documento per seguire il movimento del mouse
    document.addEventListener('mousemove', muoviPezzoGraficamente);

}

function muoviPezzoGraficamente(event) {
    if (pezzoSelezionato) {
        // Calcola la distanza spostata dal mouse rispetto al punto di inizio
        const spostamentoX = event.clientX - pezzoSelezionato.inizioX;
        const spostamentoY = event.clientY - pezzoSelezionato.inizioY;

        // Calcola la nuova posizione del pezzo basata sullo spostamento
        const nuovaPosizioneX = pezzoSelezionato.posizioneInizialeX + spostamentoX;
        const nuovaPosizioneY = pezzoSelezionato.posizioneInizialeY + spostamentoY;

        // Sposta il pezzo nella nuova posizione
        pezzoSelezionato.style.left = nuovaPosizioneX + 'px';
        pezzoSelezionato.style.top = nuovaPosizioneY + 'px';
    }
}

function terminaTrascinamento(event, scacchiera) {
    // Imposta il cursore a 'grabbing' durante il trascinamento
    pezzoSelezionato.style.cursor = 'grab';
    if (pezzoSelezionato) {
        // Rimuove l'evento mousemove dal documento
        document.removeEventListener('mousemove', muoviPezzoGraficamente);

        pezzoSelezionato.style.left = 0;
        pezzoSelezionato.style.top = 0;

        // Ottieni la caselle di partenza e di destinazione        
        const divCasellaPartenza = pezzoSelezionato.offsetParent;
        const divCasellaDestinazione = ottieniCasellaDestinazione(event.clientX, event.clientY);

        //se sto spostando il pezzo fuori dalla scacchiera non faccio nulla, altrimenti procedo
        if (divCasellaDestinazione) {
            const casellaPartenza = divCasellaPartenza.id;
            const casellaDestinazione = divCasellaDestinazione.id;

            //ovviamente se ho solamente cliccato il pezzo anche solo per una frazione di secondo l'evento viene scatenato ma se ho rilasciato subito il mouse casella di partenza e casella di destinazione saranno equivalenti. 
            //in quel caso non faccio nulla.
            if (casellaPartenza != casellaDestinazione) {
                const pezzo = scacchiera.ottieniPezzo(casellaPartenza);
                let legalMove = checkIsLegalMove(scacchiera, pezzo, casellaDestinazione);
                if (legalMove) {
                    if (scacchiera.verificaCasellaOccupata(casellaDestinazione)){
                        //mangio il pezzo (lo elimino dal DOM)
                        pezzoMangiato = scacchiera.ottieniPezzo(casellaDestinazione);
                        imgPezzoMangiato = document.getElementById(pezzoMangiato.descrizione());
                        divCasellaDestinazione.removeChild(imgPezzoMangiato);
                    }          
                    //aggiorno scacchiera con nuova posizione              
                    scacchiera.aggiornaPosizionePezzo(pezzo, casellaDestinazione)
                    scacchiera.aggiornaMossaAl();
                    //sposto il pezzo sul DOM
                    divCasellaDestinazione.appendChild(pezzoSelezionato);
                }
                //stampo la nuova posizione della scacchiera
                console.log(scacchiera);
            }
        }


        pezzoSelezionato = null;
    }
}

function ottieniCasellaDestinazione(mouseX, mouseY) {
    // Effettua un'iterazione su tutte le caselle della scacchiera
    const caselle = document.querySelectorAll('.square');
    for (let casella of caselle) {
        // Controlla se il mouse si trova all'interno della casella
        const rect = casella.getBoundingClientRect();
        if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
            // Restituisci la casella corrispondente
            return casella;
        }
    }
    // Se il mouse è fuori dalla scacchiera, restituisci null
    return null;
}


function checkIsLegalMove(scacchiera, pezzo, casellaDestinazione) {
    //QUI DENTRO EFFETTUO IL CONTROLLO SE UNA MOSSA è LEGALE RICHIAMANDO IL METODO isLegalMove CONTENUTO IN OGNI CLASSE DI OGNI PEZZO DEGLI SCACCHI 
    let mossaLegale = true;
    try {

        //controllo se tocca al bianco oppure al nero
        if (!checkMossaAlBiancoMossaAlNero(scacchiera, pezzo))
            return false;

        //controllo che pezzo sto muovendo e richiamo il metodo per controllare se quel pezzo può effettuare la mossa
        switch (pezzo.tipo) {
            case "Pawn":
                if (!pezzo.isLegalMove(scacchiera, casellaDestinazione))
                    return false;
                pezzo.primaMossa = false;
                break;
            case "rook":

                break;
            case "knight":

                break;
            case "bishop":

                break;
            case "queen":

                break;
            case "king":

                break;
            default:
                //qualcosa è andato storto. errore applicazione.
                return false;
                break;


        }
    } catch (errore) {
        // Blocco di gestione dell'errore
        // Viene eseguito solo se si verifica un errore nel blocco try
        console.log('Si è verificato un errore:', errore);
        return false;
    }



    return true;
}


function checkMossaAlBiancoMossaAlNero(scacchiera, pezzo) {
    if (scacchiera.mossaAl == 'bianco') {
        if (pezzo.colore == 'black') {
            return false;
        }
    }
    else if (scacchiera.mossaAl == 'nero') {
        if (pezzo.colore == 'white') {
            return false;
        }
    }
    return true;
}