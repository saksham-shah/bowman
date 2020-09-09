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

        this.cooldown = 120;
    }

    subUpdate(grid) {
        this.aimAtTarget();

        if (this.cooldown > 0) {
            this.cooldown -= dt;
        } else if (!this.pullingBack) {
            if (this.clearLineOfSight(grid)) {
                this.pullingBack = true;
                sounds.arrowpull2.play();
                this.moving = false;
                this.firingAt = { x: this.target.pos.x, y: this.target.pos.y };
                this.cooldown = this.fireRate;
            } else {
                this.cooldown = REFRESH;
            }
        }

        if (this.pullingBack) {
            if (this.pullback < PULLBACK) {
                this.pullback += 2 * dt;

            } else {
                this.moving = true;
                this.pullingBack = false;
                // this.pullback = 0;
                let angle = this.fireAngle;// + Math.random() * ARCHERERROR * 2 - ARCHERERROR;
                // return new Arrow(p5.Vector.fromAngle(angle, 30).add(this.pos), MAXSPEED, angle, P_ENEMY);
                return new Arrow(this.pos.copy(), MAXSPEED, angle, P_ENEMY);
            }
        } else if (this.pullback > 0) {
            this.pullback -= 15 * dt;
    
            if (this.pullback < 0) this.pullback = 0;
        }

        return null;
    }

    aimAtTarget() {
        let dx, dy;
        if (this.pullingBack) {
            dx = this.firingAt.x - this.pos.x;
            dy = this.firingAt.y - this.pos.y;
        } else {
            dx = this.target.pos.x - this.pos.x;
            dy = this.target.pos.y - this.pos.y;
        }

        this.fireAngle = Math.atan2(dy, dx);
    }

    clearLineOfSight(grid) {
        let dx = this.target.pos.x - this.pos.x;
        let dy = this.target.pos.y - this.pos.y;

        let angle = Math.atan2(dy, dx);
        let d = Math.sqrt(dx * dx + dy * dy);

        let x = this.pos.x, y = this.pos.y;

        // Ensures that the bullet only moves a maximum of 5 pixels at a time
        // Prevents fast bullets from going through objects without skipping them
        let distanceMoved = 0;
        let step = d / Math.ceil(d / MINSTEP);
        let collide = false;
        let lastCell = null;
        // Keeps moving until it collides or moves the max distance of one frame
        while (distanceMoved < d && !collide) {
            x += step * Math.cos(angle);
            y += step * Math.sin(angle);
            distanceMoved += step;

            let cell = getCell(createVector(x, y));
            if (cell != lastCell) {
                lastCell = cell;

                collide = projectileCollides(cell.x, cell.y, grid);
            }
        }

        return !collide;
    }

    updateAngle() { this.angle = this.fireAngle }

    subToObject(obj) {
        obj.pullback = this.pullback;
    }
}