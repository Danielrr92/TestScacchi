// client.js
const socket = new WebSocket('wss://localhost');
console.log(socket);

socket.onopen = () => {
    console.log('Connected to server');
    socket.send(JSON.stringify({ type: 'createGame' }));
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
            break;

        case 'gameJoined':
            console.log('Joined game with ID:', data.gameId);
            break;

        case 'opponentJoined':
            console.log('Opponent joined the game');
            break;

        case 'move':
            // Update the board state
            updateBoard(data.board);
            break;

        case 'opponentLeft':
            console.log('Opponent left the game');
            break;
    }
};

function sendMove(board) {
    const gameId = getGameId();
    socket.send(JSON.stringify({ type: 'move', gameId, board }));
}

function updateBoard(board) {
    // Update the board state in your UI
}

function getGameId() {
    // Retrieve the game ID from your state
}