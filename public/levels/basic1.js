const TUTORIALBOW = {
    size: { width: 8, height: 6 },
    start: { x: 1, y: 0 },
    end: { x: 7, y: 0 },
    bow: { x: 3, y: 1 },

    caves: [{
        pos: { x: 0, y: 2 },
        enemies: '101'
    }],

    map: {
        walls: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 2, y: 5 }, { x: 2, y: 4 }]
    },

    entities: {
        rocks: [{ x: 0, y: 0 }, { x: 1, y: 5 }]
    },

    interactables: [
        {
            colour: RED,
            doors: [{ x: 2, y: 3 }],
            triggers: [{
                type: I_BUTTON,
                pos: { x: 7, y: 5 }
            }]
        }, {
            colour: BLUE,
            doors: [{ x: 5, y: 0 }],
            triggers: [{
                type: I_BUTTON,
                pos: { x: 0, y: 5 }
            }]
        }
    ]
}