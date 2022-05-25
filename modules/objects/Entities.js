

class EntityObject {
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

class DefaultMob extends EntityObject {
    constructor() {
        super();

        this.x = 500;
        this.y = 500;
        this.width = 200;
        this.height = 200;
        this.agrCamp = {
            width: 200,
            height: 200,
            x: 500,
            y: 500
        };
        this.collider = {
            x: 0,
            y: 0,
            radius: 100
        };

        this.spriteType = null;

        this.setEvent("onDamage", (data) => this.onDamage(data))
    }

    onDamage (player) {
        player.resources.wood += 5;
        player.sendData();
    }
}

module.exports = {
    DefaultMob: DefaultMob
}