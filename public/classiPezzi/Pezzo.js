class Pezzo {

    colore = "";
    tipo = "";
    posizione = "";
    hasMoved = false;
    id = "";

    // Costruttore della classe
    constructor(colore, tipo, posizione) {
        this.colore = colore; // Colore del pezzo (nero o bianco)
        this.tipo = tipo; // Tipo del pezzo (torre, cavallo, alfiere, regina, re, pedone)
        this.posizione = posizione; // Posizione del pezzo 'a1' , 'a2' ecc
    }

}