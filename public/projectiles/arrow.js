class Arrow {
    constructor(pos, speed, angle, firedBy) {
        this.pos = pos;
        this.speed = Math.round(speed);
        this.angle = angle;

        this.firedBy = firedBy;

        this.hit = null;
        this.remove = false;

        this.time = 0;

        this.previousCell = { x: -1, y: -1 };

        game.particle({
            pos: this.pos.copy(),
            speed: 3,
            speedErr: 1.5,
            angle: this.angle,
            angleErr: Math.PI * 0.25,
            r: 7,
            life: 15,
            lifeErr: 7,
            col: '#6d3e0a',
            num: 15
        });

        sounds.arrowfire.play();
    }

    update(grid, entities, targets, interactables) {

        if (this.time > 20) {
            this.hit = P_GROUND;

            game.particle({
                pos: this.pos.copy(),
                speed: 3,
                speedErr: 1.5,
                angle: this.angle,
                angleErr: Math.PI * 0.25,
                r: 7,
                life: 15,
                lifeErr: 7,
                col: '#6d3e0a',
                num: 10
            });

            sounds.arrowfloor.play();

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
            collide = this.checkCollisions(grid, entities, targets, interactables);
            numSteps++;
        }
        
        if (collide && this.time == 0 && numSteps < 2) {
            this.remove = true;
        }

        this.time += dt;

        return collide;
    }

    checkCollisions(grid, entities, targets, interactables) {
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
                    let modX = this.pos.x % CELL;
                    let modY = this.pos.y % CELL;
                    if (modX < 0) modX += CELL;
                    if (modY < 0) modY += CELL;
                    let relPos = createVector(modX - CELL / 2, modY - CELL / 2);
                    let relAngle = Math.atan2(relPos.y, relPos.x);
                    let relMag = relPos.mag();

                    let rotated = p5.Vector.fromAngle(relAngle - target.direction * Math.PI / 2, relMag);

                    // console.log(relPos.x, relPos.y, rotated.x, rotated.y);

                    if (rotated.y >= CELL / 2 - MINSTEP && rotated.x >= -TARGETR / 2 && rotated.x <= TARGETR / 2) {
                        target.pressed = true;

                        let interactable = interactables[target.interactID]

                        let activate = true;
                        for (let trigger of interactable.triggers) {
                            if (!trigger.pressed) activate = false;
                        }
    
                        if (activate) {
                            interactable.activated = true;

                            sounds.doorclose.stop();
                            sounds.dooropen.play();
    
                            for (let door of interactable.doors) {
                                grid[door.x][door.y].type = EMPTY;

                                game.particle({
                                    pos: createVector(door.x * CELL + CELL / 2, door.y * CELL + CELL / 2),
                                    speed: 3,
                                    speedErr: 1.5,
                                    angle: 0,
                                    angleErr: Math.PI * 2,
                                    r: 7,
                                    life: 30,
                                    lifeErr: 15,
                                    col: COLOURCODES[interactable.colour],
                                    num: 15
                                });
    
                                for (let arrow of grid[door.x][door.y].arrows) {
                                    arrow.remove = true;
                                }
                            }
                        }
                    }
                }
            }

            game.particle({
                pos: this.pos.copy(),
                speed: 3,
                speedErr: 1.5,
                angle: this.angle,
                angleErr: Math.PI * 0.25,
                r: 7,
                life: 15,
                lifeErr: 7,
                col: '#6d3e0a',
                num: 15
            });

            sounds.arrowwall.play();
            
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

                if (entity.type == ROCK || entity.type == CORPSE) {
                    entity.angularVel += 0.2 * FORCE * Math.sin(this.angle - relAngle);
                }

                let bleed = 100;
                if (typeof entity.damage == 'function') {
                    entity.damage(this.speed);

                    bleed = [150, 0, 0];

                    sounds.arrowentity.play();
                } else {
                    sounds.arrowwall.play();
                }

                game.particle({
                    pos: this.pos.copy(),
                    speed: 3,
                    speedErr: 1.5,
                    angle: this.angle,
                    angleErr: Math.PI * 0.25,
                    r: 7,
                    life: 30,
                    lifeErr: 15,
                    col: bleed,
                    num: 15
                });

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