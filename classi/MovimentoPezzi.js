let pezzoSelezionato = null; // Variabile globale per memorizzare il pezzo selezionato

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
    pezzoSelezionato.style.zIndex = 2000;

    // const rect = pezzoSelezionato.getBoundingClientRect();
    // const x = rect.left;
    // const y = rect.top;

    // const nuovaPosizioneX = event.clientX - rect.left;// + (rect.width/2);
    // const nuovaPosizioneY = event.clientY - rect.top;// + (rect.height/2);

    // pezzoSelezionato.style.left = nuovaPosizioneX + 'px';
    // pezzoSelezionato.style.top = nuovaPosizioneY + 'px';

    // Aggiunge un evento mousemove al documento per seguire il movimento del mouse
    document.addEventListener('mousemove', muoviPezzoGraficamente);

}

function muoviPezzoGraficamente(event) {
    if (pezzoSelezionato) {
        // Calcola la distanza spostata dal mouse rispetto al punto di inizio
        //il punto di inizio deve essere l'immagine centrata rispetto al cursore del mouse
        const rect = pezzoSelezionato.getBoundingClientRect();
        const x = rect.left;
        const y = rect.top;

        //posizionamento dell'immagine sul
        const spostamentoCentraImmagineMouseX = 0;//event.clientX - rect.left + (rect.width / 2);
        const spostamentoCentraImmagineMouseY = 0;//event.clientY - rect.top + (rect.height / 2);
        const spostamentoX = event.clientX - pezzoSelezionato.inizioX - spostamentoCentraImmagineMouseX;
        const spostamentoY = event.clientY - pezzoSelezionato.inizioY - spostamentoCentraImmagineMouseY;

        // Calcola la nuova posizione del pezzo basata sullo spostamento
        const nuovaPosizioneX = pezzoSelezionato.posizioneInizialeX + spostamentoX;
        const nuovaPosizioneY = pezzoSelezionato.posizioneInizialeY + spostamentoY;

        // Sposta il pezzo al centro del mouse
        pezzoSelezionato.style.left = nuovaPosizioneX + 'px';
        pezzoSelezionato.style.top = nuovaPosizioneY + 'px';



        // Rimuovi la classe highlighted da tutte le caselle
        const caselle = document.querySelectorAll('.square');
        caselle.forEach((casella) => {
            casella.classList.remove('highlighted');
        });

        // Ottieni la casella sotto il cursore del mouse
        const casellaDestinazione = ottieniCasellaDestinazione(event.clientX, event.clientY);
        if (casellaDestinazione) {
            // Aggiungi la classe highlighted alla casella destinazione
            casellaDestinazione.classList.add('highlighted');
        }
    }
}


function terminaTrascinamento(event, scacchiera) {
    // Imposta il cursore a 'grabbing' durante il trascinamento
    pezzoSelezionato.style.cursor = 'grab';
    pezzoSelezionato.style.zIndex = 1000;
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
                    if (scacchiera.verificaCasellaOccupata(casellaDestinazione)) {
                        //mangio il pezzo (lo elimino dal DOM)
                        pezzoMangiato = scacchiera.ottieniPezzo(casellaDestinazione);
                        imgPezzoMangiato = document.getElementById(pezzoMangiato.id);
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

        // Rimuovi la classe highlighted da tutte le caselle
        const caselle = document.querySelectorAll('.square');
        caselle.forEach((casella) => {
            casella.classList.remove('highlighted');
        });
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
    //controllo se tocca al bianco oppure al nero
    mossaLegale = checkMossaAlBiancoMossaAlNero(scacchiera, pezzo);

    if (mossaLegale) {
        //richiamo il metodo per controllare se quel pezzo può effettuare la mossa(viene richiamato il metodo relativo alla classe del pezzo)
        switch (pezzo.tipo) {
            case PAWN:
                mossaLegale = pezzo.isLegalMove(scacchiera, casellaDestinazione);
                pezzo.primaMossa = false;
                break;
            case ROOK:
                mossaLegale = pezzo.isLegalMove(scacchiera, casellaDestinazione);
                break;
            case KNIGHT:
                mossaLegale = pezzo.isLegalMove(scacchiera, casellaDestinazione);
                break;
            case BISHOP:
                mossaLegale = pezzo.isLegalMove(scacchiera, casellaDestinazione);
                break;
            case QUEEN:
                mossaLegale = pezzo.isLegalMove(scacchiera, casellaDestinazione);
                break;
            case KING:
                mossaLegale = pezzo.isLegalMove(scacchiera, casellaDestinazione);
                break;
            default:
                //qualcosa è andato storto. errore applicazione.
                console.log(pezzo);
        }
    }

    //controllo se la mossa che sto effettuando genera uno scacco al mio re, se si non è una mossa legale perchè il pezzo è inchiodato
    if(isPezzoInchiodato(scacchiera, pezzo, casellaDestinazione))
    return mossaLegale;
}


function checkMossaAlBiancoMossaAlNero(scacchiera, pezzo) {
    toccaAMe = true;
    if (scacchiera.mossaAl == COLOR_WHITE) {
        if (pezzo.colore == COLOR_BLACK) {
            toccaAMe = false;
        }
    }
    else if (scacchiera.mossaAl == COLOR_BLACK) {
        if (pezzo.colore == COLOR_WHITE) {
            toccaAMe = false;
        }
    }
    return toccaAMe;
}