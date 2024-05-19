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
            console.log(data.games);
            gameId = data.gameId;
            break;

        case 'gameJoined':
            console.log('Joined game with ID:', data.gameId);
            break;

        case 'opponentJoined':
            console.log('Opponent joined the game');
            break;

        case 'move':
            // Update the board state
            updateBoard(data.scacchiera);
            break;

        case 'opponentLeft':
            console.log('Opponent left the game');
            break;
        case 'error':
            console.log('Errore: ', data.message);
    }
};

function sendMove(scacchiera) {
    const gameId = getGameId();
    socket.send(JSON.stringify({ type: 'move', gameId, scacchiera }));
}

function updateBoard(scacchiera) {
    // Update the board state in your UI
}

function getGameId() {
    // Retrieve the game ID from your state
}

function createGame() {
    socket.send(JSON.stringify({ type: 'createGame' }));
}

function joinGame(gameId) {
    socket.send(JSON.stringify({ type: 'joinGame', gameId }));
}