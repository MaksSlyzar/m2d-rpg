class Game {
    networkInit = false;
    worldObjects = [];
    sprites = {};
    entities = {};

    constructor(canvas, io) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.camera = new Camera();

        this.players = {};
        this.ownPlayer = {};
        this.marker = new Marker();

        this.socket = io();
        this.socket.emit('init');
        this.socket.on('init', (data) => this.init(data));

        this.canvas.onclick = (event) => this.click(event);

        this.loadSprites();
        this.update();
    }

    update () {
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        if (this.networkInit) {
            this.moveObjects();
            this.worldObjects.map(object => object.draw(this.context, this.sprites));
            this.ownPlayer.draw(this.context, this.sprites);
            this.marker.draw(this.context);
        }

        requestAnimationFrame(() => this.update());
    }

    moveObjects () {
        const plX = this.ownPlayer.x;
        const plY = this.ownPlayer.y;

        if (this.marker.go)
            this.marker.go = this.ownPlayer.moveTo(new Point(this.marker.x - 25, this.marker.y - 25))?false: this.marker.go;

        // this.worldObjects.map(object => object.collision(this.ownPlayer));

        for (let wo = 0; wo < this.worldObjects.length; wo++) {
            if (this.worldObjects[wo].collision(this.ownPlayer)) {

                if (this.ownPlayer.hitObject != null) {
                    if (this.worldObjects[wo].id == this.ownPlayer.hitObject.id) {
                        if (this.ownPlayer.hitting == false)
                            this.ownPlayer.hit();
                    }
                }

                this.ownPlayer.x = plX;
                this.ownPlayer.y = plY;
                break;
            };
        }

        if (this.marker.go == false) {
            if (this.ownPlayer.hitting == true) {
                this.ownPlayer.closeHit();
            }
        }
    }

    init (data) {
        console.log(data)
        this.ownPlayer = new OwnPlayer(this.socket);
        this.networkInit = true;
        this.ownPlayer.color = data.ownPlayer.color;
        this.entities = data.entities;

        const values = Object.values(data.worldObjects);

        for (let i = 0; i < values.length; i++) {
            this.worldObjects.push(new WorldObject(values[i]));
        }

        this.marker.init(this.context, this.sprites['marker2']);
    }

    click (event) {
        const clickX = event.offsetX;
        const clickY = event.offsetY;

        this.marker.setPosition(new Point(clickX, clickY));

        const collidingWorldObjects = this.worldObjects.filter(object => object.collision({ x: clickX, y: clickY, collider: {x:0, y:0, radius:1} }));

        if (collidingWorldObjects.length > 0)
            this.ownPlayer.hitObject = collidingWorldObjects[0];

    }

    loadSprites () {
        this.sprites['wood'] = new Sprite('wood', './images/stone.png', 1000, 1000);
        this.sprites['marker'] = new Sprite('marker', './images/marker.png', 150, 25, true, 25, 25);
        this.sprites['marker2'] = new Sprite('marker2', './images/marker2.png', 320, 40, true, 40, 40);
        this.sprites['man1_run'] = new Sprite('man_run', './images/man1.png', 320, 80, true, 80, 80);
        this.sprites['default_axe'] = new Sprite('default_axe', './images/defaultAxe.png', 70, 30);
    }
}

class Marker {
    go = false;
    x;
    y;
    spritePosition = -1;

    init (context, tiles) {
        this.context = context;
        this.tiles = tiles;
    }



    setPosition (point) {
        this.spritePosition = 0;
        this.x = point.x;
        this.y = point.y;
        this.go = true;
    }

    draw (context) {
        if (this.x == null) return undefined;

        // context.fillStyle = 'brown';
        // context.fillRect(this.x - 5, this.y - 5, 10, 10);
        if (this.spritePosition != -1) {
            context.drawImage(this.tiles.image, this.spritePosition * 40, 0, 40, 40, this.x - 20, this.y - 20, 40, 40);

            this.spritePosition++;
            if (this.spritePosition > 7)
                this.spritePosition = -1;
        }
    }

}

class Sprite {
    loaded = false;
    image = new Image();

    constructor(name, source, width, height, tiles, tileWidth, tileHeight) {
        this.name = name;
        this.source = source;
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        this.load(source);
    }

    load (source) {
        this.image.src =  source;

        this.image.onload = () => this.loaded = true;
    }
}

class Player {
    x = 0;
    y = 0;
}

class Camera {
    x = 0;
    y = 0;
}

class Entity {
    constructor(data) {
        this.spriteType = data.spriteType;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.id = data.id;
    }
}

