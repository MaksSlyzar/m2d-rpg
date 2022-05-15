const playersManager = require("../modules/objects/PlayersManager");
const worldObjectsManager = require("../modules/objects/WorldObjectsManager");

module.exports = {
    name: "init", // Event name
    execute (socket, data, io) {
        const player = playersManager.newPlayer(undefined);

        socket.emit("init", { ownPlayer: player, players: playersManager.players, worldObjects: worldObjectsManager.objects });
    }
}