class Enemy extends Entity {
    constructor(cell, target, type, health = 40, r = 15, mass = 1.5) {
        super(cell, r, mass, type);

        this.fireAs = P_ENEMY;

        this.maxAcc = 0.7;
        this.targetVel = 3;

        this.target = target;

        this.health = health;
        this.maxHealth = health;
        this.shownHealth = health;

        this.moving = true;

        this.pathToTarget = [];
        this.timeSinceLastPath = 0;
    }

    update(grid) {
        if (this.shownHealth != this.health) {
            this.shownHealth += (this.health - this.shownHealth) * 0.1;

            if (Math.abs(this.shownHealth - this.health) <= 1) {
                this.shownHealth = this.health;
            }
        }

        // this.move();
        this.followPath(grid);

        return this.subUpdate(grid);
    }

    subUpdate() {}

    move(pos) {
        if (this.moving) {
            let des = p5.Vector.sub(pos, this.pos);
            des.setMag(this.targetVel);
            this.acc.add(des);
        }

        this.acc.sub(this.vel);
    }

    followPath(grid) {
        this.timeSinceLastPath += dt;

        let myCell = getCell(this.pos);

        // Refresh the path every second
        if (this.timeSinceLastPath > REFRESH || this.pathToTarget.length == 0) {
            this.calculatePath(grid, myCell);
        }

        // If the enemy has reached the current cell of the path
        if (myCell.x == this.pathToTarget[0].x && myCell.y == this.pathToTarget[0].y) {
            this.pathToTarget.splice(0, 1);
        }

        if (this.pathToTarget.length > 0) {
            // Follow the path
            this.move(createVector(this.pathToTarget[0].x * CELL + CELL / 2, this.pathToTarget[0].y * CELL + CELL / 2));
        }
    }

    calculatePath(grid, myCell) {
        let targetCell = getCell(this.target.pos);

        this.pathToTarget = findPath(grid, myCell, targetCell);
        this.timeSinceLastPath = 0;
    }

    damage(dmg) {
        this.health -= dmg;
        if (this.health <= 0) {
            this.health = 0;
            this.hit = true;
        }
    }

    // updateAngle() {
    //     this.angle = 
    // }

    toObject(obj) {
        obj.healthPercent = this.shownHealth / this.maxHealth;

        this.subToObject(obj);
    }

    subToObject() {

    }
}