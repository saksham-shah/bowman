class Corpse extends Entity {
    constructor(pos, vel, angle, arrows, body, shownHealth, maxHealth) {
        super({ x: 0, y: 0 }, 15, 1, CORPSE);

        this.angle = angle;
        this.manualAngle = angle;
        this.angularVel = 0;

        this.pos = pos;
        this.vel = vel;
        this.body = body;
        this.arrows = arrows;

        this.shownHealth = shownHealth;
        this.maxHealth = maxHealth;
    }

    update() {
        // if (this.shownHealth > 0) {
        //     this.shownHealth -= this.shownHealth * 0.1;

        //     if (this.shownHealth <= 1) {
        //         this.shownHealth = 0;
        //     }
        // }

        this.vel = p5.Vector.mult(this.vel, Math.pow(0.95, dt));

        this.angularVel *= Math.pow(0.95, dt);
        this.manualAngle = (this.manualAngle + this.angularVel * dt) % (2 * Math.PI);
    }

    updateAngle() {
        this.angle = this.manualAngle;
    }

    toObject(obj) {
        obj.body = this.body;
        obj.healthPercent = this.shownHealth / this.maxHealth;
    }
}