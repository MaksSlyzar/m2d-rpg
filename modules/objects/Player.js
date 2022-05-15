module.exports = class {
    x;
    y;
    id;
    color;

    constructor(id) {
        this.x = 0;
        this.y = 0;
        this.color = `rgb(${Math.round(Math.random() * 254) + 1}, ${Math.round(Math.random() * 254) + 1}, ${Math.round(Math.random() * 254) + 1})`;
        console.log(this.color);
        this.id = id? id: Math.round(Math.random() * 100000);
    }
}