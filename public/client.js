let gameId = "";
let scacchieraClient = new ScacchieraClient();

//produzione
const socket = new WebSocket('wss://testscacchi.onrender.com');

//test locale
//const socket = new WebSocket('ws://localhost:10001');

socket.onopen = () => {
    console.log('Connected to server');
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};


socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    let coloreItaliano = '';
    let colorePlayer = '';
    switch (data.type) {
        case 'gameCreated':
            console.log('Game created with ID:', data.gameId);
            document.getElementById('labelIdPartita').innerHTML = data.gameId;
            document.getElementById('divIdPartita').classList.remove('hidden');
            document.getElementById('panelJoinGame').classList.add('hidden');
            gameId = data.gameId;
            break;

        case 'gameJoined':
            console.log('Joined game with ID:', data.gameId);
            colorePlayer = (data.coloreGiocatoreDue == COLOR_WHITE) ? COLOR_WHITE : COLOR_BLACK;
            coloreItaliano = (colorePlayer == COLOR_WHITE) ? 'Bianco' : 'Nero';
            document.getElementById('messaggi').innerHTML = 'Benvenuto - giochi con il ' + coloreItaliano;
            document.getElementById('pannelloBtnInizioPartita').classList.add('hidden');
            document.getElementById('pannelloBtnRestart').classList.add('hidden');
            //disegnamo sta scacchiera
            setBoardInitial(data.scacchiera, colorePlayer, data.gameId);
            break;

        case 'opponentJoined':
            console.log('Opponent joined the game');
            console.log('gameIdAtOpponentJoined: ' + gameId);
            colorePlayer = (data.coloreGiocatoreUno == COLOR_WHITE) ? COLOR_WHITE : COLOR_BLACK;
            coloreItaliano = (colorePlayer == COLOR_WHITE) ? 'Bianco' : 'Nero';
            document.getElementById('messaggi').innerHTML = 'Benvenuto - giochi con il ' + coloreItaliano;
            document.getElementById('pannelloBtnInizioPartita').classList.add('hidden');
            document.getElementById('pannelloBtnRestart').classList.add('hidden');
            //disegnamo sta scacchiera
            setBoardInitial(data.scacchiera, colorePlayer);
            break;

        case 'move':
            // La mossa è legale, aggiorno la scacchiera
            updateBoard(data.scacchiera, data.mossa);
            aggiornaListaMosse(data.scacchiera.listaMossePartita);
            break;
        case 'moveValidated':
            updateBoardLogically(data.scacchiera)
            aggiornaListaMosse(data.scacchiera.listaMossePartita);
            break;
        case 'invalidMove':
            //se la mossa non è data valida dal server devo annullarla graficamente e ristabilire la scacchiera
            break;
        case 'checkMate':
            updateBoardLogically(data.scacchiera)
            aggiornaListaMosse(data.scacchiera.listaMossePartita);
            stampaMessaggio('Hai vinto. Fai schifo al cazzo ugualmente. pezzo di merda infame');
            document.getElementById('pannelloBtnRestart').classList.remove('hidden');
            break;
        case 'checkMated':
            updateBoard(data.scacchiera, data.mossa);
            aggiornaListaMosse(data.scacchiera.listaMossePartita);
            stampaMessaggio('Hai perso. Fai schifo al cazzo.')
            document.getElementById('pannelloBtnRestart').classList.remove('hidden');
            break;

        case 'opponentLeft':
            stampaMessaggio('L\'avversario ha lasciato la partita')
            console.log('L\'avversario ha abbandonato la partita.');
            break;
        case 'error':
            console.log('Errore: ', data.message);
    }
};

function createGame() {
    socket.send(JSON.stringify({ type: 'createGame' }));
}

function joinGame(gameId) {
    socket.send(JSON.stringify({ type: 'joinGame', gameId }));
}

function setBoardInitial(scacchiera, coloreGiocatore) {
    scacchieraClient.inizializza(scacchiera)
    togliTutteLePedineDallaScacchiera();
    disegnaPezziImgHtml(scacchieraClient, coloreGiocatore);
    inizializzaGestoriEventiMouse(scacchieraClient, coloreGiocatore);
}


function sendMove(gameId, mossa) {
    socket.send(JSON.stringify({ type: 'move', gameId, mossa }));
}

function updateBoard(scacchiera, mossa) {
    // Update the board state in your UI
    updateBoardLogically(scacchiera)
    eseguiMossaGraficamente(scacchieraClient, mossa);
}

function updateBoardLogically(scacchiera) {
    scacchieraClient.inizializza(scacchiera)
}


function getGameId() {
    // Retrieve the game ID from your state
    return gameId;
}

function restartGame() {
    togliTutteLePedineDallaScacchiera();
    stampaMessaggio('');
    document.getElementById('pannelloBtnInizioPartita').classList.remove('hidden');
    document.getElementById('pannelloBtnRestart').classList.add('hidden');
    document.getElementById('moves').innerHTML = '';
    document.getElementById('panelJoinGame').classList.remove('hidden');
    document.getElementById('textBoxIdPartita').value = '';
    document.getElementById('divIdPartita').classList.add('hidden');
    document.getElementById('labelIdPartita').innerHTML = '';
}



function aggiornaListaMosse(listaMossePartita) {
    const movesContainer = document.querySelector('.moves');

    const ultimoElemento = listaMossePartita.at(-1);
    if (ultimoElemento.mossaNero) {
        // Mossa del nero
        const lastMoveRow = movesContainer.lastElementChild;
        const blackMoveDiv = lastMoveRow.querySelectorAll('.move')[2];
        blackMoveDiv.textContent = ultimoElemento.mossaNero.notazione;
    } else {
        // Mossa del bianco
        const moveRow = document.createElement('div');
        moveRow.classList.add('move-row');

        const counterDiv = document.createElement('div');
        counterDiv.classList.add('move');
        counterDiv.textContent = listaMossePartita.length + ')'

        const whiteMoveDiv = document.createElement('div');
        whiteMoveDiv.classList.add('move');
        whiteMoveDiv.textContent = ultimoElemento.mossaBianco.notazione

        const blackMoveDiv = document.createElement('div');
        blackMoveDiv.classList.add('move');
        blackMoveDiv.textContent = ''; // Placeholder per la mossa del nero

        moveRow.appendChild(counterDiv);
        moveRow.appendChild(whiteMoveDiv);
        moveRow.appendChild(blackMoveDiv);

        movesContainer.appendChild(moveRow);

    }

}