class Level {
    constructor(level) {
        this.level = level;
        let data = levels[level];
        normaliseLevel(data);

        this.levelMeta = data.meta;

        resetText();

        displayText(this.levelMeta, 'default');

        this.mousePos = { x: 0, y: 0 };
        // let maxWidth = 1500, maxHeight = 800;
        // if (this.levelMeta.text.default) {
        //     maxWidth = 1300;
        //     maxHeight = 600;
        // }

        let xRatio = data.meta.maxWidth / (data.size.width + 2) / CELL;
        let yRatio = data.meta.maxHeight / (data.size.height + 2) / CELL;
        zoom = Math.min(1.75, xRatio, yRatio);
        cornerX = 800 - data.size.width * CELL / 2 * zoom;
        cornerY = 450 - data.size.height * CELL / 2 * zoom;

        this.paused = false;
        this.secret = false;
        this.ended = -1;
        this.reached = false;
        this.arrowsFired = 0;

        this.grid = [];
        for (let i = 0; i < data.size.width; i++) {
            let col = [];
            for (let j = 0; j < data.size.height; j++) {
                col.push({
                    type: EMPTY,
                    buttonID: -1,
                    interactID: -1,
                    targets: [],
                    arrows: [],
                    spikes: 0
                });
            }

            this.grid.push(col);
        }

        for (let wall of data.map.walls) {
            this.grid[wall.x][wall.y].type = WALL;
        }

        for (let fence of data.map.fences) {
            this.grid[fence.x][fence.y].type = FENCE;
        }

        this.grid[data.end.x][data.end.y].type = END;

        if (data.bow !== null) {
            this.grid[data.bow.x][data.bow.y].type = BOW;
        }
        this.arrows = [];

        this.interactables = [];
        this.buttons = [];
        this.targets = [];

        for (let interactable of data.interactables) {
            let interactableObj = {
                doors: [],
                colour: interactable.colour,
                activated: false,
                triggers: []
            }

            for (let door of interactable.doors) {
                this.grid[door.x][door.y].type = DOOR;
                this.grid[door.x][door.y].interactID = this.interactables.length;

                interactableObj.doors.push({ x: door.x, y: door.y });
            }

            for (let trigger of interactable.triggers) {
                switch (trigger.type) {
                    case I_BUTTON:
                        let buttonObj = {
                            pressed: false,
                            interactID: this.interactables.length,
                            pos: {
                                x: trigger.pos.x * CELL + CELL / 2,
                                y: trigger.pos.y * CELL + CELL / 2                                
                            }
                        }

                        this.grid[trigger.pos.x][trigger.pos.y].type = BUTTON;
                        this.grid[trigger.pos.x][trigger.pos.y].buttonID = this.buttons.length;
                        this.grid[trigger.pos.x][trigger.pos.y].interactID = this.interactables.length;

                        this.buttons.push(buttonObj);
                        interactableObj.triggers.push(buttonObj);
                        break;
                    case I_TARGET:
                        // NEED TO FINISH
                        let targetObj = {
                            pressed: false,
                            direction: trigger.direction,
                            interactID: this.interactables.length,
                            pos: {
                                x: trigger.pos.x,
                                y: trigger.pos.y                                
                            }
                        }
                        
                        this.grid[trigger.pos.x][trigger.pos.y].targets.push({
                            targetID: this.targets.length,
                            interactID: this.interactables.length,
                            direction: trigger.direction
                        });

                        this.targets.push(targetObj);
                        interactableObj.triggers.push(targetObj);
                        break;
                }
            }

            this.interactables.push(interactableObj);
        }

        this.caves = [];
        this.caveTimer = data.caveInterval;
        this.caveInterval = data.caveInterval;

        for (let cave of data.caves) {
            this.grid[cave.pos.x][cave.pos.y].type = CAVE;

            let caveObj = {
                pos: { x: cave.pos.x, y: cave.pos.y },
                enemies: cave.enemies,
                counter: 0
            }

            this.caves.push(caveObj);
        }

        this.entities = [];
        this.pickupables = [];

        this.player = new Player(data.start);
        this.entities.push(this.player);

        for (let rock of data.entities.rocks) {
            let rockEntity = new Rock(rock);
            this.entities.splice(0, 0, rockEntity);
            this.pickupables.push(rockEntity);
        }

        for (let spike of data.entities.spikes) {
            let spikeEntity = new Spike(spike);
            this.entities.splice(0, 0, spikeEntity);
        }

        this.particles = [];
        this.footprints = [];
        this.lastFootprint = 0;
        this.rightFootprint = true;

        this.pickedUpEntity = null;
        this.placePosition = null;
        this.hoveredEntity = null;
        this.droppingEntity = false;
    }

