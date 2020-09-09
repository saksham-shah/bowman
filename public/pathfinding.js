function Set(width, height, defaultValue = 0) {
    let _set = [];
    for (let i = 0; i < width; i++) {
        let col = [];
        for (let j = 0; j < height; j++) {
            col.push(defaultValue);
        }

        _set.push(col);
    }

    return {
        set: function(cell, val) {
            _set[cell.x][cell.y] = val;
        },
        get: function(cell) {
            return _set[cell.x][cell.y];
        }
    };
}

function reconstructPath(cameFrom, current) {
    let path = [current];
    while (cameFrom.get(current) !== null) {
        current = cameFrom.get(current);
        path.splice(0, 0, current);
    }

    return path;
}

function findPath(grid, start, goal) {
    let openSet = [start];

    let cameFrom = new Set(grid.length, grid[0].length, null);
    let gScore = new Set(grid.length, grid[0].length, Infinity);
    let fScore = new Set(grid.length, grid[0].length, Infinity);

    gScore.set(start, 0);
    fScore.set(start, heuristic(start, goal));

    while (openSet.length > 0) {
        openSet.sort(function(a, b) {
            return fScore.get(a) - fScore.get(b)
        })
        let current = openSet[0];

        if (current.x == goal.x && current.y == goal.y) {
            return reconstructPath(cameFrom, current);
        }

        openSet.splice(0, 1);

        for (let neighbour of getNeighbours(current, grid.length, grid[0].length)) {
            tentativeGScore = gScore.get(current) + edgeValue(neighbour, grid);

            if (tentativeGScore < gScore.get(neighbour)) {
                cameFrom.set(neighbour, current);
                gScore.set(neighbour, tentativeGScore);
                fScore.set(neighbour, tentativeGScore + heuristic(neighbour, goal));

                let alreadyOpen = false;
                for (let cell of openSet) {
                    if (cell.x == neighbour.x && cell.y == neighbour.y) {
                        alreadyOpen = true;
                    }
                }

                if (!alreadyOpen) {
                    openSet.push(neighbour);
                }
            }
        }
    }

    console.log('NOOOOOOOOOOOOOOOOOOO');
    return [];
}

function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function edgeValue(cell, grid) {
    let type = grid[cell.x][cell.y].type;

    switch (type) {
        case WALL:
            return 10000000;
        case DOOR:
            return 1000;
        case FENCE:
            return 100000;
        case BREAKABLE:
            return 100000;
        default:
            return 1 + 10 * grid[cell.x][cell.y].spikes;
    }
}

function getNeighbours(cell, width, height) {
    let neighbours = [];

    if (cell.x > 0) {
        neighbours.push({ x: cell.x - 1, y: cell.y });
    }

    if (cell.y > 0) {
        neighbours.push({ x: cell.x, y: cell.y - 1 });
    }

    if (cell.x < width - 1) {
        neighbours.push({ x: cell.x + 1, y: cell.y });
    }

    if (cell.y < height - 1) {
        neighbours.push({ x: cell.x, y: cell.y + 1 });
    }

    return neighbours;
}