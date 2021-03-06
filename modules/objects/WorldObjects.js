

class WorldObject {
    x;
    y;
    id;
    width;
    height;
    events = { "onDamage": null, "onCollision": null }

    constructor(id) {
        this.x = 0;
        this.y = 0;

        this.id = id? id: Math.round(Math.random() * 100000);
    }

    setEvent (eventName, doFunction) {
        this.events[eventName] = doFunction;
    }
}

class Wood extends WorldObject {
    constructor() {
        super();

        this.x = 200;
        this.y = 200;
        this.width = 200;
        this.height = 200;
        this.collider = {
            x: 0,
            y: 0,
            radius: 100
        };

        this.spriteType = "wood";

        this.setEvent("onDamage", (data) => this.onDamage(data))
    }

    onDamage (player) {
        player.resources.wood += 5;
        player.sendData();
    }
}

module.exports = {
    Wood: Wood
}