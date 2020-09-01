class Archer extends Enemy {
    constructor(cell, target) {
        super(cell, target, ARCHER);

        this.fireAngle = 0;
        this.firingAt = { x: 0, y: 0 };

        this.maxAcc = 0.25;
        this.targetVel = 1;

        this.pullback = 0;
        this.pullingBack = false;

        this.fireRate = 300;

        this.cooldown = 0;
    }

    subUpdate() {
        this.aimAtTarget();

        if (this.cooldown > 0) {
            this.cooldown -= dt;
        } else if (!this.pullingBack) {
            this.pullingBack = true;
            this.moving = false;
            this.firingAt = { x: this.target.pos.x, y: this.target.pos.y };
        }

        if (this.pullingBack) {
            if (this.pullback < PULLBACK) {
                this.pullback += dt;

            } else {
                this.moving = true;
                this.pullingBack = false;
                this.cooldown = this.fireRate;
                this.pullback = 0;
                let angle = this.fireAngle + Math.random() * ARCHERERROR * 2 - ARCHERERROR;
                return new Arrow(p5.Vector.fromAngle(angle, 30).add(this.pos), MAXSPEED, angle, P_ENEMY);
            }
        }

        return null;
    }

    aimAtTarget() {
        let dx, dy;
        // if (this.pullingBack) {
        //     dx = this.firingAt.x - this.pos.x;
        //     dy = this.firingAt.y - this.pos.y;
        // } else {
            dx = this.target.pos.x - this.pos.x;
            dy = this.target.pos.y - this.pos.y;
        // }

        this.fireAngle = Math.atan2(dy, dx);
    }

    updateAngle() { this.angle = this.fireAngle }
}