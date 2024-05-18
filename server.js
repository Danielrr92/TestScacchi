const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
console.log("app express creata")
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.static(path.join(__dirname, 'public')));

let games = {};

wss.on('connection', (ws) => {
    console.log("wss.connection - iniziato");
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log("data.type: " + data.type);
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
    return {
        // Initial chess board setup
    };
}

console.log(process.env.PORT);

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server is listening on port ${server.address().port}`);
});
