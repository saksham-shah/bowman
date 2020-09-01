class Enemy extends Entity {
    constructor(cell, target, type, r = 15, mass = 1.5, health = 50) {
        super(cell, r, mass, type);

        this.fireAs = P_ENEMY;

        this.maxAcc = 0.7;
        this.targetVel = 3;

        this.target = target;

        this.health = health;

        this.moving = true;
    }

    update() {
        this.move();

        return this.subUpdate();
    }

    subUpdate() {}

    move() {
        if (this.moving) {
            let des = p5.Vector.sub(this.target.pos, this.pos);
            des.setMag(this.targetVel);
            this.acc.add(des);
        }

        this.acc.sub(this.vel);
    }

    // updateAngle() {
    //     this.angle = 
    // }

    toObject(obj) {
        this.subToObject(obj);
    }

    subToObject() {

    }
}