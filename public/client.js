let gameId = "";
let scacchieraClient = new ScacchieraClient();
// client.js
//produzione
//const socket = new WebSocket('wss://testscacchi.onrender.com');

//test locale
const socket = new WebSocket('ws://localhost:10000');

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
            gameId = data.gameId;
            break;

        case 'gameJoined':
            console.log('Joined game with ID:', data.gameId);
            colorePlayer = (data.coloreGiocatoreDue == COLOR_WHITE) ? COLOR_WHITE : COLOR_BLACK;
            coloreItaliano = (colorePlayer == COLOR_WHITE) ? 'Bianco' : 'Nero';
            document.getElementById('messaggi').innerHTML = 'Benvenuto - giochi con il ' + coloreItaliano;
            document.getElementById('pannelloBtnInizioPartita').classList.add('hidden');
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
            //disegnamo sta scacchiera
            setBoardInitial(data.scacchiera, colorePlayer);
            break;

        case 'move':
            // La mossa è legale, aggiorno la scacchiera
            updateBoard(data.scacchiera, data.mossa);
            break;
        case 'moveValidated':
            updateBoardLogically(data.scacchiera)
            break;
        case 'invalidMove':
            
            break;
        case 'opponentLeft':
            stampaMessaggio('L\'avversario ha lasciato la partita')
            console.log('Opponent left the game');
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


