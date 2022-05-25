const playersManager = require("../modules/objects/PlayersManager");
const worldObjectsManager = require("../modules/objects/WorldObjectsManager");

module.exports = {
    name: "hitWorldObject", // Event name
    execute (socket, data, io) {
        const player = playersManager.sockets[socket.id];

        const hitWorldObjectId = data.hitWorldObjectId;

        const hitObject = worldObjectsManager.objects[hitWorldObjectId];

        if (hitObject == undefined)
            return;

        hitObject.events.onDamage(player);
    }
}