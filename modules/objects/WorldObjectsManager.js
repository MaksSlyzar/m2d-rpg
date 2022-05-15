const { Wood } = require("./WorldObjects");

class wom {
    objects = {};

    constructor() {
        const object = new Wood();
        this.objects[object.id] = object;
    }

    newObject () {

    }
}

module.exports = new wom();