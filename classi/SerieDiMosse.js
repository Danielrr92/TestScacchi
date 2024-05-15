// Definizione della classe per rappresentare una mossa
class SerieDiMosse {

    constructor(mossa) {        
        //quando creo un oggetto di questa classe tocca sicuramente al bianco, quando tocca al nero non inizializzo un'altra istanza ma aggiorno la mossa del nero con la mossa effettuata
        this.mossaBianco = mossa;
        
    }

    setMossaNero(mossa){
        this.mossaNero = mossa;
    }


}