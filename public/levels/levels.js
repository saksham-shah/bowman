let levels = [
    // Level 1
    {
        size: { width: 8, height: 3 },
        start: { x: 0, y: 1 },
        end: { x: 7, y: 1 },
    
        map: {
            walls: [{ x: 6, y: 0 }, { x: 7, y: 0 }, { x: 6, y: 2 }, { x: 7, y: 2 }]
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
                        type: I_BUTTON,
                        pos: { x: 4, y: 1 }
                    }
                ]
            }
        ],
        meta: {
            required: 0,
            double: 0,
            triple: 0,
            secret: { x: 0, y: 0 },

            text: {
                default: [
                    {
                        text: 'Place the rock on the button to open the door.',
                        position: NORTH
                    }, {
                        text: 'Right click to automatically pick up a nearby object.',
                        position: SOUTH
                    }
                ]
            }
        }
    },

    // Level 2
    {
        size: { width: 8, height: 6 },
        start: { x: 1, y: 0 },
        end: { x: 7, y: 0 },
        bow: { x: 3, y: 1 },
    
        caves: [{
            pos: { x: 0, y: 2 },
            enemies: '01'
        }],
    
        map: {
            walls: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 2, y: 5 }, { x: 2, y: 4 }]
        },
    
        entities: {
            rocks: [{ x: 0, y: 0 }]
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
        ],
        meta: {
            required: 3,
            double: 4,
            triple: 2,
            secret: { x: 1, y: 2 },

            text: {
                default: [],
                bow: [
                    {
                        text: 'A war horn? I guess there are enemies to kill.',
                        position: NORTH
                    }, {
                        text: 'Left click to shoot an arrow - hold it longer for more damage!',
                        position: SOUTH
                    }
                ],
                kill: [
                    {
                        text: 'Perhaps the corpse will be of use to you...',
                        position: NORTH
                    }, {
                        text: '',
                        position: SOUTH
                    }
                ]
            }
        }
    },

    // Level 3
    {
        size: { width: 8, height: 7 },
        start: { x: 0, y: 6 },
        end: { x: 7, y: 0 },
        bow: { x: 5, y: 0 },
    
        caves: [{
            pos: { x: 0, y: 5 },
            enemies: '1001001'
        }],
    
        map: {
            walls: [{ x: 3, y: 5 }, { x: 4, y: 5 }, { x: 7, y: 5 }, { x: 6, y: 5 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }],
            fences: [{ x: 4, y: 6 }]
        },
    
        entities: {
            rocks: [{ x: 5, y: 6 }, { x: 7, y: 3 }]
        },
    
        interactables: [
            {
                colour: RED,
                doors: [{ x: 5, y: 1 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 3, y: 0 }
                }]
            }, {
                colour: BLUE,
                doors: [{ x: 3, y: 6 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 0, y: 0 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 7, y: 4 }
                }]
            },  {
                colour: GREEN,
                doors: [{ x: 7, y: 1 }, { x: 5, y: 5 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 7, y: 6 }
                }, {
                    type: I_TARGET,
                    pos: { x: 7, y: 2 },
                    direction: EAST
                }]
            }
        ],
        meta: {
            required: 5,
            double: 6,
            triple: 3,
            secret: { x: 7, y: 6 }
        }
    }
];