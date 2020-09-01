class Corpse extends Entity {
    constructor(pos, vel, angle, enemy, shownHealth, maxHealth) {
        super({ x: 0, y: 0 }, 15, 1, CORPSE);

        this.manualAngle = angle;
        this.angularVel = 0;

        this.pos = pos;
        this.vel = vel;
        this.enemy = enemy;

        this.shownHealth = shownHealth;
        this.maxHealth = maxHealth;
    }

    update() {
        if (this.shownHealth > 0) {
            this.shownHealth -= this.shownHealth * 0.1;

            if (this.shownHealth <= 1) {
                this.shownHealth = this.health;
            }
        }

        this.vel = p5.Vector.mult(this.vel, Math.pow(0.95, dt));

        this.angularVel *= Math.pow(0.95, dt);
        this.manualAngle = (this.manualAngle + this.angularVel * dt) % (2 * Math.PI);
    }

    updateAngle() {
        this.angle = this.manualAngle;
    }

    toObject(obj) {
        obj.enemy = this.enemy;
        obj.healthPercent = this.shownHealth / this.maxHealth;
    }
}