    update() {
        let mousePosAbs = getScreen('game').mousePos;

        this.mousePos = {
            x: (mousePosAbs.x - cornerX) / zoom,
            y: (mousePosAbs.y - cornerY) / zoom            
        }

        if (this.player.bow) this.updateCaves();
        this.updateEntities();
        this.updateButtons();
        this.updatePickables();
        this.checkPlayer();

        if (this.ended != -1) {
            this.ended--;

            if (this.ended == 0) {
                this.paused = true;

                openPopup('level end', this.result);
            }
        }
    }

    updateEntities() {
        for (let entity of this.entities) {
            if (entity.type == CORPSE) {
                if (entity.shownHealth > 0) {
                    entity.shownHealth *= 0.9;
        
                    if (entity.shownHealth <= 1) {
                        entity.shownHealth = 0;
                    }
                }
            }
            if (entity.pickedUp) continue;

            let projectile = entity.superUpdate(this.grid, this.entities);
            if (projectile) this.arrows.push(projectile);
        }

        for (let arrow of this.arrows) {
            if (arrow.hit === null) arrow.update(this.grid, this.entities, this.targets, this.interactables);
        }

        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];
            if (entity.hit) {
                let corpse = new Corpse(entity.pos.copy(), entity.vel.copy(), entity.angle, entity.arrows, entity.type, entity.shownHealth, entity.maxHealth);
                this.entities.push(corpse);
                this.entities.splice(i, 1);

                this.pickupables.push(corpse);

                if (entity.type == PLAYER) {
                    if (this.pickedUpEntity) this.droppingEntity = true;

                    this.endLevel(false);
                } else {
                    displayText(this.levelMeta, 'kill');
                }

                this.particle({
                    pos: entity.pos.copy(),
                    speed: 3,
                    speedErr: 1.5,
                    angle: 0,
                    angleErr: Math.PI * 2,
                    r: 7,
                    life: 30,
                    lifeErr: 15,
                    col: [150, 0, 0],
                    num: 20
                });

                sounds.entitydie.play();
            }
        }
    }

    updateCaves() {
        this.caveTimer += dt;
        while (this.caveTimer > this.caveInterval) {
            this.caveTimer -= this.caveInterval;

            for (let cave of this.caves) {
                if (cave.counter >= cave.enemies.length) continue;

                let enemyType = cave.enemies[cave.counter];
                if (enemyType == S_REPEAT) {
                    cave.counter = 0;
                    enemyType = cave.enemies[0];
                }

                enemyType = parseInt(enemyType);

                let spawn = false;

                switch(enemyType) {
                    case S_BOW: {
                        // console.log('Bow enemy spawning!');
                        this.entities.push(new Archer(cave.pos, this.player));

                        spawn = true;
                        break;
                    }
                }

                if (spawn) {
                    this.particle({
                        pos: createVector(cave.pos.x * CELL + CELL / 2, cave.pos.y * CELL + CELL / 2),
                        speed: 3,
                        speedErr: 1.5,
                        angle: 0,
                        angleErr: Math.PI * 2,
                        r: 7,
                        life: 30,
                        lifeErr: 15,
                        col: '#6d3e0a',
                        num: 15
                    });

                    sounds.enemyspawn.play();
                }

                cave.counter++;
            }
        }
    }

    updateButtons() {
        for (let button of this.buttons) {
            let interactable = this.interactables[button.interactID];

            button.pressed = false;
            for (let entity of this.entities) {
                if (entity.pickedUp) continue;
                let dSq = Math.pow(entity.pos.x - button.pos.x, 2) + Math.pow(entity.pos.y - button.pos.y, 2);
                if (dSq < Math.pow(entity.r + BUTTONR, 2)) {
                    // Button should be pressed
                    button.pressed = true;
                }
            }

            if (button.pressed) {
                if (!interactable.activated) {
                    let activate = true;
                    for (let trigger of interactable.triggers) {
                        if (!trigger.pressed) activate = false;
                    }

                    if (activate) {
                        interactable.activated = true;

                        for (let door of interactable.doors) {
                            this.grid[door.x][door.y].type = EMPTY;

                            sounds.doorclose.stop();
                            sounds.dooropen.play();

                            this.particle({
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

                            for (let arrow of this.grid[door.x][door.y].arrows) {
                                arrow.remove = true;
                            }
                        }
                    }
                }
            } else {
                if (interactable.activated) {
                    interactable.activated = false;

                    sounds.dooropen.stop();
                    sounds.doorclose.play();

                    for (let door of interactable.doors) {
                        this.grid[door.x][door.y].type = DOOR;
                    }
                }
            }
        }
    }

    updatePickables() {
        function entityClose(entity, player) {
            if (player.hit) return;
            let distToPlayerSq = Math.pow(player.pos.x - entity.pos.x, 2) + Math.pow(player.pos.y - entity.pos.y, 2);
            return distToPlayerSq <= PICKUPSQ
        }

        function entityHovered(entity, mousePos) {
            let distToMouseSq = Math.pow(mousePos.x - entity.pos.x, 2) + Math.pow(mousePos.y - entity.pos.y, 2);
            return distToMouseSq < entity.r * entity.r;
        }

        if (this.pickedUpEntity) {
            // this.placePosition = createVector(this.mousePos.x, this.mousePos.y);
            this.pickedUpEntity.pos.x = this.mousePos.x;
            this.pickedUpEntity.pos.y = this.mousePos.y;

            let awayVector = p5.Vector.sub(this.player.pos, this.pickedUpEntity.pos);
            if (awayVector.magSq() > PICKUPSQ) {
                awayVector.setMag(awayVector.mag() - PICKUP + 1);
                this.pickedUpEntity.pos.add(awayVector);
            }

            let colliding = this.pickedUpEntity.checkCollisions(this.grid, this.entities, true);//this.placePosition);
            this.pickedUpEntity.canBePlaced = !colliding;
            // if (SETTINGS.pickup == DRAG) {
            //     if (!mouseIsPressed) {
            //         if (this.pickedUpEntity.canBePlaced) {
            //             this.pickedUpEntity.vel.mult(0);
            //             // if (this.pickedUpEntity.type == ROCK) {
            //                 this.pickedUpEntity.angularVel = 0;
            //             // }

            //             this.pickedUpEntity.pickedUp = false;
            //             this.pickedUpEntity = null;
            //         }
            //     }
            // }

            if (this.droppingEntity) {
                if (this.pickedUpEntity.canBePlaced) {
                    this.pickedUpEntity.vel.mult(0);
                    // if (this.pickedUpEntity.type == ROCK) {
                        this.pickedUpEntity.angularVel = 0;
                    // }
    
                    this.pickedUpEntity.pickedUp = false;
                    this.pickedUpEntity = null;

                    this.droppingEntity = false;
                }
            }

        } else {
            // Check what can be picked up
            for (let entity of this.pickupables) {
                if (entityClose(entity, this.player)) {
                    // Entity is close enough to be picked up
                    entity.closeToPlayer = true;
                    
                    if ((!this.hoveredEntity || this.hoveredEntity === entity) && entityHovered(entity, this.mousePos)) {
                        entity.hovered = true;
                        this.hoveredEntity = entity;
                    } else {
                        entity.hovered = false;
                        if (this.hoveredEntity == entity) this.hoveredEntity = null;
                    }

                } else {
                    entity.closeToPlayer = false;
                    entity.hovered = false;
                    if (this.hoveredEntity == entity) this.hoveredEntity = null;
                }
            }
        }
    }

    checkPlayer() {
        let cell = getCell(this.player.pos);
        if (cell.x >= 0 && cell.y >= 0 && cell.x < this.grid.length && cell.y < this.grid[0].length) {
            if (!this.player.bow && this.grid[cell.x][cell.y].type == BOW) {
                this.grid[cell.x][cell.y].type = EMPTY;
                this.player.bow = true;

                displayText(this.levelMeta, 'bow');

                sounds.bowpickup.play();
            }

            if (this.ended == -1 && this.grid[cell.x][cell.y].type == END) {
                this.endLevel(true);
                this.reached = true;

                this.particle({
                    pos: createVector(cell.x * CELL + CELL / 2, cell.y * CELL + CELL / 2),
                    speed: 3,
                    speedErr: 1.5,
                    angle: 0,
                    angleErr: Math.PI * 2,
                    r: 7,
                    life: 60,
                    lifeErr: 30,
                    col: [255, 225, 0],
                    num: 40
                });

                sounds.winlevel.play();
            }

            if (!this.secret && cell.x == this.levelMeta.secret.x && cell.y == this.levelMeta.secret.y) {
                this.secret = true;
                console.log('Secret star found!');

                star.time = 180;
                star.pos = {
                    x: cell.x * CELL + CELL / 2,
                    y: cell.y * CELL + CELL / 2
                }

                if (!secret) {
                    star.text = true;
                    star.max = 300;
                    star.time = 300;
                    secret = true;

                    // localStorage.setItem('bowman stats', JSON.stringify(stats));
                }

                sounds.winsecret.play();
            }
        }
    }

    click(leftMouse) {
        if (this.player.hit) return;
        if (this.pickedUpEntity) { // && SETTINGS.pickup == CLICK) {
            if (this.pickedUpEntity.canBePlaced) {
                this.pickedUpEntity.vel.mult(0);
                // if (this.pickedUpEntity.type == ROCK) {
                    this.pickedUpEntity.angularVel = 0;
                // }

                this.pickedUpEntity.pickedUp = false;
                this.pickedUpEntity = null;
            } else {
                this.droppingEntity = true;
            }

        } else if (!leftMouse) {
            if (!this.hoveredEntity) {
                for (let entity of this.pickupables) {
                    if (entity.closeToPlayer) {
                        this.hoveredEntity = entity;
                    }
                }
            }
            // console.log(this.hoveredEntity);
            if (this.hoveredEntity) {
                this.pickedUpEntity = this.hoveredEntity;
                this.hoveredEntity = null;
    
                this.pickedUpEntity.pickedUp = true;
                this.pickedUpEntity.canBePlaced = true;
            }

            // this.pickedUpEntity.vel.mult(0);
            // if (this.pickedUpEntity.type == ROCK) {
            //     this.pickedUpEntity.angularVel = 0;
            // }

            for (let entity of this.pickupables) {
                entity.closeToPlayer = false;
                entity.hovered = false;
            }
        } else {
            if (this.player.bow && this.player.cooldown <= 0) {
                // pull back bow
                this.player.pullingBack = true;
                
                this.player.cooldown = this.player.fireRate;
                this.player.pullback = 0;

                sounds.arrowpull.play();
            }
        }
    }

    toObject() {
        let entities = [];
        for (let entity of this.entities) {
            if (entity == this.player) continue;
            if (entity == this.pickedUpEntity) continue;

            entities.push(entity.superToObject());
        }

        if (!this.player.hit) entities.push(this.player.superToObject());

        if (this.pickedUpEntity) {
            entities.push(this.pickedUpEntity.superToObject());
        }

        let arrows = [];
        for (let i = this.arrows.length - 1; i >= 0; i--) {
            let arrow = this.arrows[i];
            if (arrow.hit == P_ENTITY) continue;

            if (arrow.remove) {
                this.arrows.splice(i, 1);
            } else {
                arrows.push(arrow.toObject());
            }
        }

        let particles = [];
        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].update()) {
                this.particles.splice(i, 1);
            } else {
                particles.push(this.particles[i].toObject());
            }
        }

        // if (this.lastFootprint > 0) {
        //     this.lastFootprint -= dt;
        // } else {
        //     let vel = this.player.vel;
        //     if (vel.magSq() > 5) {
        //         let angle = Math.atan2(vel.y, vel.x) + Math.PI / 2;
        //         let offset = p5.Vector.fromAngle(angle, this.rightFootprint ? 5 : -5);
        //         offset.add(this.player.pos);

        //         let footprint = {
        //             pos: offset,
        //             angle,
        //             right: this.rightFootprint,
        //             time: 120
        //         }

        //         this.footprints.push(footprint);
        //         this.lastFootprint = 10;
        //         this.rightFootprint = !this.rightFootprint;
        //     }
        // }

        // for (let i = this.footprints.length - 1; i >= 0; i--) {
        //     this.footprints[i].time -= dt;

        //     if (this.footprints[i].time < 0) {
        //         this.footprints.splice(i, 1);
        //     }
        // }

        return {
            entities, arrows, particles,
            grid: this.grid,
            interactables: this.interactables,
            buttons: this.buttons,
            targets: this.targets,
            placePosition: this.placePosition,
            power: this.player.bow ? this.player.pullback / PULLBACK : -1,
            reached: this.reached,
            // footprints: this.footprints
        }
    }

    endLevel(success) {
        if (this.ended >= 0) return;
        let stars = 0, arrows = 0;
        if (success) {
            if (this.arrowsFired <= this.levelMeta.triple) {
                stars = 3;
            } else if (this.arrowsFired <= this.levelMeta.double) {
                stars = 2;
                arrows = this.arrowsFired - this.levelMeta.triple;
            } else {
                stars = 1;
                arrows = this.arrowsFired - this.levelMeta.double;
            }
        }

        updateStars({
            level: this.level,
            stars,
            secret: this.secret
        });

        this.result = {
            level: this.level,
            stars,
            secret: this.secret,
            arrows
        }

        this.ended = 60;
    }
}

