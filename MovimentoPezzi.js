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

    // Memorizza le coordinate del punto in cui è iniziato il trascinamento
    pezzoSelezionato.inizioX = event.clientX;
    pezzoSelezionato.inizioY = event.clientY;

    // Memorizza la posizione iniziale del pezzo prima del trascinamento
    pezzoSelezionato.posizioneInizialeX = pezzoSelezionato.offsetLeft;
    pezzoSelezionato.posizioneInizialeY = pezzoSelezionato.offsetTop;

    // Imposta il cursore a 'grabbing' durante il trascinamento
    pezzoSelezionato.style.cursor = 'grabbing';

    // Aggiunge un evento mousemove al documento per seguire il movimento del mouse
    document.addEventListener('mousemove', muoviPezzo);

}

function muoviPezzo(event) {
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
        document.removeEventListener('mousemove', muoviPezzo);

        // Ottieni la caselle di partenza e di destinazione
        const casellaPartenza = pezzoSelezionato.offsetParent.id;
        const casellaDestinazione = ottieniCasellaDestinazione(event.clientX, event.clientY);

        pezzoSelezionato.style.left = 0;
        pezzoSelezionato.style.top = 0;
        
        casellaDestinazione.appendChild(pezzoSelezionato);

        // Resetta il pezzo selezionato
        pezzoSelezionato = null;

        pezzo = scacchiera.ottieniPezzo(casellaPartenza.id);
        scacchiera.aggiornaPosizionePezzo(pezzo,casellaDestinazione.id)
        console.log(scacchiera);
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

