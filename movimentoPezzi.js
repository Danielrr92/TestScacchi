let pezzoSelezionato = null; // Variabile globale per memorizzare il pezzo selezionato

function inizializzaGestoriEventiMouse(scacchiera) {
    const pezzi = document.querySelectorAll('.piece');

    pezzi.forEach((elemento) => {
        const nomePezzo = elemento.dataset.nome; // Assume che il nome del pezzo sia memorizzato nell'attributo 'data-nome' dell'elemento HTML
        const colorePezzo = elemento.dataset.colore; // Assume che il colore del pezzo sia memorizzato nell'attributo 'data-colore' dell'elemento HTML
        const posizioneIniziale = { x: elemento.offsetLeft, y: elemento.offsetTop };

        const pezzo = new Pezzo(nomePezzo, colorePezzo, posizioneIniziale);
        pezzo.setElemento(elemento);

        elemento.addEventListener('mousedown', iniziaTrascinamento);
    });

    document.addEventListener('mouseup', terminaTrascinamento);
}

function iniziaTrascinamento(event) {
    pezzoSelezionato = event.target.pezzo; // Imposta il pezzo selezionato
    scacchiera.posizionaPezzo()
    // Memorizza le coordinate del punto in cui è iniziato il trascinamento
    pezzoSelezionato.inizioTrascinamentoX = event.clientX;
    pezzoSelezionato.inizioTrascinamentoY = event.clientY;

    // Memorizza la posizione iniziale del pezzo prima del trascinamento
    pezzoSelezionato.posizioneIniziale = { x: pezzoSelezionato.elemento.offsetLeft, y: pezzoSelezionato.elemento.offsetTop };

    // Aggiunge un evento mousemove al documento per seguire il movimento del mouse
    document.addEventListener('mousemove', muoviPezzo);
}

function muoviPezzo(event) {
    if (pezzoSelezionato) {
        // Calcola la nuova posizione del pezzo basata sul movimento del mouse
        const offsetX = event.clientX - pezzoSelezionato.inizioTrascinamentoX;
        const offsetY = event.clientY - pezzoSelezionato.inizioTrascinamentoY;
        const nuovaPosizioneX = pezzoSelezionato.posizioneIniziale.x + offsetX;
        const nuovaPosizioneY = pezzoSelezionato.posizioneIniziale.y + offsetY;

        // Sposta il pezzo nella nuova posizione
        pezzoSelezionato.elemento.style.left = nuovaPosizioneX + 'px';
        pezzoSelezionato.elemento.style.top = nuovaPosizioneY + 'px';
    }
}

function terminaTrascinamento() {
    if (pezzoSelezionato) {
        // Rimuove l'evento mousemove dal documento
        document.removeEventListener('mousemove', muoviPezzo);

        // Resetta il pezzo selezionato
        pezzoSelezionato = null;
    }
}
