let _grid;
function drawLevel(level) {
    let { entities, grid, interactables, buttons, targets, placePosition } = level;

    _grid = grid;

    let w = 48 * grid.length, h = 48 * grid[0].length;
    push();
    translate(cornerX, cornerY);
    scale(zoom);

    // noFill();
    // stroke(255, 0, 0);
    // rect(w / 2, h / 2, w, h);

    drawGrid(grid, interactables, buttons, targets);

    for (let entity of entities) {
        drawEntity(entity, placePosition);
    }

    pop();
}

function drawGrid(grid, interactables, buttons, targets) {
    noStroke();
    for (let x = -1; x <= grid.length; x++) {
        image(graphics.map.wall, x * CELL, -CELL);
        image(graphics.map.wall, x * CELL, grid[0].length * CELL);
    }

    for (let y = 0; y < grid[0].length; y++) {
        image(graphics.map.wall, -CELL, y * CELL);
        image(graphics.map.wall, grid.length * CELL, y * CELL);
    }

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            let colour, cell = grid[x][y];
            switch (cell.type) {
                case EMPTY:
                    image(graphics.map.floor, x * CELL, y * CELL);
                    break;
                case WALL:
                    image(graphics.map.wall, x * CELL, y * CELL);
                    break;
                case DOOR:
                    colour = interactables[cell.interactID].colour;
                    image(graphics.doors[colour], x * CELL, y * CELL);
                    break;
                case FENCE:
                    fill(0, 0, 255);
                    rect(x * CELL + CELL / 2, y * CELL + CELL / 2, CELL, CELL);
                    break;
                case BUTTON:
                    colour = interactables[cell.interactID].colour;
                    image(graphics.buttons[colour][buttons[cell.buttonID].pressed ? 1 : 0], x * CELL, y * CELL);
                    break;
                case BOW:
                    image(graphics.map.bow, x * CELL, y * CELL);
                    break;
                case END:
                    fill(0, 255, 0);
                    rect(x * CELL + CELL / 2, y * CELL + CELL / 2, CELL, CELL);
                    break;
                case CAVE:
                    fill(0);
                    rect(x * CELL + CELL / 2, y * CELL + CELL / 2, CELL, CELL);
                    break;
                default:
                    // draw = false;
            }
        }
    }
}

function drawEntity(entity, placePosition) {
    push();
    translate(entity.pos);
    rotate(entity.angle);
    strokeWeight(2);

    switch (entity.type) {
        case PLAYER:
            rotate(Math.PI / 2);
            image(graphics.player.base, -CELL / 2, -CELL * 3 / 4);
            // fill(200, 200, 0, 150);
            // stroke(255, 255, 0);
            // ellipse(0, 0, entity.r * 2);

            // strokeWeight(5);
            // line(entity.r + 15, 0, entity.r + 10, 5)
            // line(entity.r + 15, 0, entity.r + 10, -5)
            break;
        case ROCK:
            let img = graphics.rock.base;
            if (entity.pickedUp) {
                if (entity.canBePlaced) {
                    tint(255, 150);
                } else {
                    tint(255, 0, 0, 150);
                }
               
            } else {
                if (entity.hovered) {
                    img = graphics.rock.hover;
                } else if (entity.closeToPlayer) {
                    img = graphics.rock.close;
                }
            }

            image(img, -CELL / 2, -CELL / 2);
            break;
        default:
            fill(50);
            stroke(200);
            ellipse(0, 0, entity.r * 2);

    }

    pop();
}