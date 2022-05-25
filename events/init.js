const playersManager = require("../modules/objects/PlayersManager");
const worldObjectsManager = require("../modules/objects/WorldObjectsManager");
const entetiesManager = require("../modules/objects/EntetiesManager");

module.exports = {
    name: "init", // Event name
    execute (socket, data, io) {
        const player = { ...playersManager.newPlayer(undefined, socket), socket: null };

        socket.emit("init", { ownPlayer: player, players: playersManager.getPlayersForClient(), worldObjects: worldObjectsManager.objects, enteties: entetiesManager.objects });
    }
}