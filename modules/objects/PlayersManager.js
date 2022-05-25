const Player = require("./Player");

class pm {
    players = {};
    sockets = {};

    newPlayer (id, socket) {
        const player = new Player(id);

        player.socket = socket;

        this.players[player.id] = player;
        this.sockets[socket.id] = player;

        return this.players[player.id];
    }

    getPlayersForClient () {
        const players = {};
        for (let id in this.players) {
            players[id] = {...this.players[id], socket: null };
        }
    }
}

module.exports = new pm();