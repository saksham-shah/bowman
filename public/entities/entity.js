class Entity {
    constructor(cell, r, type = PLAYER) {
        this.pos = pos;
        this.vel = vel;
        this.acc = null;

        this.player = (type == PLAYER);

        this.type = type;
        this.r = r;

        this.colour = 255;

        this.maxAcc = 0.8;
        this.maxVel = 7;
    }

    superUpdate() {
        this.acc = createVector(0, 0);

        this.update();

        this.acc.limit(this.maxAcc);
        this.vel.add(p5.Vector.mult(this.acc, dt));

        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));

        this.angle = Math.atan2(this.vel.y, this.vel.x);
    }

    toObject() {
        return {
            pos: this.pos,
            angle: this.angle,
            r: this.r,
            type: this.type
        }
    }
}