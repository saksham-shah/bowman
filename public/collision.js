function collideWithPoint(pos1, pos2, distance, weight = 1) {
    let d = p5.Vector.dist(pos1, pos2);

    if (d < distance) {
        let awayVector = p5.Vector.sub(pos1, pos2);
        awayVector.setMag((distance - d) * weight);

        awayVector.add(pos1);

        return {
            moved: true,
            pos: awayVector
        }
    }

    return {
        moved: false
    }
}

function collideWithWalls(pos, r, grid) {
    let relativePos = {
        x: pos.x % CELL,
        y: pos.y % CELL
    }

    let cell = getCell(pos, grid.length, grid[0].length);

    let moved = false;

    // if (cell == null) {
    //     let newPos = pos.copy();

    //     if (pos.x < r) {
    //         newPos.x = r;
    //     } else if (pos.x > grid.length * CELL - r) {
    //         newPos.x = grid.length * CELL - r;
    //     }

    //     if (pos.y < r) {
    //         newPos.y = r;
    //     } else if (pos.y > grid[0].length * CELL - r) {
    //         newPos.x = grid[0].length * CELL - r;
    //     }

    //     return {
    //         moved: true,
    //         pos: newPos
    //     }
    // }

    if (playerCollides(cell.x, cell.y, grid)) {
        let newPos = pos.copy();

        let left = true, up = true;
        if (relativePos.x > CELL / 2) left = false;
        if (relativePos.y > CELL / 2) up = false;

        let leftOffset = left ? relativePos.x : CELL - relativePos.x;
        let upOffset = up ? relativePos.y : CELL - relativePos.y;

        let order;
        if (leftOffset < upOffset) {
            if (left) {
                if (up) {
                    order = [WEST, NORTH, SOUTH, EAST];
                } else {
                    order = [WEST, SOUTH, NORTH, EAST];
                }
            } else {
                if (up) {
                    order = [EAST, NORTH, SOUTH, WEST];
                } else {
                    order = [EAST, SOUTH, NORTH, WEST];
                }
            }
        } else {
            if (left) {
                if (up) {
                    order = [NORTH, WEST, EAST, SOUTH];
                } else {
                    order = [SOUTH, WEST, EAST, NORTH];
                }
            } else {
                if (up) {
                    order = [NORTH, EAST, WEST, SOUTH];
                } else {
                    order = [SOUTH, EAST, WEST, NORTH];
                }
            }
        }

        for (let dir of order) {
            switch (dir) {
                case WEST:
                    if (!playerCollides(cell.x - 1, cell.y, grid)) {
                        newPos.x -= relativePos.x + 1;
                        return {
                            moved: true,
                            pos: newPos
                        }
                    }
                    break;
                case EAST:
                    if (!playerCollides(cell.x + 1, cell.y, grid)) {
                        newPos.x += CELL - relativePos.x;
                        return {
                            moved: true,
                            pos: newPos
                        }
                    }
                    break;
                case NORTH:
                    if (!playerCollides(cell.x, cell.y - 1, grid)) {
                        newPos.y -= relativePos.y - 1;
                        return {
                            moved: true,
                            pos: newPos
                        }
                    }
                    break;
                case SOUTH:
                    if (!playerCollides(cell.x, cell.y + 1, grid)) {
                        newPos.y += CELL - relativePos.y;
                        return {
                            moved: true,
                            pos: newPos
                        }
                    }
                    break;
            }
        }
    }

    let dx = 0, dy = 0;

    if (relativePos.x < r) {
        // Colliding with left edge
        if (playerCollides(cell.x - 1, cell.y, grid)) {
            dx = r - relativePos.x;
            moved = true;
        }
    } else if (relativePos.x > CELL - r) {
        // Colliding with right edge
        if (playerCollides(cell.x + 1, cell.y, grid)) {
            dx = CELL - r - relativePos.x;
            moved = true;
        }
    }

    if (relativePos.y < r) {
        // Colliding with top edge
        if (playerCollides(cell.x, cell.y - 1, grid)) {
            dy = r - relativePos.y;
            moved = true;
        }
    } else if (relativePos.y > CELL - r) {
        // Colliding with bottom edge
        if (playerCollides(cell.x, cell.y + 1, grid)) {
            dy = CELL - r - relativePos.y;
            moved = true;
        }
    }

    // if (relativePos.x < r) {
    //     // Colliding with left edge
    //     if (cell.x == 0 || playerCollides(grid[cell.x - 1][cell.y])) {
    //         dx = r - relativePos.x;
    //         moved = true;
    //     }
    // } else if (relativePos.x > CELL - r) {
    //     // Colliding with right edge
    //     if (cell.x == grid.length - 1 || playerCollides(grid[cell.x + 1][cell.y])) {
    //         dx = CELL - r - relativePos.x;
    //         moved = true;
    //     }
    // }

    // if (relativePos.y < r) {
    //     // Colliding with top edge
    //     if (cell.y == 0 || playerCollides(grid[cell.x][cell.y - 1])) {
    //         dy = r - relativePos.y;
    //         moved = true;
    //     }
    // } else if (relativePos.y > CELL - r) {
    //     // Colliding with bottom edge
    //     if (cell.y == grid[0].length - 1 || playerCollides(grid[cell.x][cell.y + 1])) {
    //         dy = CELL - r - relativePos.y;
    //         moved = true;
    //     }
    // }

    if (moved) {
        let newPos = pos.copy();
        newPos.x += dx;
        newPos.y += dy;

        return {
            moved: true,
            pos: newPos
        }
    }

    // Top left corner
    if (playerCollides(cell.x - 1, cell.y - 1, grid)) {
        let cornerCollide = collideWithPoint(pos, createVector(cell.x * CELL, cell.y * CELL), r);
        if (cornerCollide.moved) return {
            moved: true,
            pos: cornerCollide.pos
        };
    }

    // Top right corner
    if (playerCollides(cell.x + 1, cell.y - 1, grid)) {
        let cornerCollide = collideWithPoint(pos, createVector(cell.x * CELL + CELL, cell.y * CELL), r);
        if (cornerCollide.moved) return {
            moved: true,
            pos: cornerCollide.pos
        };
    }

    // Bottom left corner
    if (playerCollides(cell.x - 1, cell.y + 1, grid)) {
        let cornerCollide = collideWithPoint(pos, createVector(cell.x * CELL, cell.y * CELL + CELL), r);
        if (cornerCollide.moved) return {
            moved: true,
            pos: cornerCollide.pos
        };
    }

    // Bottom right corner
    if (playerCollides(cell.x + 1, cell.y + 1, grid)) {
        let cornerCollide = collideWithPoint(pos, createVector(cell.x * CELL + CELL, cell.y * CELL + CELL), r);
        if (cornerCollide.moved) return {
            moved: true,
            pos: cornerCollide.pos
        };
    }

    // // Top left corner
    // if (cell.x > 0 && cell.y > 0 && playerCollides(grid[cell.x - 1][cell.y - 1])) {
    //     let cornerCollide = collideWithPoint(pos, createVector(cell.x * CELL, cell.y * CELL), r);
    //     if (cornerCollide.moved) return {
    //         moved: true,
    //         pos: cornerCollide.pos
    //     };
    // }

    // // Top right corner
    // if (cell.x < grid.length - 1 && cell.y > 0 && playerCollides(grid[cell.x + 1][cell.y - 1])) {
    //     let cornerCollide = collideWithPoint(pos, createVector(cell.x * CELL + CELL, cell.y * CELL), r);
    //     if (cornerCollide.moved) return {
    //         moved: true,
    //         pos: cornerCollide.pos
    //     };
    // }

    // // Bottom left corner
    // if (cell.x > 0 && cell.y < grid[0].length - 1 && playerCollides(grid[cell.x - 1][cell.y + 1])) {
    //     let cornerCollide = collideWithPoint(pos, createVector(cell.x * CELL, cell.y * CELL + CELL), r);
    //     if (cornerCollide.moved) return {
    //         moved: true,
    //         pos: cornerCollide.pos
    //     };
    // }

    // // Bottom right corner
    // if (cell.x < grid.length - 1 && cell.y < grid[0].length - 1 && playerCollides(grid[cell.x + 1][cell.y + 1])) {
    //     let cornerCollide = collideWithPoint(pos, createVector(cell.x * CELL + CELL, cell.y * CELL + CELL), r);
    //     if (cornerCollide.moved) return {
    //         moved: true,
    //         pos: cornerCollide.pos
    //     };
    // }

    return {
        moved: false
    }
}

function getCell(pos, width, height) {
    let x = Math.floor(pos.x / CELL);
    // if (x < 0 || x >= width) return null;

    let y = Math.floor(pos.y / CELL);
    // if (y < 0 || y >= height) return null;

    return { x, y };
}

function playerCollidesOld(cell) {
    return cell.type == WALL || cell.type == DOOR || cell.type == BREAKABLE || cell.type == FENCE;
}

function playerCollides(x, y, grid) {
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) return true;
    let cell = grid[x][y];
    return cell.type == WALL || cell.type == DOOR || cell.type == BREAKABLE || cell.type == FENCE;
}

function projectileCollides(x, y, grid) {
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) return true;
    let cell = grid[x][y];
    return cell.type == WALL || cell.type == DOOR || cell.type == BREAKABLE;
}