class Rock extends Entity {
    constructor(cell) {
        super(cell, 15, 2, ROCK, true);

        // this.maxAcc = 0;
        // this.maxVel = 0;
    }

    update() {
        this.vel = p5.Vector.mult(this.vel, Math.pow(0.95, dt));
    }
}