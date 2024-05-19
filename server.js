const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const Scacchiera = require('./classi/Scacchiera');
const Costanti = require('./classi/Costanti');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

let games = {};

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'createGame':
                const gameId = generateGameId();
                let coloreGiocatoreUno = decidiColoreGiocatoreUno();
                let coloreGiocatoreDue = assegnaColoreGiocatoreDue(coloreGiocatoreUno);
                games[gameId] = { players: [ws], scacchiera: initializeScacchiera(), coloreGiocatoreUno: coloreGiocatoreUno, coloreGiocatoreDue: coloreGiocatoreDue };
                ws.send(JSON.stringify({ type: 'gameCreated', gameId, game: games[gameId] }));
                break;

            case 'joinGame':
                const game = games[data.gameId];
                if (game && game.players.length === 1) {
                    game.players.push(ws);
                    ws.send(JSON.stringify({ type: 'gameJoined', gameId: data.gameId, scacchiera: game.scacchiera, coloreGiocatoreUno: game.coloreGiocatoreUno, coloreGiocatoreDue: game.coloreGiocatoreDue }));
                    game.players[0].send(JSON.stringify({ type: 'opponentJoined', gameId: data.gameId, scacchiera: game.scacchiera, coloreGiocatoreUno: game.coloreGiocatoreUno, coloreGiocatoreDue: game.coloreGiocatoreDue }));
                } else {
                    ws.send(JSON.stringify({ type: 'error', message: 'Game not found or already full' }));
                }
                break;

            case 'move':
                const currentGame = games[data.gameId];
                if (currentGame) {
                    currentGame.scacchiera = data.scacchiera;
                    currentGame.players.forEach(player => {
                        if (player !== ws) {
                            player.send(JSON.stringify({ type: 'move', scacchiera: data.scacchiera }));
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

function initializeScacchiera() {
    scacchiera = new Scacchiera();
    return scacchiera;
}

server.listen(process.env.PORT || 10000, () => {
    console.log(`Server is listening on port ${server.address().port}`);
});


function decidiColoreGiocatoreUno() {
    if (Math.random() == 0) {
        return Costanti.COLOR_WHITE;
    }
    else {
        return Costanti.COLOR_BLACK;
    }
}

function assegnaColoreGiocatoreDue(coloreGiocatoreUno) {
    if (coloreGiocatoreUno == Costanti.COLOR_BLACK) {
        return Costanti.COLOR_WHITE;
    }
    else {
        return Costanti.COLOR_BLACK;
    }
}