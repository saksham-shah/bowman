const TUTORIAL = {
    size: { width: 8, height: 3 },
    start: { x: 0, y: 1 },
    end: { x: 7, y: 1 },

    map: {
        walls: [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 6, y: 2 }, { x: 7, y: 2 }]
    },

    entities: {
        rocks: [{ x: 2, y: 1 }]
    },

    interactables: [
        {
            colour: RED,
            doors: [{ x: 6, y: 1 }],
            triggers: [
                {
                    type: BUTTON,
                    pos: [{ x: 4, y: 1 }]
                }
            ]
        }
    ]
};