class Fireball {
    constructor(pos, angle, firedBy) {
        this.pos = pos;
        this.speed = F_SPEED;
        this.angle = angle;

        this.firedBy = firedBy;

        this.hit = null;

        this.hitCell = null;

        this.type = FIREBALL;

        this.previousCell = { x: -1, y: -1 };

        game.particle({
            pos: this.pos.copy(),
            speed: 2,
            speedErr: 1,
            angle: this.angle,
            angleErr: Math.PI * 0.25,
            r: 10,
            life: 20,
            lifeErr: 7,
            col: [200, 0, 0],
            num: 5
        });

        game.particle({
            pos: this.pos.copy(),
            speed: 2,
            speedErr: 1,
            angle: this.angle,
            angleErr: Math.PI * 0.25,
            r: 7,
            life: 25,
            lifeErr: 7,
            col: [255, 150, 0],
            num: 10
        });

        game.particle({
            pos: this.pos.copy(),
            speed: 2,
            speedErr: 1,
            angle: this.angle,
            angleErr: Math.PI * 0.25,
            r: 7,
            life: 30,
            lifeErr: 7,
            col: [255, 255, 0],
            num: 10
        });

        this.time = 0;

        // sounds.arrowfire.play();
    }

    update(grid, entities) {
        // Ensures that the bullet only moves a maximum of 5 pixels at a time
        // Prevents fast bullets from going through objects without skipping them
        let maxStep = this.speed * dt;
        let distanceMoved = 0;
        let step = maxStep / Math.ceil(maxStep / MINSTEP);
        let collide = false;
        let numSteps = 0;
        // Keeps moving until it collides or moves the max distance of one frame
        while (distanceMoved < maxStep && !collide) {
            this.pos.x += step * Math.cos(this.angle);
            this.pos.y += step * Math.sin(this.angle);
            distanceMoved += step;
            collide = this.checkCollisions(grid, entities);
            numSteps++;
        }

        this.time += dt;

        return collide;
    }

    checkCollisions(grid, entities) {
        let cell = getCell(this.pos);

        if (projectileCollides(cell.x, cell.y, grid)) {
            // Collision with a cell
            this.hit = P_CELL;

            // game.particle({
            //     pos: this.pos.copy(),
            //     speed: 3,
            //     speedErr: 1.5,
            //     angle: this.angle,
            //     angleErr: Math.PI * 0.25,
            //     r: 7,
            //     life: 15,
            //     lifeErr: 7,
            //     col: '#6d3e0a',
            //     num: 15
            // });

            // sounds.arrowwall.play();

            if (cell.x >= 0 && cell.y >= 0 && cell.x < grid.length && cell.y < grid[0].length && grid[cell.x][cell.y].type == BREAKABLE) {
                grid[cell.x][cell.y].type = EMPTY;

                for (let arrow of grid[cell.x][cell.y].arrows) {
                    arrow.remove = true;
                }

                this.hitCell = cell;
            }
            return true;
        }

        this.previousCell = cell;

        for (let entity of entities) {
            if (entity.fireAs == this.firedBy) continue;
            if (entity.pickedUp) continue;

            let diffVec = p5.Vector.sub(this.pos, entity.pos);
            let dSq = diffVec.magSq();

            // let d = Math.pow(this.pos.x - entity.pos.x, 2) + Math.pow(this.pos.y - entity.pos.y, 2);
            if (dSq < (entity.r + F_RADIUS) * (entity.r + F_RADIUS)) {
                this.hit = P_ENTITY;
                // Collision with an entity
                let relAngle = Math.atan2(diffVec.y, diffVec.x);
                
                entity.vel.add(p5.Vector.fromAngle(this.angle, 20 * FORCE / entity.mass));

                if (entity.type == ROCK || entity.type == CORPSE || entity.type == SPIKE) {
                    entity.angularVel += 0.2 * FORCE * Math.sin(this.angle - relAngle);
                }

                let bleed = 100;
                if (typeof entity.damage == 'function') {
                    entity.damage(this.speed);

                    bleed = [150, 0, 0];

                    // sounds.arrowentity.play();
                } else {
                    // sounds.arrowwall.play();
                }

                // game.particle({
                //     pos: this.pos.copy(),
                //     speed: 3,
                //     speedErr: 1.5,
                //     angle: this.angle,
                //     angleErr: Math.PI * 0.25,
                //     r: 7,
                //     life: 30,
                //     lifeErr: 15,
                //     col: bleed,
                //     num: 15
                // });

                return true;
            }
        }
    }

    toObject() {
        return {
            pos: this.pos,
            time: this.time
        }
    }
}