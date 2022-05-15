const Player = require("./Player");

class pm {
    players = {};

    newPlayer (id) {
        const player = new Player(id);

        this.players[player.id] = player;

        return this.players[player.id]
    }
}

module.exports = new pm();