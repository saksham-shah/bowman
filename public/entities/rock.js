class Rock extends Entity {
    constructor(cell) {
        super(cell, 15, 2, ROCK, true);

        // this.maxAcc = 0;
        // this.maxVel = 0;

        this.manualAngle = 0;
        this.angularVel = 0;
    }

    update() {
        this.vel = p5.Vector.mult(this.vel, Math.pow(0.95, dt));

        this.angularVel *= Math.pow(0.95, dt);
        this.manualAngle = (this.manualAngle + this.angularVel * dt) % (2 * Math.PI);
    }

    updateAngle() {
        this.angle = this.manualAngle;
    }
}