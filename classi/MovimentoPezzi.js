let pezzoSelezionato = null; // Variabile globale per memorizzare il pezzo selezionato

function inizializzaGestoriEventiMouse(scacchiera) {
    const pezzi = document.querySelectorAll('.piece');

    pezzi.forEach((pezzo) => {
        // cambia iniziaTrascinamento con selezione pezzo / integra in modo che posso effettuare la mossa anche cliccando sul pezzo e poi cliccando sulla casella 
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
                //oggetto pezzo che sto muovendo
                const pezzo = scacchiera.ottieniPezzo(casellaPartenza);

                //mossa che sto effettuando ad es. Ab3
                const mossa = new Mossa(pezzo, casellaPartenza, casellaDestinazione);
                //controllo se è una mossa compresa nelle possibilità di quel pezzo
                let legalMove = checkIsLegalMove(scacchiera, mossa);
                if (legalMove) {
                    //verifico se la casella di destinazione è occupata, in quel caso sto mangiando la pedina
                    const casellaOccupata = scacchiera.verificaCasellaOccupata(mossa.casellaDestinazione);
                    const pezzoMangiato = scacchiera.ottieniPezzo(mossa.casellaDestinazione);

                    //aggiorno scacchiera con nuova posizione              
                    scacchiera.aggiornaPosizionePezzo(mossa);

                    //controllo eventuali scacchi al mio re(mossa illegale, annullo la mossa) oppure al re avversario(prendo provvedimenti sulle mosse legali del mio avversario al prossimo turno)
                    const checks = new Checks()
                    let pezzoInchiodatoSulProprioRe = checks.checkIsPezzoInchiodatoSulMioRe(scacchiera);
                    if (pezzoInchiodatoSulProprioRe) {
                        //ripristino la scacchiera a com'era prima della mossa illegale (pezzo inchiodato)
                        scacchiera.annullaUltimaMossa(pezzo, pezzoMangiato, casellaPartenza);
                    } else {
                        //terminati i controlli e verificato che la mossa è legale, effettuo la mossa graficamente ed aggiorno alcune proprietà del pezzo e della scacchiera. infine aggiorno chi deve muovere tra il bianco e il nero
                        switch (pezzo.tipo) {
                            case PAWN:
                                pezzo.primaMossa = false;
                                break;
                            case ROOK:
                                break;
                            case KNIGHT:
                                break;
                            case BISHOP:
                                break;
                            case QUEEN:
                                break;
                            case KING:
                                if (scacchiera.mossaAl == COLOR_WHITE)
                                    scacchiera.posizioneReBianco = casellaDestinazione;
                                else
                                    scacchiera.posizioneReNero = casellaDestinazione;
                                break;
                        }
                        scacchiera.aggiornaMossaAl();

                        //variabili per la verifica di un eventuale pezzo mangiato (modifiche DOM)
                        if (casellaOccupata && pezzoMangiato) {                            
                            const imgPezzoMangiato = document.getElementById(pezzoMangiato.id);
                            //elimino il pezzo mangiato dal DOM
                            divCasellaDestinazione.removeChild(imgPezzoMangiato);
                        }

                        //sposto il pezzo sul DOM
                        divCasellaPartenza.removeChild(pezzoSelezionato);
                        divCasellaDestinazione.appendChild(pezzoSelezionato);
                    }

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


function checkIsLegalMove(scacchiera, mossa) {
    try {
        //controllo se tocca al bianco oppure al nero
        checkMossaAlBiancoMossaAlNero(scacchiera, mossa);
        //richiamo il metodo per controllare se quella mossa è compresa nell'insieme di mosse possibili per quella pedina
        mossa.verificaLegalitaMossa(scacchiera);
        //controllo se la mossa che sto effettuando genera uno scacco al re avversario. se si è ovviamente una mossa legale ma devo gestire poi le mosse che potrà fare l'avversario
    } catch (Error) {
        console.log(Error.message);
        stampaMessaggio(Error.message);
        return false;
    }
    return true;
}


function checkMossaAlBiancoMossaAlNero(scacchiera, mossa) {
    toccaAMe = true;
    if (scacchiera.mossaAl == COLOR_WHITE) {
        if (mossa.pezzo.colore == COLOR_BLACK) {
            throw new Error("Tocca al bianco")
        }
    }
    else if (scacchiera.mossaAl == COLOR_BLACK) {
        if (mossa.pezzo.colore == COLOR_WHITE) {
            throw new Error("Tocca al nero")
        }
    }
}