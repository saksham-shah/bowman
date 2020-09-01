const

// Settings
CLICK = 0,
DRAG = 1,
SETTINGS = {
    pickup: CLICK
},

// Values
CELL = 48,
PICKUP = 60, PICKUPSQ = PICKUP * PICKUP,
BUTTONR = 16,
TARGETR = 30,

// Arrows
MINSPEED = 5,
MAXSPEED = 30,
PULLBACK = 60,
FORCE = 0.5,
MINSTEP = 1,

ARCHERERROR = Math.PI / 8,

// Directions
NORTH = 0,
EAST = 1,
SOUTH = 2,
WEST = 3,

// Colours
RED = 'red',
YELLOW = 'yellow',
GREEN = 'green',
CYAN = 'cyan',
BLUE = 'blue',
MAGENTA = 'magenta',
COLOURS = [RED, YELLOW, GREEN, CYAN, BLUE, MAGENTA],

// Interactables
I_BUTTON = 0,
I_TARGET = 1,

// Entities
PLAYER = 0,
ROCK = 1,
CORPSE = 2,
ARCHER = 3,

// Cell types
EMPTY = 0,
WALL = 1,
DOOR = 2,
BREAKABLE = 3,
FENCE = 4,
BUTTON = 5,
BOW = 6,
END = 7,
CAVE = 8,
OPENDOOR = 8,

// Enemy spawns
S_NOTHING = 0,
S_BOW = 1
S_REPEAT = '*',

// Projectile fired by
P_PLAYER = 0,
P_ENEMY = 1,
P_NEUTRAL = 2,
// Projectile hit
P_GROUND = 0,
P_CELL = 1,
P_ENTITY = 2
