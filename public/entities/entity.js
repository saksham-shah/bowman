class Entity {
    constructor(cell, r, mass = 1, type = PLAYER, canPickUp = false) {
        this.pos = createVector(cell.x * CELL + CELL / 2, cell.y * CELL + CELL / 2);
        this.vel = createVector(0, 0);
        this.acc = null;

        this.player = (type == PLAYER);

        this.type = type;
        this.r = r;

        this.mass = mass;

        this.colour = 255;

        this.maxAcc = 0.8;
        this.maxVel = 7;

        this.pickedUp = false;
        this.hovered = false;
        this.closeToPlayer = false;
        this.canBePlaced = false;
    }

    superUpdate(grid, entities) {
        this.acc = createVector(0, 0);

        this.update(grid, entities);

        this.acc.limit(this.maxAcc);
        this.vel.add(p5.Vector.mult(this.acc, dt));

        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));

        this.checkCollisions(grid, entities);

        this.angle = Math.atan2(this.vel.y, this.vel.x);
    }

    update() {}

    checkCollisions(grid, entities, pos = this.pos) {
        let moved = false;

        for (let entity of entities) {
            if (this == entity) continue;
            if (entity.pickedUp) continue;

            let entityCollide = collideWithPoint(this.pos, entity.pos, this.r + entity.r, entity.mass / (this.mass + entity.mass));
            if (entityCollide.moved) {
                if (!this.pickedUp) {
                    this.pos.x = entityCollide.pos.x;
                    this.pos.y = entityCollide.pos.y;
                }

                moved = true;
            }
        }

        let wallCollide = collideWithWalls(this.pos, this.r, grid);

        if (wallCollide.moved) {
            if (!this.pickedUp) {
                this.pos.x = wallCollide.pos.x;
                this.pos.y = wallCollide.pos.y;
            }

            moved = true;
        }

        return moved;
    }

    superToObject() {
        let obj = {
            pos: this.pos,
            angle: this.angle,
            r: this.r,
            type: this.type,

            pickedUp: this.pickedUp,
            closeToPlayer: this.closeToPlayer,
            hovered: this.hovered,
            canBePlaced: this.canBePlaced
        }

        this.toObject(obj);

        return obj;
    }

    toObject() {}
}