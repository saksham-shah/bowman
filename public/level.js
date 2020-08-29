class Level {
    constructor(data) {
        normaliseLevel(data);

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
    }

    update() {
        
    }

    toObject() {
        return {
            grid: this.grid
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