class Arrow {
    constructor(pos, speed, angle, firedBy) {
        this.pos = pos;
        this.speed = speed;
        this.angle = angle;

        this.firedBy = firedBy;

        this.hit = null;
        this.remove = false;

        this.time = 0;

        this.previousCell = { x: -1, y: -1 };
    }

    update(grid, entities, targets) {

        if (this.time > 20) {
            this.hit = P_GROUND;
            return true;
        }

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
            collide = this.checkCollisions(grid, entities, targets);
            numSteps++;
        }
        
        if (collide && this.time == 0 && numSteps < 2) {
            this.remove = true;
        }

        this.time += dt;

        return collide;
    }

    checkCollisions(grid, entities, targets) {
        let cell = getCell(this.pos);

        if (projectileCollides(cell.x, cell.y, grid)) {
            // Collision with a cell
            this.hit = P_CELL;

            if (cell.x >= 0 && cell.y >= 0 && cell.x < grid.length && cell.y < grid[0].length) {
                grid[cell.x][cell.y].arrows.push(this);
            }

            for (let target of targets) {
                if (target.pressed) continue;
                // Optimisation
                if (Math.abs(cell.x - target.pos.x) + Math.abs(cell.y - target.pos.y) == 1) {
                    let relPos = createVector(this.pos.x % CELL - CELL / 2, this.pos.y % CELL - CELL / 2);
                    let relAngle = Math.atan2(relPos.y, relPos.x);
                    let relMag = relPos.mag();

                    let rotated = p5.Vector.fromAngle(relAngle - target.direction * Math.PI / 2, relMag);

                    console.log(relPos.x, relPos.y, rotated.x, rotated.y);

                    if (rotated.y >= CELL / 2 - MINSTEP && rotated.x >= -TARGETR / 2 && rotated.x <= TARGETR / 2) {
                        target.pressed = true;
                    }
                }
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
            if (dSq < entity.r * entity.r) {
                this.hit = P_ENTITY;
                // Collision with an entity
                let relAngle = Math.atan2(diffVec.y, diffVec.x);
                let relPos = p5.Vector.fromAngle(relAngle - entity.angle, Math.sqrt(dSq));

                entity.arrows.push({
                    pos: relPos,
                    angle: this.angle - entity.angle
                });

                entity.vel.add(p5.Vector.fromAngle(this.angle, this.speed * FORCE / entity.mass));

                if (entity.type == ROCK) {
                    entity.angularVel += 0.2 * FORCE * Math.sin(this.angle - relAngle);
                }

                // console.log(entity);
                return true;
            }
        }
    }

    toObject() {
        return {
            pos: this.pos,
            angle: this.angle,
            grounded: this.hit === P_GROUND,
            time: this.time
        }
    }
}