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
                        text: ['WASD to move.', 'Place the rock on the button to open the door.'],
                        position: NORTH
                    }, {
                        text: ['Right click (or Space) to automatically pick up a nearby object.', ['Click again to put the object down.']],
                        position: SOUTH
                    }
                ]
            },
            maxHeight: 600
        }
    },

    // Level 2 - Multiple buttons
    {
        size: { width: 9, height: 7 },
        start: { x: 4, y: 3 },
        end: { x: 8, y: 6 },

        map: {
            walls: [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }]
        },

        entities: {
            rocks: [{ x: 4, y: 2 }, { x: 3, y: 3 }, { x: 5, y: 3 }]
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 1, y: 6 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 0, y: 0 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 8, y: 0 }
                }]
            }, {
                colour: BLUE,
                doors: [{ x: 7, y: 6 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 0, y: 6 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 8, y: 4 }
                }]
            }
        ],

        meta: {
            required: 3,
            double: 0,
            triple: 0,
            secret: { x: 0, y: 4 },

            text: {
                default: [{
                    text: ['Right click on a specific nearby object to pick it up.'],
                    position: NORTH
                }, {
                    text: ['Activate all of the buttons of a colour to open the door.'],
                    position: SOUTH
                }]
            },
            maxHeight: 700
        }
    },

    // Level 3 - Bow
    {
        size: { width: 8, height: 6 },
        start: { x: 1, y: 0 },
        end: { x: 7, y: 0 },
        bow: { x: 3, y: 1 },
    
        caves: [{
            pos: { x: 0, y: 2 },
            enemies: '1'
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
            required: 6,
            double: 4,
            triple: 2,
            secret: { x: 1, y: 2 },

            text: {
                default: [],
                bow: [
                    {
                        text: ['Is that an enemy? Isn\'t this a puzzle game?', 'Left click to shoot an arrow - hold it longer for more damage!'],
                        position: NORTH
                    }, {
                        text: ['Use the power meter on the left to time your shots.', 'You cannot shoot arrows while holding objects.'],
                        position: SOUTH
                    }
                ],
                kill: [
                    {
                        text: ['Perhaps the corpse will be of use to you...'],
                        position: NORTH
                    }, {
                        text: [],
                        position: SOUTH
                    }
                ]
            },
            maxHeight: 600
        }
    },

    // Level 4 - Fences and Restart
    {
        size: { width: 9, height: 7 },
        start: { x: 8, y: 6 },
        end: { x: 0, y: 6 },
        bow: { x: 4, y: 4 },

        caves: [{
            pos: { x: 4, y: 0 },
            enemies: '100001'
        }],

        map: {
            walls: [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }],
            fences: [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }]
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 1, y: 6 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 8, y: 0 }
                }]
            }, {
                colour: BLUE,
                doors: [{ x: 8, y: 3 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 0, y: 2 }
                }]
            }
        ],

        meta: {
            required: 7,
            double: 6,
            triple: 1,
            secret: { x: 0, y: 0 },

            text: {
                default: [{
                    text: ['Fences can be shot through, but you cannot go through them.'],
                    position: NORTH
                }],
                kill: [{
                    text: ['Shoot the corpse onto the red button to activate it.'],
                    position: NORTH
                }, {
                    text: ['Press R to restart (and P to pause).'],
                    position: SOUTH
                }]
            },
            maxHeight: 600
        }
    },

    // Level 5 - Targets
    {
        size: { width: 7, height: 7 },
        start: { x: 0, y: 6 },
        end: { x: 6, y: 0 },
        bow: { x: 3, y: 3 },

        caves: [{
            pos: { x: 6, y: 3 },
            enemies: '100010001'
        }],

        map: {
            walls: [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 5, y: 5 }, { x: 6, y: 5 }]
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 5, y: 6 }],
                triggers: [{
                    type: I_TARGET,
                    pos: { x: 0, y: 3 },
                    direction: WEST
                }, ]
            }, {
                colour: BLUE,
                doors: [{ x: 5, y: 0 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 0, y: 0 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 6, y: 6 }
                }]
            }
        ],

        meta: {
            required: 8,
            double: 8,
            triple: 4,
            secret: { x: 6, y: 2 },

            text: {
                default: [{
                    text: ['Targets must be shot to be activated.'],
                    position: NORTH
                }]
            },
            maxHeight: 700
        }
    },

    // Level 6 - Test
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
            required: 10,
            double: 8,
            triple: 3,
            secret: { x: 7, y: 6 }
        }
    },

    // Level 7 - Constant enemies
    {
        size: { width: 9, height: 9 },
        start: { x: 0, y: 5 },
        end: { x: 7, y: 5 },
        bow: { x: 1, y: 5 },
    
        caves: [{
            pos: { x: 0, y: 3 },
            enemies: '10101010'
        }, {
            pos: { x: 8, y: 3 },
            enemies: '01010101'
        }],

        caveInterval: 300,
    
        map: {
            walls: [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }],
            fences: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 6 },
                { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 6 },]
        },
    
        interactables: [
            {
                colour: RED,
                doors: [{ x: 8, y: 6 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 0, y: 8 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 1, y: 8 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 7, y: 8 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 8, y: 8 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 0, y: 0 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 1, y: 0 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 7, y: 0 }
                }, {
                    type: I_BUTTON,
                    pos: { x: 8, y: 0 }
                }]
            }
        ],
        meta: {
            required: 12,
            double: 18,
            triple: 8,
            secret: { x: 7, y: 3 },

            text: {
                default: [{
                    text: ['Kill enough enemies to activate the buttons.'],
                    position: NORTH
                }]
            },
            maxHeight: 750
        }
    },

    // Level 8 - Race through the map while enemies open doors
    {
        size: { width: 11, height: 11 },
        start: { x: 5, y: 10 },
        end: { x: 10, y: 6 },
        bow: { x: 5, y: 9 },

        caves: [{
            pos: { x: 3, y: 10 },
            enemies: '1'
        }, {
            pos: { x: 7, y: 10 },
            enemies: '1'
        }],
    
        map: {
            fences: [{ x: 6, y: 10 }, { x: 4, y: 10 },
                { x: 6, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 }, { x: 9, y: 9 },
                { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 },
                { x: 4, y: 9 }, { x: 3, y: 9 }, { x: 2, y: 9 }, { x: 1, y: 9 },
                { x: 4, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 },
                { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 },
                { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7 }, { x: 1, y: 8 },
                { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, 
                { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, 
                { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, 
            ]
        },
    
        entities: {
            rocks: [{ x: 2, y: 8 }, { x: 3, y: 8 }]
        },
    
        interactables: [
            {
                colour: RED,
                doors: [{ x: 8, y: 10 }, { x: 8, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 8 }
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 0, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 10, y: 8 }
                    }
                ]
            }, {
                colour: GREEN,
                doors: [{ x: 10, y: 7 }, { x: 2, y: 5 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 3 }
                    }
                ]
            }, {
                colour: YELLOW,
                doors: [{ x: 0, y: 2 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 10, y: 3 }
                    }
                ]
            }, {
                colour: CYAN,
                doors: [{ x: 10, y: 2 }, { x: 8, y: 3 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 2, y: 0 }
                    }
                ]
            }, {
                colour: MAGENTA,
                doors: [{ x: 3, y: 0 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 8, y: 0 }
                    }
                ]
            }, 
        ],
        meta: {
            required: 14,
            double: 2,
            triple: 0,
            secret: { x: 0, y: 6 },
        }
    },

    // Level 9 - Kill enemies in a grid
    {
        size: { width: 11, height: 11 },
        start: { x: 0, y: 10 },
        end: { x: 10, y: 0 },
        bow: { x: 1, y: 9 },

        caves: [
            {
                pos: { x: 0, y: 0 },
                enemies: '1111'
            }, {
                pos: { x: 10, y: 10 },
                enemies: '1111'
            }, 
        ],

        caveInterval: 360,

        map: {
            walls: [{ x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 },
                { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 5 },
                { x: 3, y: 7 }, { x: 5, y: 7 }, { x: 7, y: 7 },
                { x: 1, y: 5 }, { x: 9, y: 5 }, { x: 5, y: 1 }, { x: 5, y: 9 },
                { x: 9, y: 1 }, { x: 10, y: 1 }],
            fences: [],
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 9, y: 0 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 4, y: 4 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 4, y: 6 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 6, y: 4 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 6, y: 6 }
                    }
                ]
            }
        ],
        
        meta: {
            required: 16,
            double: 14,
            triple: 8,
            secret: { x: 10, y: 10 },
        }
    },

    // Level 10 - Archer in the middle shooting your rocks away
    {
        size: { width: 11, height: 11 },
        start: { x: 0, y: 10 },
        end: { x: 8, y: 0 },
        bow: { x: 2, y: 9 },

        caves: [
            {
                pos: { x: 5, y: 5 },
                enemies: '1'
            }, {
                pos: { x: 2, y: 0 },
                enemies: '1111'
            }, 
        ],

        caveInterval: 360,

        map: {
            walls: [
                { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 0 },
                { x: 9, y: 2 }, { x: 8, y: 2 }, { x: 7, y: 2 }, { x: 7, y: 1 }, { x: 7, y: 0 }],
            fences: [{ x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }, { x: 4, y: 5 },
                { x: 0, y: 8 }, { x: 1, y: 8 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 },
                { x: 10, y: 8 }, { x: 9, y: 8 }, { x: 7, y: 8 }, { x: 7, y: 9 }, { x: 7, y: 10 }],
        },

        entities: {
            rocks: [{ x: 9, y: 9 }, { x: 10, y: 9 }],
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 2, y: 8 }],
                triggers: [
                    {
                        type: I_TARGET,
                        pos: { x: 0, y: 10 },
                        direction: SOUTH
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 0, y: 2 }],
                triggers: [
                    {
                        type: I_TARGET,
                        pos: { x: 10, y: 10 },
                        direction: EAST
                    }
                ]
            }, {
                colour: GREEN,
                doors: [{ x: 10, y: 2 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 5, y: 3 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 5, y: 7 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 3, y: 5 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 7, y: 5 }
                    }
                ]
            }, {
                colour: YELLOW,
                doors: [{ x: 8, y: 8 }],
                triggers: [
                    {
                        type: I_TARGET,
                        pos: { x: 5, y: 0 },
                        direction: NORTH
                    }, {
                        type: I_TARGET,
                        pos: { x: 10, y: 5 },
                        direction: EAST
                    }, {
                        type: I_TARGET,
                        pos: { x: 5, y: 10 },
                        direction: SOUTH
                    }, {
                        type: I_TARGET,
                        pos: { x: 0, y: 5 },
                        direction: WEST
                    }
                ]
            }
        ],
        
        meta: {
            required: 18,
            double: 12,
            triple: 5,
            secret: { x: 2, y: 1 },
        }
    },

    // Level 11 - Do it fast - might need to be moved to level 13?
    {
        size: { width: 9, height: 9 },
        start: { x: 0, y: 8 },
        end: { x: 0, y: 0 },
        bow: { x: 3, y: 2 },

        caves: [{
            pos: { x: 8, y: 0 },
            enemies: '100100100100'
        }, {
            pos: { x: 8, y: 4 },
            enemies: '010010010010'
        }, {
            pos: { x: 8, y: 8 },
            enemies: '001001001001'
        }, {
            pos: { x: 4, y: 2 },
            enemies: '111'
        }],

        caveInterval: 300,
    
        map: {
            walls: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
                { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 4 }, { x: 5, y: 6 }, { x: 5, y: 8 }]
        },
    
        entities: {
            rocks: [{ x: 4, y: 0 }]
        },
    
        interactables: [
            {
                colour: RED,
                doors: [{ x: 2, y: 1 }],
                triggers: [
                    {
                        type: I_TARGET,
                        pos: { x: 0, y: 5 },
                        direction: WEST
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 5, y: 3 }, { x: 5, y: 5 }, { x: 5, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 2 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 4, y: 8 }
                    }, {
                        type: I_TARGET,
                        pos: { x: 2, y: 8 },
                        direction: SOUTH
                    }
                ]
            }, {
                colour: GREEN,
                doors: [{ x: 0, y: 1 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 8, y: 2 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 8, y: 6 }
                    }, {
                        type: I_TARGET,
                        pos: { x: 7, y: 8 },
                        direction: SOUTH
                    }
                ]
            }
        ],
        meta: {
            required: 20,
            double: 12,
            triple: 6,
            secret: { x: 6, y: 0 },

            text: {
                bow: [{
                    text: ['Don\'t take too long. They\'ll build up.'],
                    position: NORTH
                }]
            },
            maxHeight: 750
        }
    },

    // Level 12 - Make an archer shoot a rock
    {
        size: { width: 11, height: 9 },
        start: { x: 8, y: 8 },
        end: { x: 10, y: 0 },
        bow: { x: 7, y: 8 },

        caves: [
            {
                pos: { x: 0, y: 0 },
                enemies: '00001'
            }, {
                pos: { x: 0, y: 2 },
                enemies: '0001'
            }, {
                pos: { x: 0, y: 4 },
                enemies: '001'
            }, {
                pos: { x: 0, y: 6 },
                enemies: '01'
            }, {
                pos: { x: 0, y: 8 },
                enemies: '1'
            }, {
                pos: { x: 8, y: 0 },
                enemies: '1'
            }
        ],

        caveInterval: 120,

        map: {
            walls: [{ x: 3, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 }, { x: 10, y: 1 },
                { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 },
                { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 9, y: 5 },
                { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 10, y: 7 },
                { x: 0, y: 1 }, { x: 0, y: 3 }, { x: 0, y: 5 }, { x: 0, y: 7 },
                { x: 1, y: 1 }, { x: 1, y: 3 }, { x: 1, y: 5 }, { x: 1, y: 7 },
            ],
            fences: [{ x: 3, y: 2 }, { x: 3, y: 4 }, { x: 3, y: 6 },
                { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 4 }, { x: 1, y: 6 }, { x: 1, y: 8 }],
        },

        entities: {
            rocks: [{ x: 4, y: 2 }, { x: 4, y: 4 }, { x: 4, y: 6 }, { x: 2, y: 8 }],
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 9, y: 0 }, { x: 9, y: 8 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 10, y: 2 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 10, y: 4 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 10, y: 6 }
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 5, y: 1 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 10, y: 8 }
                    }
                ]
            }
        ],
        
        meta: {
            required: 22,
            double: 11,
            triple: 0,
            secret: { x: 4, y: 4 },
        }
    },

    // Level 13 - Puzzle
    {
        size: { width: 11, height: 11 },
        start: { x: 5, y: 5 },
        end: { x: 0, y: 6 },
        bow: { x: 5, y: 4 },

        caves: [
            {
                pos: { x: 0, y: 0 },
                enemies: '0101'
            }, {
                pos: { x: 0, y: 4 },
                enemies: '1'
            }, {
                pos: { x: 0, y: 8 },
                enemies: '001'
            }, 
        ],

        caveInterval: 600,

        map: {
            walls: [],
            fences: [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 }, { x: 10, y: 3 },
                { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 10, y: 7 },
                { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 4 }, { x: 3, y: 6 },
                { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 4 }, { x: 7, y: 6 }, { x: 7, y: 8 }, { x: 7, y: 9 },
                { x: 0, y: 5 }, { x: 1, y: 5 }
            ],
        },

        entities: {
            rocks: [{ x: 0, y: 2 }, { x: 10, y: 2 }, { x: 10, y: 6 }],
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 5, y: 3 }],
                triggers: [{
                    type: I_TARGET,
                    pos: { x: 10, y: 4 },
                    direction: EAST
                }]
            }, {
                colour: BLUE,
                doors: [{ x: 7, y: 5 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 4, y: 6 }
                }]
            }, {
                colour: GREEN,
                doors: [{ x: 5, y: 7 }, { x: 3, y: 0 }],
                triggers: [{
                    type: I_BUTTON,
                    pos: { x: 8, y: 6 }
                }]
            }, {
                colour: YELLOW,
                doors: [{ x: 2, y: 5 }, { x: 3, y: 5 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 5, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 2, y: 2 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 6, y: 4 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 8, y: 4 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 10, y: 9 }
                    }
                ]
            }, {
                colour: CYAN,
                doors: [{ x: 7, y: 0 }],
                triggers: [{
                    type: I_TARGET,
                    pos: { x: 10, y: 0 },
                    direction: EAST
                }]
            }, {
                colour: MAGENTA,
                doors: [{ x: 7, y: 10 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 1, y: 9 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 3, y: 9 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 5, y: 9 }
                    }
                ]
            }
        ],
        
        meta: {
            required: 24,
            double: 9,
            triple: 4,
            secret: { x: 0, y: 4 },
        }
    },

    // Level 14 - Kill enemies in corridors
    {
        size: { width: 11, height: 11 },
        start: { x: 0, y: 1 },
        end: { x: 10, y: 10 },
        bow: { x: 2, y: 1 },

        caves: [
            {
                pos: { x: 10, y: 0 },
                enemies: '11'
            }, {
                pos: { x: 0, y: 4 },
                enemies: '111'
            }, {
                pos: { x: 10, y: 8 },
                enemies: '1111'
            }
        ],

        caveInterval: 180,

        map: {
            // walls: [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 },
            //     { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 10, y: 7},
            //     { x: 9, y: 9 }, { x: 10, y: 9 }
            // ],
            walls: [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, 
                { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 10, y: 7},
                { x: 9, y: 9 }, { x: 10, y: 9 }
            ],
            fences: [{ x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 },
                { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, 
            ],
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 10, y: 3 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 0, y: 2 }
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 0, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 10, y: 4 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 10, y: 6 }
                    }
                ]
            }, {
                colour: GREEN,
                doors: [{ x: 9, y: 10 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 8 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 0, y: 10 }
                    }
                ]
            }
        ],
        
        meta: {
            required: 26,
            double: 18,
            triple: 12,
            secret: { x: 0, y: 4 },
        }
    },

    // Level 15 - Rock maze
    {
        size: { width: 11, height: 11 },
        start: { x: 5, y: 10 },
        end: { x: 10, y: 8 },
        bow: { x: 6, y: 10 },

        caves: [{
            pos: { x: 10, y: 6 },
            enemies: '100001'
        }],
    
        map: {
            fences: [
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1}, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 },
                { x: 1, y: 9 }, { x: 2, y: 9 }, { x: 3, y: 9 }, { x: 4, y: 9 }, { x: 6, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 }, { x: 9, y: 9 },
                { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 },
                { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7 }, { x: 1, y: 8 },
                { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 7, y: 2 }, { x: 7, y: 3 }
            ]
        },
    
        entities: {
            rocks: [{ x: 2, y: 8 }, { x: 8, y: 2 }]
        },
    
        interactables: [
            {
                colour: RED,
                doors: [{ x: 1, y: 10 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 2, y: 6 }
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 2, y: 3 }, { x: 6, y: 5 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 10, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 8, y: 8 }
                    }
                ]
            }, {
                colour: GREEN,
                doors: [{ x: 8, y: 3 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 5, y: 5 }
                    }
                ]
            }, {
                colour: YELLOW,
                doors: [{ x: 2, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 2, y: 10 }
                    }
                ]
            }, {
                colour: CYAN,
                doors: [{ x: 10, y: 7 }, { x: 10, y: 9 }, { x: 5, y: 9 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 2, y: 2 }
                    }
                ]
            }
        ],
        meta: {
            required: 28,
            double: 12,
            triple: 7,
            secret: { x: 8, y: 2 },
        }
    },

    // Level 16 - Spike
    {
        size: { width: 9, height: 9 },
        start: { x: 8, y: 0 },
        end: { x: 8, y: 8 },
        bow: { x: 4, y: 4 },

        caves: [
            {
                pos: { x: 4, y: 0 },
                enemies: '1'
            }, {
                pos: { x: 0, y: 2 },
                enemies: '10001'
            }
        ],

        map: {
            walls: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
                { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
                { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 },
                { x: 7, y: 7 }, { x: 7, y: 8 }
            ],
            fences: [{ x: 4, y: 1 }]
        },

        entities: {
            spikes: [{ x: 4, y: 2 }],
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 5, y: 0 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 4, y: 8 }
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 8, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 6, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 0, y: 6 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 0, y: 8 }
                    }
                ]
            }
        ],

        meta: {
            required: 0,
            double: 7,
            triple: 2,
            secret: { x: 0, y: 0 },

            text: {
                default: [
                    {
                        text: ['Spikes cannot be picked up.'],
                        position: NORTH
                    }, {
                        text: ['They will kill anyone that touches them.'],
                        position: SOUTH
                    }
                ]
            },
            maxHeight: 700
        }
    },

    // Level 17 - Spike war
    {
        size: { width: 9, height: 9 },
        start: { x: 4, y: 6 },
        end: { x: 8, y: 8 },
        bow: { x: 4, y: 5 },

        caves: [
            {
                pos: { x: 0, y: 0 },
                enemies: '1010101010'
            }, {
                pos: { x: 8, y: 0 },
                enemies: '0101010101'
            }
        ],

        caveInterval: 120,

        map: {
            walls: [{ x: 7, y: 7 }, { x: 7, y: 8 }, { x: 1, y: 7 }, { x: 1, y: 8 }],
        },

        entities: {
            spikes: [{ x: 4, y: 4 }],
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 8, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 4, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 4, y: 8 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 0, y: 4 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 8, y: 4 }
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 0, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 1 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 1, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 8, y: 1 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 7, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 3, y: 8 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 5, y: 8 }
                    }
                ]
            }
        ],

        meta: {
            required: 0,
            double: 12,
            triple: 1,
            secret: { x: 0, y: 8 },

            text: {
                default: [
                    {
                        text: ['Enemies will try to avoid spikes if possible.'],
                        position: NORTH
                    }, {
                        text: ['However, there are ways to force them to hit a spike.'],
                        position: SOUTH
                    }
                ]
            },
            maxHeight: 700
        }
    },

    // Level 18 - Block the holes
    {
        size: { width: 11, height: 11 },
        start: { x: 5, y: 6 },
        end: { x: 0, y: 0 },
        bow: { x: 5, y: 5 },

        caves: [
            {
                pos: { x: 3, y: 0 },
                enemies: '00000100100100'
            }, {
                pos: { x: 5, y: 0 },
                enemies: '00000010010010'
            }, {
                pos: { x: 7, y: 0 },
                enemies: '000000010010010'
            }, {
                pos: { x: 5, y: 10 },
                enemies: '100001'
            }, {
                pos: { x: 9, y: 0 },
                enemies: '000001'
            }
        ],

        caveInterval: 60,

        map: {
            // walls: [{ x: 7, y: 7 }, { x: 7, y: 8 }, { x: 1, y: 7 }, { x: 1, y: 8 }],
            fences: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 },
                { x: 8, y: 0 }, { x: 8, y: 1 }, { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 }, { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 },
                { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 },
                { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 1, y: 7 },
                { x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }, { x: 9, y: 7 }
            ]
        },

        entities: {
            rocks: [{ x: 3, y: 6 }, { x: 8, y: 8 }],
            spikes: [{ x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 }]
        },

        interactables: [
            {
                colour: RED,
                doors: [{ x: 0, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 2, y: 8 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 10, y: 0 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 10, y: 10 }
                    }
                ]
            }, {
                colour: BLUE,
                doors: [{ x: 10, y: 7 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 8 }
                    }
                ]
            }, {
                colour: GREEN,
                doors: [{ x: 3, y: 10 }],
                triggers: [
                    {
                        type: I_TARGET,
                        pos: { x: 0, y: 2 },
                        direction: WEST
                    }
                ]
            }, {
                colour: YELLOW,
                doors: [{ x: 7, y: 10 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 0, y: 10 }
                    }
                ]
            }, {
                colour: CYAN,
                doors: [{ x: 8, y: 3 }, { x: 8, y: 5 }],
                triggers: [
                    {
                        type: I_BUTTON,
                        pos: { x: 3, y: 2 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 5, y: 2 }
                    }, {
                        type: I_BUTTON,
                        pos: { x: 7, y: 2 }
                    }
                ]
            }
        ],

        meta: {
            required: 0,
            double: 9,
            triple: 2,
            secret: { x: 3, y: 0 },

            text: {
                bow: [
                    {
                        text: ['Quick! Block the holes!'],
                        position: NORTH
                    }
                ]
            },
            maxHeight: 750
        }
    }
];