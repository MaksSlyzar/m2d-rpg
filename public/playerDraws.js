class PlayerAnimationController {
    animations = playerAnimations;
    updateWhile = false;

    constructor(player) {
        this.player = player;
        this.animation = 'default';
        this.body = {
            head: { ...new Point(0, 0), radius: 0 },
            leftArm: { ...new Point(0, 0), radius: 0 },
            rightArm: { ...new Point(0, 0), radius: 0 }
        };

        this.frame = 0;

        this.run('stayWithAxe');
    }

    run (name) {
        this.animation = name;
        this.frame = 0;

        if (this.updateWhile == false) {
            this.updateWhile = true;
            this.update();
        }
    }

    update () {
        this.body = this.animations[this.animation].screens[this.frame](this.player);

        this.frame++;
        if (this.frame >= this.animations[this.animation].screens.length) {
            this.frame = 0;

            // return;
        }
        setTimeout(() => this.update(), this.animations[this.animation].frameRate);
    }

    draw (ctx, sprites) {
        if (!this.player)
            return;

        const obj = this.player;

        const { head, leftarm, rightarm, arms } = this.body;

        ctx.fillStyle = obj.color;
        ctx.save();

        ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);

        ctx.rotate(obj.rotateAngle);

        if (arms) {
            ctx.drawImage(sprites['default_axe'].image, arms.x, arms.y, arms.width, arms.height);
        }

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
        ctx.fill();
        ctx.stroke();


        ctx.restore();



        // if (arms) {
        //     if (arms.rotate != undefined) {
        //         ctx.save();
        //         ctx.translate(obj.x - arms.x, obj.y - arms.y);
        //
        //         ctx.rotate(obj.rotateAngle);
        //     }
        //
        //     ctx.drawImage(sprites['default_axe'].image, arms.x, arms.y, arms.width, arms.height);
        //
        //     if (arms.rotate != undefined) {
        //         ctx.restore();
        //     }
        // }

    }
}


class Point {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}