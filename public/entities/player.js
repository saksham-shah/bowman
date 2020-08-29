class Player extends Entity {
    constructor(cell) {
        super(cell, 10, 1, PLAYER);

        this.player = true;

        this.mouseAngle = 0;

        this.maxAcc = 0.7;
        this.maxVel = 3;
    }

    update(mousePos) {
        this.move();
        this.aimToMouse(mousePos);
    }

    move() {
        let des = createVector(0, 0);

        if (keyIsDown(87)) { // w
            des.y -= this.maxVel;
        }

        if (keyIsDown(83)) { // s
            des.y += this.maxVel;
        }

        if (keyIsDown(65)) { // a
            des.x -= this.maxVel;
        }

        if (keyIsDown(68)) { // d
            des.x += this.maxVel;
        }

        des.normalize();
        des.mult(this.maxVel);

        this.acc.add(des);
        this.acc.sub(this.vel);
    }

    aimToMouse() {
        let mousePos = getScreen('game').mousePos;
        let dx = (mousePos.x - cornerX) / zoom - this.pos.x;
        let dy = (mousePos.y - cornerY) / zoom - this.pos.y;

        this.mouseAngle = Math.atan2(dy, dx);
    }

    toObject(obj) {
        obj.angle = this.mouseAngle;
    }
}