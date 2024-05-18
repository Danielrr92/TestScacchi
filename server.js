const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let games = {};

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        switch (data.type) {
            case 'createGame':
                const gameId = generateGameId();
                games[gameId] = { players: [ws], board: initializeBoard() };
                ws.send(JSON.stringify({ type: 'gameCreated', gameId }));
                break;

            case 'joinGame':
                const game = games[data.gameId];
                if (game && game.players.length === 1) {
                    game.players.push(ws);
                    ws.send(JSON.stringify({ type: 'gameJoined', gameId: data.gameId }));
                    game.players[0].send(JSON.stringify({ type: 'opponentJoined' }));
                } else {
                    ws.send(JSON.stringify({ type: 'error', message: 'Game not found or already full' }));
                }
                break;

            case 'move':
                const currentGame = games[data.gameId];
                if (currentGame) {
                    currentGame.board = data.board;
                    currentGame.players.forEach(player => {
                        if (player !== ws) {
                            player.send(JSON.stringify({ type: 'move', board: data.board }));
                        }
                    });
                }
                break;
        }
    });

    ws.on('close', () => {
        // Handle player disconnection
        for (const gameId in games) {
            const game = games[gameId];
            if (game.players.includes(ws)) {
                game.players = game.players.filter(player => player !== ws);
                if (game.players.length === 0) {
                    delete games[gameId];
                } else {
                    game.players[0].send(JSON.stringify({ type: 'opponentLeft' }));
                }
                break;
            }
        }
    });
});

function generateGameId() {
    return Math.random().toString(36).substr(2, 9);
}

function initializeBoard() {
    // Initialize the chess board state
    return {
        // Your board initialization logic
    };
}

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});