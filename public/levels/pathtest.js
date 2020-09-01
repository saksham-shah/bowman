const PATHTEST = {
    size: { width: 9, height: 9 },
    start: { x: 0, y: 5 },
    end: { x: 8, y: 5 },
    bow: { x: 1, y: 5 },

    caves: [{
        pos: { x: 0, y: 3 },
        enemies: '100000*'
    }, {
        pos: { x: 8, y: 3 },
        enemies: '000100*'
    }],

    map: {
        walls: [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }],
        fences: [{ x: 8, y: 4 }, { x: 7, y: 4 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }],
    }
}