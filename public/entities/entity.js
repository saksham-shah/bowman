class Entity {
    constructor(cell, r, mass = 1, type = PLAYER) {
        this.pos = createVector(cell.x * CELL + CELL / 2, cell.y * CELL + CELL / 2);
        this.vel = createVector(0, 0);
        this.acc = null;

        // this.player = (type == PLAYER);
        this.fireAs = P_NEUTRAL;

        this.type = type;
        this.r = r;

        this.mass = mass;

        this.colour = 255;

        this.maxAcc = 50;
        this.maxVel = 20;

        this.pickedUp = false;
        this.hovered = false;
        this.closeToPlayer = false;
        this.canBePlaced = false;

        this.arrows = [];
        /*
        {
            pos: { x, y },
            angle: 0 - 2 * Math.PI
        }
        */
    }

    superUpdate(grid, entities) {
        this.acc = createVector(0, 0);

        let projectile = this.update(grid, entities);

        this.acc.limit(this.maxAcc);
        this.vel.add(p5.Vector.mult(this.acc, dt));

        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));

        this.checkCollisions(grid, entities);

        // if (this.type == PLAYER && !this.bow) {
        //     let cell = getCell(this.pos);
        //     if (cell.x >= 0 && cell.y >= 0 && cell.x < grid.length && cell.y < grid[0].length) {
        //         if (grid[cell.x][cell.y].type == BOW) {
        //             grid[cell.x][cell.y].type = EMPTY;
        //             this.bow = true;
        //         }
        //     }
        // }

        this.updateAngle();

        return projectile;
    }

    update() {}

    updateAngle() {
        this.angle = Math.atan2(this.vel.y, this.vel.x);
    }

    checkCollisions(grid, entities, pos = this.pos) {
        let moved = false;

        for (let entity of entities) {
            if (this == entity) continue;
            if (entity.pickedUp) continue;

            let entityCollide = collideWithPoint(this.pos, entity.pos, this.r + entity.r, entity.mass / (this.mass + entity.mass));
            if (entityCollide.moved) {
                if (!this.pickedUp) {
                    if (this.type !== PLAYER) {
                        let mag = this.vel.mag();
                        this.vel.x += 2 * (entityCollide.pos.x - this.pos.x) / dt;
                        this.vel.y += 2 * (entityCollide.pos.y - this.pos.y) / dt;
                        this.vel.limit(mag);
                    }

                    this.pos.x = entityCollide.pos.x;
                    this.pos.y = entityCollide.pos.y;

                    if (this.type == SPIKE) {
                        if (entity.type == PLAYER || entity.type == ARCHER) {
                            entity.hit = true;
                        }
                    }
                }

                moved = true;
            }
        }

        let wallCollide = collideWithWalls(this.pos, this.r, grid);

        if (wallCollide.moved) {
            if (!this.pickedUp) {
                if (this.type !== PLAYER) {
                    let mag = this.vel.mag();
                    this.vel.x += 2 * (wallCollide.pos.x - this.pos.x) / dt;
                    this.vel.y += 2 * (wallCollide.pos.y - this.pos.y) / dt;
                    this.vel.limit(mag);
                }

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
            arrows: this.arrows,

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