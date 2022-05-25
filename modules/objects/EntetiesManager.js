const { DefaultMob } = require("./Entities");

class em {
    objects = {};

    constructor() {
        const object = new DefaultMob();
        this.objects[object.id] = object;
    }

    newObject () {

    }
}

module.exports = new em();