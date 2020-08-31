class Arrow {
    constructor(pos, speed, angle, firedBy) {
        this.pos = pos;
        this.speed = speed;
        this.angle = angle;

        this.firedBy = firedBy;

        this.hit = null;
        this.remove = false;

        this.time = 0;
    }

    update(grid, entities) {

        if (this.time > 20) {
            this.hit = P_GROUND;
            return true;
        }

        // Ensures that the bullet only moves a maximum of 5 pixels at a time
        // Prevents fast bullets from going through objects without skipping them
        let maxStep = this.speed * dt;
        let distanceMoved = 0;
        let step = maxStep / Math.ceil(maxStep);
        let collide = false;
        // Keeps moving until it collides or moves the max distance of one frame
        while (distanceMoved < maxStep && !collide) {
            this.pos.x += step * Math.cos(this.angle);
            this.pos.y += step * Math.sin(this.angle);
            distanceMoved += step;
            collide = this.checkCollisions(grid, entities);
        }
        
        if (collide && this.time == 0) {
            this.remove = true;
        }

        this.time += dt;

        return collide;
    }

    checkCollisions(grid, entities) {
        let cell = getCell(this.pos);

        if (projectileCollides(cell.x, cell.y, grid)) {
            // Collision with a cell
            this.hit = P_CELL;

            if (cell.x >= 0 && cell.y >= 0 && cell.x < grid.length && cell.y < grid[0].length) {
                grid[cell.x][cell.y].arrows.push(this);
            }
            
            // console.log(cell);
            return true;
        }

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

                entity.vel.add(p5.Vector.fromAngle(this.angle, this.speed * FORCE));

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