function normaliseLevel(data) {
    if (typeof data.bow == 'undefined') data.bow = null;
    if (typeof data.caves == 'undefined') data.caves = [];
    if (typeof data.interactables == 'undefined') data.interactables = [];

    if (typeof data.caveInterval == 'undefined') data.caveInterval = 60;

    if (typeof data.map == 'undefined') data.map = {};
    if (typeof data.map.walls == 'undefined') data.map.walls = [];
    if (typeof data.map.breakables == 'undefined') data.map.breakables = [];
    if (typeof data.map.fences == 'undefined') data.map.fences = [];

    if (typeof data.entities == 'undefined') data.entities = {};
    if (typeof data.entities.rocks == 'undefined') data.entities.rocks = [];
    if (typeof data.entities.spikes == 'undefined') data.entities.spikes = [];

    if (typeof data.meta.text == 'undefined') data.meta.text = {};
    if (typeof data.meta.maxWidth != 'number') data.meta.maxWidth = 1500;
    if (typeof data.meta.maxHeight != 'number') data.meta.maxHeight = 800;
}

/*

example cell data

{
    type: EMPTY,
    buttonID: -1, // only if there is a button
    interactID: -1, // only if there is a button or door
    targets: [
        {
            targetID: 2,
            interactID: 3
        }, ...
    ]
}

example level data

{
    size: { width: 5, height: 3 },
    start: { x: 0, y: 0 },
    end: { x: 4, y: 2 },
    bow: { x: 2, y: 0 },

    caves: [
        {
            pos: { x: 1, y: 2 },
            enemies: '01100' // 5 enemies, 3 of type 0 and 2 of type 1
        }, ...
    ],

    map: {
        walls: [{ x: 1, y: 0 }, ...],
        breakables: [...],
        fences: [...]
    },

    entities: {
        rocks: [...],
        spikes: [...]
    },

    interactables: [
        {
            colour: RED,
            doors: [...],
            triggers: [
                {
                    type: I_BUTTON,
                    pos: [...]
                },
                {
                    type: I_TARGET,
                    pos: [...],
                    direction: 0/1/2/3
                }, ...
            ]
        }, ...
    ]
}

 */