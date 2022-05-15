const playerDraws = {
    stay: (ctx, obj, sprites) => {
        ctx.fillStyle = obj.color;

        const globalX = 0;
        const globalY = 0;
        const globalWidth = obj.width;
        const globalHeight = obj.height;
        const radius = obj.radius;

        ctx.save();

        ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);

        ctx.rotate(obj.rotateAngle);
        //Head
        ctx.beginPath();
        ctx.arc(globalX, globalY,  radius / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        //Left hand
        ctx.beginPath();
        ctx.arc(globalX - (radius / 4) * 3, globalY - radius / 8,  radius / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        //Right hand
        ctx.beginPath();
        ctx.arc(globalX + (radius / 4) * 3, globalY - radius / 8,  radius / 4, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.fill();
        ctx.restore();
    },
    hit: (ctx, obj, sprites,) => {
        let head = {x: 0, y: 0, radius: obj.radius / 2 };
        let leftarm = { x: 0, y: 0, radius: obj.radius / 8 };
        let rightarm = { x: 0, y: 0, radius: obj.radius / 8 };
        const radius = obj.radius;

        const animations = [() => {
            leftarm = { x: (radius / 4) * 3, y: radius / 8};
            rightarm = { x: (radius / 4) * 3, y: radius / 7 };
        },
        () => {
            leftarm = { x: (radius / 4) * 3, y: radius / 7};
            rightarm = { x: (radius / 4) * 3, y: radius / 8 };
        }];

        let frame = 0;
        setInterval(() => {
            animations[frame]();
            frame++;
            if (frame > 1)
                frame = 0;
        }, 500);

        drawPlayerModules(obj, ctx, head, leftarm, rightarm);
    }
}

function drawPlayerModules (obj, ctx, head, leftarm, rightarm) {
    console.log('asd')
    ctx.save();

    ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);

    ctx.rotate(obj.rotateAngle);
    //Head
    ctx.beginPath();
    ctx.arc(head.x, head.y,  head.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //Left hand
    ctx.beginPath();
    ctx.arc(leftarm.x, leftarm.y, leftarm.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //Right hand
    ctx.beginPath();
    ctx.arc(rightarm.x, rightarm.y, rightarm.radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fill();
    ctx.restore();
}


class Point {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}