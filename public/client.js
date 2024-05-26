let gameId = "";
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

    switch (data.type) {
        case 'gameCreated':
            console.log('Game created with ID:', data.gameId);
            document.getElementById('labelIdPartita').innerHTML = data.gameId;
            document.getElementById('divIdPartita').classList.remove('hidden');
            gameId = data.gameId;
            break;

        case 'gameJoined':
            console.log('Joined game with ID:', data.gameId);
            let colore = (data.coloreGiocatoreDue == 'White') ? 'Bianco' : 'Nero';
            document.getElementById('messaggi').innerHTML = 'Benvenuto - giochi con il ' + colore;
            document.getElementById('pannelloBtnInizioPartita').classList.add('hidden');
            //disegnamo sta scacchiera
            setBoardInitial(data.scacchiera, colore, data.gameId);
            break;

        case 'opponentJoined':
            console.log('Opponent joined the game');
            console.log('gameIdAtOpponentJoined: ' + gameId);
            gameId = data.gameId;
            let colore1 = (data.coloreGiocatoreUno == 'White') ? 'Bianco' : 'Nero';
            document.getElementById('messaggi').innerHTML = 'Benvenuto - giochi con il ' + colore1;
            document.getElementById('pannelloBtnInizioPartita').classList.add('hidden');
            //disegnamo sta scacchiera
            setBoardInitial(data.scacchiera, colore1, data.gameId);
            break;

        case 'move':
            // Update the board state
            updateBoard(data.scacchiera, data.gameId);
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

function setBoardInitial(scacchiera, colore, gameId) {
    scacchieraClient = new ScacchieraClient(scacchiera)
    scacchieraClient.gameId = gameId;
    togliTutteLePedineDallaScacchiera();
    disegnaPezziImgHtml(scacchieraClient, colore);
    inizializzaGestoriEventiMouse(scacchieraClient);
}


function sendMove(gameId, mossa) {
    socket.send(JSON.stringify({ type: 'move', gameId , mossa}));
}

function updateBoard(scacchiera) {
    // Update the board state in your UI
}


function getGameId() {
    // Retrieve the game ID from your state
    return gameId;
}


