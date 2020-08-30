class Level {
    constructor(data) {
        normaliseLevel(data);

        this.mousePos = { x: 0, y: 0 };
        let xRatio = 1400 / data.size.width / CELL;
        let yRatio = 700 / data.size.height / CELL;
        zoom = Math.min(1.5, xRatio, yRatio);
        cornerX = 800 - data.size.width * CELL / 2 * zoom;
        cornerY = 450 - data.size.height * CELL / 2 * zoom;

        this.grid = [];
        for (let i = 0; i < data.size.width; i++) {
            let col = [];
            for (let j = 0; j < data.size.height; j++) {
                col.push({
                    type: EMPTY,
                    buttonID: -1,
                    interactID: -1,
                    targets: [],
                    arrows: []
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

        this.interactables = [];
        this.buttons = [];
        this.triggers = [];

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
                    case BUTTON:
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
                    case TARGET:
                        // NEED TO FINISH
                        let targetObj = {
                            pressed: false,
                            direction: trigger.direction,
                            interactID: this.interactables.length
                        }
                        this.targets.push(targetObj);
                        interactableObj.triggers.push(buttonObj);
                        break;
                }
            }

            this.interactables.push(interactableObj);
        }

        this.caves = [];

        for (let cave of data.caves) {
            this.grid[cave.pos.x][cave.pos.y].type = CAVE;

            let caveObj = {
                pos: { x: cave.pos.x, y: cave.pos.y },
                enemies: cave.enemies
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

        this.pickedUpEntity = null;
        this.placePosition = null;
        this.hoveredEntity = null;
    }

    update() {
        let mousePosAbs = getScreen('game').mousePos;

        this.mousePos = {
            x: (mousePosAbs.x - cornerX) / zoom,
            y: (mousePosAbs.y - cornerY) / zoom            
        }

        this.updateEntitiesBullets();
    }

    updateEntitiesBullets() {
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];

            if (entity.pickedUp) continue;

            entity.superUpdate(this.grid, this.entities);
        }

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
                        }
                    }
                }
            } else {
                if (interactable.activated) {
                    interactable.activated = false;

                    for (let door of interactable.doors) {
                        this.grid[door.x][door.y].type = DOOR;
                    }
                }
            }
        }

        function entityClose(entity, player) {
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
                awayVector.setMag(awayVector.mag() - PICKUP);
                this.pickedUpEntity.pos.add(awayVector);
            }

            let colliding = this.pickedUpEntity.checkCollisions(this.grid, this.entities, true);//this.placePosition);
            this.pickedUpEntity.canBePlaced = !colliding;

            // if (!colliding) {
            //     let cell = getCell(this.pickedUpEntity.pos, this.grid.length, this.grid[0].length);
            //     if (playerCollides(this.grid[cell.x][cell.y])) {
            //         this.pickedUpEntity.canBePlaced = false;
            //     }
            // }

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

    click() {
        if (this.pickedUpEntity) {
            if (this.pickedUpEntity.canBePlaced) {
                // this.pickedUpEntity.pos.x = this.placePosition.x;
                // this.pickedUpEntity.pos.y = this.placePosition.y;
                this.pickedUpEntity.pickedUp = false;
                this.pickedUpEntity = null;
            }

        } else if (this.hoveredEntity) {
            // console.log(this.hoveredEntity);
            this.pickedUpEntity = this.hoveredEntity;
            this.hoveredEntity = null;

            this.pickedUpEntity.pickedUp = true;
            this.pickedUpEntity.canBePlaced = true;

            for (let entity of this.pickupables) {
                entity.closeToPlayer = false;
                entity.hovered = false;
            }
        } else {

        }
    }

    toObject() {
        let entities = [];
        for (let entity of this.entities) {
            // if (entity.pickedUp) continue;

            entities.push(entity.superToObject());
        }

        return {
            entities,
            grid: this.grid,
            interactables: this.interactables,
            buttons: this.buttons,
            targets: this.targets,
            placePosition: this.placePosition
        }
    }
}

function normaliseLevel(data) {
    if (typeof data.bow == 'undefined') data.bow = null;
    if (typeof data.caves == 'undefined') data.caves = [];
    if (typeof data.interactables == 'undefined') data.interactables = [];

    if (typeof data.map == 'undefined') data.map = {};
    if (typeof data.map.walls == 'undefined') data.map.walls = [];
    if (typeof data.map.breakables == 'undefined') data.map.breakables = [];
    if (typeof data.map.fences == 'undefined') data.map.fences = [];

    if (typeof data.entities == 'undefined') data.entities = {};
    if (typeof data.entities.rocks == 'undefined') data.entities.rocks = [];
    if (typeof data.entities.spikes == 'undefined') data.entities.spikes = [];
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
                    type: BUTTON,
                    pos: [...]
                },
                {
                    type: TARGET,
                    pos: [...],
                    direction: 0/1/2/3
                }, ...
            ]
        }, ...
    ]
}

 */