class Mossa {

    constructor(pezzo, casellaPartenza, casellaDestinazione) {
        this.pezzo = pezzo;
        this.casellaPartenza = casellaPartenza;
        this.casellaDestinazione = casellaDestinazione; 
        this.notazione = this.pezzo.notazione + "" + this.casellaDestinazione;
        this.isArrocco = false;
    }

    verificaLegalitaMossa(scacchiera) {
        this.pezzo.isLegalMove(scacchiera, this.casellaDestinazione);
    }
}

module.exports = Mossa