class Level {
    constructor(data) {
        normaliseLevel(data);

        this.mousePos = { x: 0, y: 0 };
        zoom = 2;
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
                    targets: []
                });
            }

            this.grid.push(col);
        }

        for (let wall of data.map.walls) {
            this.grid[wall.x][wall.y].type = WALL;
        }

        this.grid[data.end.x][data.end.y].type = END;

        this.entities = [];
        this.pickupables = [];

        this.player = new Player(data.start);
        this.entities.push(this.player);

        for (let rock of data.entities.rocks) {
            let rockEntity = new Rock(rock);
            this.entities.push(rockEntity);
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

        function entityClose(entity, player) {
            let distToPlayerSq = Math.pow(player.pos.x - entity.pos.x, 2) + Math.pow(player.pos.y - entity.pos.y, 2);
            return distToPlayerSq <= PICKUPSQ
        }

        function entityHovered(entity, mousePos) {
            let distToMouseSq = Math.pow(mousePos.x - entity.pos.x, 2) + Math.pow(mousePos.y - entity.pos.y, 2);
            return distToMouseSq < entity.r * entity.r;
        }

        if (this.pickedUpEntity) {
            this.placePosition = createVector(this.mousePos.x, this.mousePos.y);

            let awayVector = p5.Vector.sub(this.player.pos, this.placePosition);
            if (awayVector.magSq() > PICKUPSQ) {
                awayVector.setMag(awayVector.mag() - PICKUP);
                this.placePosition.add(awayVector);
            }

            let d = Math.pow(this.placePosition.x - this.player.pos.x, 2) + Math.pow(this.placePosition.y - this.player.pos.y, 2);
            if (d > PICKUPSQ) {
                
            }

            let colliding = this.pickedUpEntity.checkCollisions(this.grid, this.entities, this.placePosition);
            this.pickedUpEntity.canBePlaced = !colliding;

            if (!colliding) {
                let cell = getCell(this.placePosition, this.grid.length, this.grid[0].length);
                if (playerCollides(this.grid[cell.x][cell.y])) {
                    this.pickedUpEntity.canBePlaced = false;
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

    click() {
        if (this.pickedUpEntity) {
            if (this.pickedUpEntity.canBePlaced) {
                this.pickedUpEntity.pos.x = this.placePosition.x;
                this.pickedUpEntity.pos.y = this.placePosition.y;
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
    interactID: -1, // same as above
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