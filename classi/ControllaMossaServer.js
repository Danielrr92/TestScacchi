const Costanti = require('./Costanti');
const Mossa = require('./Mossa');
const Checks = require('./Checks');

class ControllaMossaServer {

    constructor() {

    }

    verificaMossa(scacchiera, mossaClient) {
        try {
            const casellaPartenza = mossaClient.casellaPartenza;
            const casellaDestinazione = mossaClient.casellaDestinazione;

            //pezzo che sto muovendo
            const pezzo = scacchiera.ottieniPezzo(casellaPartenza);

            //converto la mossa che arriva in mossa per il server
            const mossa = new Mossa(pezzo, casellaPartenza, casellaDestinazione)

            //verifico se sto eseguendo l'arrocco
            const [rigaCasellaDestinazione, colonnaCasellaDestinazione] = scacchiera.convertiPosizioneInIndice(casellaDestinazione);
            const [rigaCasellaPartenza, colonnaCasellaPartenza] = scacchiera.convertiPosizioneInIndice(casellaPartenza);
            if (pezzo.tipo === Costanti.KING && Math.abs(colonnaCasellaDestinazione - colonnaCasellaPartenza) === 2) {
                mossa.isArrocco = true;
            }


            //controllo se è una mossa compresa nelle possibilità di quel pezzo
            if (!this.checkIsLegalMove(scacchiera, mossa)) {
                throw new Error("Questo pezzo non può fare questa mossa")
            }

            //se c'è un pezzo nella casella di destinazione me lo salvo così dopo i controlli non va perduto
            const pezzoMangiato = scacchiera.ottieniPezzo(mossa.casellaDestinazione);

            const checks = new Checks()
            let posizioneInizialeTorre;
            let posizioneArrivoTorre;
            if (mossa.isArrocco) {
                //mossa arrocco
                const lato = colonnaCasellaDestinazione === 6 ? Costanti.KING : Costanti.QUEEN;
                [posizioneInizialeTorre, posizioneArrivoTorre] = scacchiera.eseguiArrocco(pezzo.colore, lato, mossa.casellaDestinazione);
            } else if (pezzo.tipo === Costanti.PAWN && (rigaCasellaDestinazione === 0 || rigaCasellaDestinazione === 7)) {
                //mossa promozione pedone
                mostraSelezionePromozione(pezzo, casellaDestinazione, scacchiera);

                const pezzoInchiodatoSulProprioRe = checks.checkIsPezzoInchiodatoSulMioRe(scacchiera);
                if (pezzoInchiodatoSulProprioRe) {
                    //gestisci annulla mossa promozione nel caso in cui il pezzo è inciodato sul proprio re
                }

            } else {
                //aggiorno scacchiera con nuova posizione              
                scacchiera.aggiornaPosizionePezzo(mossa);

                //verifica che il pezzo che sto muovendo non sia inchiodato sul proprio re
                const pezzoInchiodatoSulProprioRe = checks.checkIsPezzoInchiodatoSulMioRe(scacchiera);
                if (pezzoInchiodatoSulProprioRe) {
                    //ripristino la scacchiera a com'era prima della mossa illegale (pezzo inchiodato)
                    scacchiera.annullaUltimaMossa(pezzo, casellaPartenza);
                    throw new Error("Il pezzo che cerchi di muovere è inchiodato sul tuo re")
                }
            }

            //se la mossa va bene, tolgo il mio re da qualsiasi eventuale posizione di scacco(altrimenti non avrei potuto fare la mossa)
            const posizioneMioRe = (scacchiera.mossaAl === Costanti.COLOR_WHITE) ? scacchiera.posizioneReBianco : scacchiera.posizioneReNero;
            const mioRe = scacchiera.ottieniPezzo(posizioneMioRe)
            mioRe.isSottoScacco = false;

            //controllo se sto dando uno scacco al re avversario
            const stoDandoScaccoAlReAvversario = checks.isCheckReAvversario(scacchiera);
            if (stoDandoScaccoAlReAvversario) {
                //se sto dando scacco al re avversario salvo la variabile isSottoScacco a true
                const posizioneReAvversario = (scacchiera.mossaAl === Costanti.COLOR_WHITE) ? scacchiera.posizioneReNero : scacchiera.posizioneReBianco;
                const reAvversario = scacchiera.ottieniPezzo(posizioneReAvversario)
                reAvversario.isSottoScacco = true;
                //devo controllare se è scacco matto, se si finisce la partita
                if (checks.checkIfIsScaccoMatto(scacchiera)) {
                    scacchiera.isScaccoMatto = true;

                } else {
                    //stampaMessaggio('Scacco al Re ' + reAvversario.colore + '!')
                }
            }
            else {
                //cancello la lavagna messaggi
                stampaMessaggio('');
            }

            switch (pezzo.tipo) {
                case Costanti.PAWN:
                    pezzo.primaMossa = false;
                    break;
                case Costanti.KING:
                    if (scacchiera.mossaAl == COLOR_WHITE)
                        scacchiera.posizioneReBianco = casellaDestinazione;
                    else
                        scacchiera.posizioneReNero = casellaDestinazione;
                    break;
            }

            scacchiera.aggiornaMossaAl();

            if (scacchiera.isScaccoMatto) {
                stampaMessaggio('SACCO MATTOOOO - PARTITA TERMINATA');
            }

            return true;
        } catch (error) {
            return error.message;
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

    ottieniCasellaDestinazione(mouseX, mouseY) {
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


    checkIsLegalMove(scacchiera, mossa) {
        //controllo se tocca al bianco oppure al nero
        this.checkMossaAlBiancoMossaAlNero(scacchiera, mossa);
        //se la mossa che sto facendo è arrocco eseguo dei controlli differenti specifici, altrimenti richiamo i normali controlli
        if (mossa.isArrocco) {
            const [riga, colonna] = scacchiera.convertiPosizioneInIndice(mossa.casellaDestinazione)
            const lato = colonna === 6 ? Costanti.KING : Costanti.QUEEN;
            if (!scacchiera.isArroccoLegale(mossa.pezzo, lato)) {
                throw new Error("Arrocco non è una mossa possibile");
            }
        } else {
            mossa.verificaLegalitaMossa(scacchiera);
        }
        return true;
    }


    checkMossaAlBiancoMossaAlNero(scacchiera, mossa) {
        if (scacchiera.mossaAl == Costanti.COLOR_WHITE && mossa.pezzo.colore == Costanti.COLOR_BLACK) {
            throw new Error("Tocca al bianco")
        }
        if (scacchiera.mossaAl == Costanti.COLOR_BLACK && mossa.pezzo.colore == Costanti.COLOR_WHITE) {
            throw new Error("Tocca al nero")
        }
    }


    // mostraSelezionePromozione(pezzo, casellaDestinazione, scacchiera) {
    //     const divSelezionePromozione = document.createElement('div');
    //     divSelezionePromozione.id = 'selezione-promozione';
    //     divSelezionePromozione.innerHTML = `
    //             <button data-pezzo="QUEEN">Regina</button>
    //             <button data-pezzo="ROOK">Torre</button>
    //             <button data-pezzo="BISHOP">Alfiere</button>
    //             <button data-pezzo="KNIGHT">Cavallo</button>
    //         `;
    //     document.body.appendChild(divSelezionePromozione);

    //     const bottoniPromozione = divSelezionePromozione.querySelectorAll('button');
    //     bottoniPromozione.forEach((button) => {
    //         button.addEventListener('click', (event) => {
    //             const tipoPezzo = event.target.getAttribute('data-pezzo');
    //             promuoviPedone(pezzo, tipoPezzo, casellaDestinazione, scacchiera);
    //             document.body.removeChild(divSelezionePromozione);
    //         });
    //     });
    // }

    // function promuoviPedone(pezzo, tipoPezzo, casellaDestinazione, scacchiera) {
    //     pezzo.tipo = tipoPezzo;
    //     scacchiera.aggiornaPosizionePezzo(new Mossa(pezzo, pezzo.posizione, casellaDestinazione));
    //     pezzo.posizione = casellaDestinazione;

    //     const pezzoPromosso = document.createElement('img');
    //     pezzoPromosso.src = pezzo.getImmagineUrl();
    //     pezzoPromosso.id = pezzo.id;
    //     pezzoPromosso.classList.add('piece');
    //     pezzoPromosso.style.draggable = false;
    //     pezzoPromosso.dataset.dataNome = pezzo.tipo



    //     const divCasellaDestinazione = document.getElementById(casellaDestinazione);
    //     divCasellaDestinazione.innerHTML = '';
    //     divCasellaDestinazione.appendChild(pezzoPromosso);

    // }
}


module.exports = ControllaMossaServer;