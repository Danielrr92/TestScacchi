class Scacchiera {

    constructor() {
        // Inizializzazione della scacchiera con una matrice di pezzi vuota
        this.matrice = Array(8).fill(null).map(() => Array(8).fill(null));
        this.generaPosizioneInizialePezziMatrice();
        this.mossaAl = 'bianco';
    }

    // Metodo per posizionare un pezzo nella scacchiera
    posizionaPezzo(pezzo) {
        const [riga, colonna] = this.convertiPosizioneInIndice(pezzo.posizione);
        this.matrice[riga][colonna] = pezzo;
    }

    // Metodo per ottenere il pezzo in una determinata posizione della scacchiera
    ottieniPezzo(posizione) {
        const [riga, colonna] = this.convertiPosizioneInIndice(posizione);
        return this.matrice[riga][colonna];
    }

    // Metodo per rimuovere un pezzo in una determinata posizione della scacchiera
    rimuoviPezzo(posizione){
        const [riga, colonna] = this.convertiPosizioneInIndice(posizione);
        this.matrice[riga][colonna] = null;
    }

    // Metodo per aggiornare la posizione di un pezzo sulla scacchiera
    aggiornaPosizionePezzo(pezzo, nuovaPosizione) {
        this.rimuoviPezzo(pezzo.posizione);
        pezzo.posizione = nuovaPosizione;
        this.posizionaPezzo(pezzo);
    }

    // Metodo per generare la disposizione iniziale dei pezzi sulla scacchiera
    generaPosizioneInizialePezziMatrice() {
        // Pezzi bianchi
        this.posizionaPezzo(new Pedone('white', 'a2'));
        this.posizionaPezzo(new Pedone('white', 'b2'));
        this.posizionaPezzo(new Pedone('white', 'c2'));
        this.posizionaPezzo(new Pedone('white', 'd2'));
        this.posizionaPezzo(new Pedone('white', 'e2'));
        this.posizionaPezzo(new Pedone('white', 'f2'));
        this.posizionaPezzo(new Pedone('white', 'g2'));
        this.posizionaPezzo(new Pedone('white', 'h2'));

        this.posizionaPezzo(new Torre('white', 'a1'));
        this.posizionaPezzo(new Cavallo('white', 'b1'));
        this.posizionaPezzo(new Alfiere('white', 'c1'));
        this.posizionaPezzo(new Regina('white', 'd1'));
        this.posizionaPezzo(new Re('white', 'e1'));
        this.posizionaPezzo(new Alfiere('white', 'f1'));
        this.posizionaPezzo(new Cavallo('white', 'g1'));
        this.posizionaPezzo(new Torre('white', 'h1'));

        this.posizionaPezzo(new Pedone('black', 'a7'));
        this.posizionaPezzo(new Pedone('black', 'b7'));
        this.posizionaPezzo(new Pedone('black', 'c7'));
        this.posizionaPezzo(new Pedone('black', 'd7'));
        this.posizionaPezzo(new Pedone('black', 'e7'));
        this.posizionaPezzo(new Pedone('black', 'f7'));
        this.posizionaPezzo(new Pedone('black', 'g7'));
        this.posizionaPezzo(new Pedone('black', 'h7'));

        this.posizionaPezzo(new Torre('black', 'a8'));
        this.posizionaPezzo(new Cavallo('black', 'b8'));
        this.posizionaPezzo(new Alfiere('black', 'c8'));
        this.posizionaPezzo(new Regina('black', 'd8'));
        this.posizionaPezzo(new Re('black', 'e8'));
        this.posizionaPezzo(new Alfiere('black', 'f8'));
        this.posizionaPezzo(new Cavallo('black', 'g8'));
        this.posizionaPezzo(new Torre('black', 'h8'));
    }
   

    // Metodo per convertire una posizione nella notazione 'a1' in un indice di matrice [riga][colonna]
    convertiPosizioneInIndice(posizione) {
        const colonna = posizione.charCodeAt(0) - 'a'.charCodeAt(0);
        const riga = 8 - parseInt(posizione[1]);
        return [riga, colonna];
    }

    verificaCasellaOccupata(posizione){
        const [riga, colonna] = this.convertiPosizioneInIndice(posizione);
        if(this.matrice[riga][colonna] == null)
            return false;
        else
            return true;
    }

    aggiornaMossaAl(){
        if (this.mossaAl == 'bianco'){
            this.mossaAl = 'nero';
        }
        else if(this.mossaAl == 'nero'){
            this.mossaAl = 'bianco';
        }
    }


}