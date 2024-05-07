class Pezzo {

    colore;
    tipo;
    posizione;
    
    // Costruttore della classe
    constructor(colore, tipo, posizione) {
        this.colore = colore; // Colore del pezzo (nero o bianco)
        this.tipo = tipo; // Tipo del pezzo (torre, cavallo, alfiere, regina, re, pedone)
        this.posizione= posizione; // Posizione del pezzo 'a1' , 'a2' ecc
    }

    // Metodo per ottenere una rappresentazione testuale del pezzo
    descrizione() {
        return this.colore + ' ' + this.tipo;
    }

    getImmagineUrl() {
        // Costruisci il percorso dell'immagine del pezzo
        return `img/${this.colore}_${this.tipo}.png`; // Supponendo che le immagini dei pezzi siano in una cartella "images"
    }

    

}