module.exports = class {
    x;
    y;
    id;
    color;
    socket;
    health = 100;
    maxHealth = 100;

    resources = {
        stone: 0,
        wood: 0
    };

    constructor(id) {
        this.x = 0;
        this.y = 0;
        this.color = `rgb(${Math.round(Math.random() * 254) + 1}, ${Math.round(Math.random() * 254) + 1}, ${Math.round(Math.random() * 254) + 1})`;
        console.log(this.color);
        this.id = id? id: Math.round(Math.random() * 100000);
    }

    sendData () {
        this.socket.emit("updatePlayer", { ...this, socket: null });
    }
}