const TUTORIALFENCE = {
    size: { width: 8, height: 7 },
    start: { x: 0, y: 6 },
    end: { x: 7, y: 0 },
    bow: { x: 5, y: 0 },

    caves: [{
        pos: { x: 0, y: 5 },
        enemies: '10101'
    }],

    map: {
        walls: [{ x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }],
        fences: [{ x: 4, y: 6 }]
    },

    entities: {
        rocks: [{ x: 5, y: 6 }, { x: 7, y: 2 }]
    },

    interactables: [
        {
            colour: RED,
            doors: [{ x: 5, y: 1 }],
            triggers: [{
                type: BUTTON,
                pos: { x: 3, y: 0 }
            }]
        }, {
            colour: BLUE,
            doors: [{ x: 3, y: 6 }],
            triggers: [{
                type: BUTTON,
                pos: { x: 0, y: 0 }
            // }, {
            //     type: BUTTON,
            //     pos: { x: 7, y: 4 }
            }]
        },  {
            colour: GREEN,
            doors: [{ x: 7, y: 1 }],
            triggers: [{
                type: BUTTON,
                pos: { x: 7, y: 6 }
            // }, {
            //     type: TARGET,
            //     pos: { x: 6, y: 2 },
            //     direction: NORTH
            }]
        }
    ]
}