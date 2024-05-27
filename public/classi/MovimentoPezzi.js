let pezzoSelezionato = null; // Variabile globale per memorizzare il pezzo selezionato

function inizializzaGestoriEventiMouse(scacchieraClient, coloreGiocatore) {
    const pezzi = document.querySelectorAll('.piece');

    pezzi.forEach((pezzo) => {
        // cambia iniziaTrascinamento con selezione pezzo / integra in modo che posso effettuare la mossa anche cliccando sul pezzo e poi cliccando sulla casella 
        pezzo.addEventListener('mousedown', (event) => iniziaTrascinamento(event, scacchieraClient));
        pezzo.addEventListener('mouseup', (event) => terminaTrascinamento(event, scacchieraClient, coloreGiocatore));
    });

}

function iniziaTrascinamento(event, scacchieraClient) {
    event.preventDefault();

    pezzoSelezionato = event.target; // Imposta il pezzo selezionato
    //per debug
    console.log('Inizio Trascinameto: ' + pezzoSelezionato.id + ' Casella iniziale ' + pezzoSelezionato.offsetParent.id + 'z-index: ' + pezzoSelezionato.zIndex);

    // Memorizza le coordinate del punto in cui è iniziato il trascinamento
    pezzoSelezionato.inizioX = event.clientX;
    pezzoSelezionato.inizioY = event.clientY;

    // Memorizza la posizione iniziale del pezzo prima del trascinamento
    pezzoSelezionato.posizioneInizialeX = pezzoSelezionato.offsetLeft;
    pezzoSelezionato.posizioneInizialeY = pezzoSelezionato.offsetTop;

    // Imposta il cursore a 'grabbing' durante il trascinamento
    pezzoSelezionato.style.cursor = 'grabbing';
    pezzoSelezionato.style.zIndex = 2000;


    // Aggiunge un evento mousemove al documento per seguire il movimento del mouse
    document.addEventListener('mousemove', muoviPezzoGraficamente);

    //istruzione che colora le caselle disponibili per ogni pezzo che seleziono
    const pezzo = scacchieraClient.ottieniPezzo(pezzoSelezionato.offsetParent.id);
    const mossePossibili = pezzo.trovaMosseDisponibili(scacchieraClient);
    mossePossibili.forEach((mossa) => {
        const casellaMossaPossibile = document.getElementById(mossa);
        casellaMossaPossibile.classList.add('casellaMossaPossibile');
    })
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


function terminaTrascinamento(event, scacchieraClient, coloreGiocatore) {
    try {
        // Imposta il cursore a 'grabbing' durante il trascinamento
        pezzoSelezionato.style.cursor = 'grab';
        pezzoSelezionato.style.zIndex = 1000;

        if (!pezzoSelezionato) {
            throw new Error("Errore pezzo selezionato. WTF")
        }
        // Rimuove l'evento mousemove dal documento
        document.removeEventListener('mousemove', muoviPezzoGraficamente);


        pezzoSelezionato.style.left = 0;
        pezzoSelezionato.style.top = 0;

        if (pezzoSelezionato.dataset.colore !== coloreGiocatore) {
            throw new Error('Non puoi muovere i pezzi dell\'avversario');
        }

        // Ottieni la caselle di partenza e di destinazione        
        const divCasellaPartenza = pezzoSelezionato.offsetParent;
        const divCasellaDestinazione = ottieniCasellaDestinazione(event.clientX, event.clientY);

        //se sto spostando il pezzo fuori dalla scacchiera non faccio nulla, altrimenti procedo
        if (!divCasellaDestinazione) {
            throw new Error("Non puoi spostare il pezzo fuori dalla scacchiera")
        }
        const casellaPartenza = divCasellaPartenza.id;
        const casellaDestinazione = divCasellaDestinazione.id;

        //ovviamente se ho solamente cliccato il pezzo anche solo per una frazione di secondo l'evento viene scatenato ma se ho rilasciato subito il mouse casella di partenza e casella di destinazione saranno equivalenti. 
        //in quel caso non faccio nulla.
        if (casellaPartenza == casellaDestinazione) {
            throw new Error("Non hai spostato il pezzo dalla sua casella iniziale")
        }

        //pezzo che sto muovendo
        const pezzo = scacchieraClient.ottieniPezzo(casellaPartenza);




        //mossa che sto effettuando ad es. Ab3
        const mossa = new Mossa(pezzo, casellaPartenza, casellaDestinazione);

        //verifico se sto eseguendo l'arrocco
        const [rigaCasellaDestinazione, colonnaCasellaDestinazione] = scacchieraClient.convertiPosizioneInIndice(casellaDestinazione);
        const [rigaCasellaPartenza, colonnaCasellaPartenza] = scacchieraClient.convertiPosizioneInIndice(casellaPartenza);
        if (pezzo.tipo === KING && Math.abs(colonnaCasellaDestinazione - colonnaCasellaPartenza) === 2) {
            mossa.isArrocco = true;
        }


        //controllo se è una mossa compresa nelle possibilità di quel pezzo
        if (!checkIsLegalMove(scacchieraClient, mossa)) {
            throw new Error("Questo pezzo non può fare questa mossa")
        }

        //se c'è un pezzo nella casella di destinazione me lo salvo così dopo i controlli non va perduto
        const pezzoMangiato = scacchieraClient.ottieniPezzo(mossa.casellaDestinazione);

        const checks = new Checks()
        let posizioneInizialeTorre;
        let posizioneArrivoTorre;
        if (mossa.isArrocco) {
            //mossa arrocco
            const lato = colonnaCasellaDestinazione === 6 ? KING : QUEEN;
            [posizioneInizialeTorre, posizioneArrivoTorre] = scacchieraClient.eseguiArrocco(pezzo.colore, lato, mossa.casellaDestinazione);
        } else if (pezzo.tipo === PAWN && (rigaCasellaDestinazione === 0 || rigaCasellaDestinazione === 7)) {

            //mossa promozione pedone
            mostraSelezionePromozione(pezzo, casellaDestinazione, scacchieraClient);

            const pezzoInchiodatoSulProprioRe = checks.checkIsPezzoInchiodatoSulMioRe(scacchieraClient);
            if (pezzoInchiodatoSulProprioRe) {
                //gestisci annulla mossa promozione nel caso in cui il pezzo è inciodato sul proprio re (DA CONTROLLARE PER VEDERE SE è CORRETTO)
                pezzo.posizione = casellaPartenza;
                pezzo.tipo = PAWN;
                if (pezzoMangiato) {
                    //se dopo aver promosso il pedone(mangiando anche un pezzo avversario) mi accorgo che la mossa è illegale dev rimettere il pezzo avversario nella posizione di prima
                    //il pezzo mangiato nella scacchiera logica non c'è proprio più e devo ricrearlo
                    scacchieraClient.annullaUltimaMossa(pezzo, casellaPartenza)
                    const imgPezzoMangiato = document.getElementById(pezzoMangiato.id);
                    //rimetto il pezzo graficamente al posto suo
                    divCasellaDestinazione.appendChild(imgPezzoMangiato);
                    throw new exception("Il pezzo che cerchi di muovere è inchiodato sul tuo re")
                }
            }

        } else {
            //aggiorno scacchiera con nuova posizione              
            scacchieraClient.aggiornaPosizionePezzo(mossa);

            //verifica che il pezzo che sto muovendo non sia inchiodato sul proprio re
            const pezzoInchiodatoSulProprioRe = checks.checkIsPezzoInchiodatoSulMioRe(scacchieraClient);
            if (pezzoInchiodatoSulProprioRe) {
                //ripristino la scacchiera a com'era prima della mossa illegale (pezzo inchiodato)
                scacchieraClient.annullaUltimaMossa(pezzo, casellaPartenza);
                throw new Error("Questa mossa non è valida perchè sei sotto scacco oppure questo pezzo è inchiodato sul tuo re.")
            }
        }
        //invio la mossa al server
        sendMove(scacchieraClient.gameId, mossa);


        //variabili per la verifica di un eventuale pezzo mangiato (modifiche DOM)
        if (pezzoMangiato) {
            const imgPezzoMangiato = document.getElementById(pezzoMangiato.id);
            //elimino il pezzo mangiato dal DOM
            divCasellaDestinazione.removeChild(imgPezzoMangiato);
        }

        //sposto il pezzo graficamente sul DOM
        divCasellaPartenza.removeChild(pezzoSelezionato);
        divCasellaDestinazione.appendChild(pezzoSelezionato);
        if (mossa.isArrocco) {
            //riposiziono la torre arroccata nella nuova posizione graficamente
            const divTorrePrimaDiArroccare = document.getElementById(posizioneInizialeTorre);
            const divTorreArroccata = document.getElementById(posizioneArrivoTorre);
            const torreArroccata = scacchieraClient.ottieniPezzo(posizioneInizialeTorre);
            //elimino la torre da dove si trovava
            const imgTorreArrocco = document.getElementById(torreArroccata.id);
            divTorrePrimaDiArroccare.removeChild(imgTorreArrocco);
            divTorreArroccata.appendChild(imgTorreArrocco);
        }


        if (scacchiera.isScaccoMatto) {
            stampaMessaggio('SACCO MATTOOOO - PARTITA TERMINATA');
        }

        pezzoSelezionato = null;
    } catch (error) {
        if (scacchieraClient.isScaccoMatto) {
            stampaMessaggio('SACCO MATTOOOO - PARTITA TERMINATA');
        } else {
            stampaMessaggio(error.message);
        }
    }

    // Rimuovi la classe highlighted da tutte le caselle
    const caselleMossePossibili = document.querySelectorAll('.square');
    caselleMossePossibili.forEach((casella) => {
        casella.classList.remove('casellaMossaPossibile');
        casella.classList.remove('highlighted');
    });

    //stampo la nuova posizione della scacchiera
    //console.log(scacchiera);

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
    //controllo se tocca al bianco oppure al nero
    checkMossaAlBiancoMossaAlNero(scacchiera, mossa);
    //se la mossa che sto facendo è arrocco eseguo dei controlli differenti specifici, altrimenti richiamo i normali controlli
    if (mossa.isArrocco) {
        const [riga, colonna] = scacchiera.convertiPosizioneInIndice(mossa.casellaDestinazione)
        const lato = colonna === 6 ? KING : QUEEN;
        if (!scacchiera.isArroccoLegale(mossa.pezzo, lato)) {
            throw new Error("Arrocco non è una mossa possibile");
        }
    } else {
        mossa.verificaLegalitaMossa(scacchiera);
    }
    return true;
}


function checkMossaAlBiancoMossaAlNero(scacchiera, mossa) {
    if (scacchiera.mossaAl == COLOR_WHITE && mossa.pezzo.colore == COLOR_BLACK) {
        throw new Error("Tocca al bianco")
    }
    if (scacchiera.mossaAl == COLOR_BLACK && mossa.pezzo.colore == COLOR_WHITE) {
        throw new Error("Tocca al nero")
    }
}


function mostraSelezionePromozione(pezzo, casellaDestinazione, scacchiera) {
    const divSelezionePromozione = document.createElement('div');
    divSelezionePromozione.id = 'selezione-promozione';
    divSelezionePromozione.innerHTML = `
        <button data-pezzo="Queen">Regina</button>
        <button data-pezzo="Rook">Torre</button>
        <button data-pezzo="Bishop">Alfiere</button>
        <button data-pezzo="Knight">Cavallo</button>
    `;
    document.body.appendChild(divSelezionePromozione);

    const bottoniPromozione = divSelezionePromozione.querySelectorAll('button');
    bottoniPromozione.forEach((button) => {
        button.addEventListener('click', (event) => {
            const tipoPezzo = event.target.getAttribute('data-pezzo');
            promuoviPedone(pezzo, tipoPezzo, casellaDestinazione, scacchiera);
        });
    });
}


function promuoviPedone(pezzo, tipoPezzo, casellaDestinazione, scacchiera) {
    pezzo.tipo = tipoPezzo;
    scacchiera.aggiornaPosizionePezzo(new Mossa(pezzo, pezzo.posizione, casellaDestinazione));

    const imgPezzoPromosso = document.getElementById(pezzo.id);
    imgPezzoPromosso.src = getImmagineUrl(pezzo.colore, pezzo.tipo);
    imgPezzoPromosso.dataset.nome = pezzo.tipo;
    imgPezzoPromosso.dataset.colore = pezzo.colore;



    const divCasellaDestinazione = document.getElementById(casellaDestinazione);
    divCasellaDestinazione.innerHTML = '';
    divCasellaDestinazione.appendChild(imgPezzoPromosso);

}