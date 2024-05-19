
function togliTutteLePedineDallaScacchiera(){
    const pezzi = document.querySelectorAll('.piece');

    pezzi.forEach((pezzo) => {
        pezzo.parentNode.removeChild(pezzo);
    });
}

function disegnaPezziImgHtml(scacchiera) {
    // Ottieni tutte le caselle della scacchiera
    const caselle = document.querySelectorAll('.square');

    // Attraversa ogni casella e posiziona il pezzo corrispondente
    caselle.forEach((casella) => {
        const pezzo = scacchiera.ottieniPezzo(casella.id);
        if (pezzo) {
            // Aggiungi l'immagine del pezzo come background della casella nel caso in cui esistesse il pezzo su quella casella    
            casella.appendChild(creaImgPezzo(pezzo, casella));
        }
    });
}


function creaImgPezzo(pezzo) {
    const htmlPieceImg = document.createElement('img');
    htmlPieceImg.src = pezzo.getImmagineUrl();
    htmlPieceImg.id = pezzo.id;
    htmlPieceImg.classList.add('piece');
    htmlPieceImg.style.draggable = false;
    htmlPieceImg.dataset.dataNome = pezzo.tipo
    return htmlPieceImg;
}