class OwnPlayer {
    x = 0;
    y = 0;
    width = 80;
    height = 80;
    collider = {
        radius: 30,
        x: 10,
        y: 10
    };
    speed = 5;
    radius = this.width / 2;
    hitObject = null;
    rotateAngle = 0.4;
    hitting = false;
    hitCooldownMax = 1000;
    hitIntervalId = null;
    playerAnimationController = null;
    resources = { wood: 0, stone: 0 };
    inventory = {
        arms: 'defaultAxe'
    };

    constructor(socket) {
        this.socket = socket;
        this.playerAnimationController = new PlayerAnimationController(this);
        WoodResourceView.innerHTML = this.resources.wood;

        socket.on('updatePlayer', data => {
            this.resources = data.resources;
            WoodResourceView.innerHTML = this.resources.wood;
        });
    }

    draw (context, sprites, playerAnimationController) {
        context.save();
        context.fillStyle = 'rgba(23, 80, 51, 0.2)';
        context.beginPath();
        context.arc(
            this.x + this.collider.x + this.collider.radius,
            this.y + this.collider.y + this.collider.radius,
            this.collider.radius,
            0,
            Math.PI * 2
        );
        context.closePath();
        context.fill();
        context.restore();

        this.playerAnimationController.draw(context, sprites);

        //Draw health panel
        context.fillStyle = 'lime';
        context.fillRect(this.x, this.y - 16, this.width, 11);
        context.strokeRect(this.x, this.y - 16, this.width, 11);
        // playerDraws.stay(context, this, sprites);
        // context.save()
        //
        // context.translate(this.x + this.width / 2, this.y + this.height / 2);
        // //Rotate the canvas around the origin
        // context.rotate(this.rotateAngle);
        //
        // //draw the image
        // context.drawImage(sprites['man1_run'].image, this.animations.runAnim * 80, 0, 80, 80, this.width / 2 * (-1), this.height / 2 * (-1), 80, 80);
        //
        // // Restore canvas state as saved from above
        // context.restore();
    }

    closeHit () {
        this.hitting = false;
        this.hitObject = null;
        this.playerAnimationController.run('stayWithAxe');
        clearInterval(this.hitIntervalId);
    }

    hit () {
        this.playerAnimationController.run("armhit");
        this.hitting = true;
        console.log('start hit')
        this.hitIntervalId = setInterval(() => this.doHit(), this.hitCooldownMax);
    }

    doHit () {
        console.log('dohit')
        console.log(this.hitObject)
        this.socket.emit('hitWorldObject', { hitWorldObjectId: this.hitObject.id });
    }

    moveTo (point) {
        let speed = this.speed;
        let rad = Math.atan2(this.y-point.y,point.x-this.x);
        this.rotateAngle = -rad + 90 * Math.PI / 180;

        const distance = Math.abs(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) - Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)));

        if (distance < speed) {
            speed /= 2;
        }

        let xDeg = Math.cos(rad)*speed;
        let yDeg = Math.sin(rad)*speed;

        this.x += xDeg;
        this.y -= yDeg;

        if (distance < this.speed / 2) {
            // this.x = point.x;
            // this.y = point.y;
            return true;
        }
    }
}

class WorldObject {
    constructor(data) {
        this.spriteType = data.spriteType;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.radius = data.width / 2;
        this.id = data.id;
    }

    draw (context, sprites) {
        const sprite = sprites[this.spriteType];

        context.save();
        context.fillStyle = 'rgba(32, 200, 23, 0.1)';
        context.beginPath();
        context.arc(
            this.x + this.radius,
            this.y + this.radius,
            this.radius,
            0,
            Math.PI * 2
        );
        context.closePath();
        context.fill();
        context.restore();

        context.drawImage(sprite.image, 0, 0, sprite.width, sprite.height, this.x, this.y, this.width, this.height);
    }

    collision (other) {
        const coll = false;

        // if (this.x < other.x + other.width && this.x + this.width > other.x &&
        //     this.y < other.y + other.height && this.y + this.height > other.y) {
        //     // collision detected!
        //     // console.log('collision')
        //     return true;
        // } else {
        //     // console.log('uncollision')
        // }

        // console.log(other.collider)
        const otherX = other.x + other.collider.x;
        const otherY = other.y + other.collider.y;

        const dx = (this.x + this.radius) - (otherX + other.collider.radius);
        const dy = (this.y + this.radius) - (otherY + other.collider.radius);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + other.collider.radius) {
            // collision detected!
            // console.log('collision')
            return true;
        } else {
            // no collision
            // console.log('uncollision')
        }

    }
}


function RunGame () {
    const game = new Game(canvas, io);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

RunGame();