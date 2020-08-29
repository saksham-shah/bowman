function drawLevel(level) {
    let { entities, grid, placePosition } = level;

    let w = 48 * grid.length, h = 48 * grid[0].length;
    push();
    translate(cornerX, cornerY);
    scale(zoom);

    noFill();
    stroke(255, 0, 0);
    rect(w / 2, h / 2, w, h);

    drawGrid(grid);

    for (let entity of entities) {
        drawEntity(entity, placePosition);
    }

    pop();
}

function drawGrid(grid) {
    noStroke();
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            let draw = true;;
            switch (grid[x][y].type) {
                case WALL:
                    fill(150);
                    break;
                case END:
                    fill(0, 255, 0);
                    break;
                default:
                    draw = false;
            }

            if (draw) {
                rect(x * CELL + CELL / 2, y * CELL + CELL / 2, CELL, CELL);
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
            fill(200, 200, 0, 150);
            stroke(255, 255, 0);
            ellipse(0, 0, entity.r * 2);

            strokeWeight(5);
            line(entity.r + 15, 0, entity.r + 10, 5)
            line(entity.r + 15, 0, entity.r + 10, -5)
            break;
        case ROCK:
            if (entity.pickedUp) {
                rotate(-entity.angle);
                translate(p5.Vector.sub(placePosition, entity.pos));
                rotate(entity.angle);

                if (entity.canBePlaced) {
                    fill(0, 255, 0, 150);
                } else {
                    fill(255, 0, 0, 150);
                }
               
            } else if (entity.hovered) {
                fill(0, 255, 0);
            } else if (entity.closeToPlayer) {
                fill(255, 255, 0);
            } else {
                fill(50);
            }
            stroke(200);
            ellipse(0, 0, entity.r * 2);
            break;
        default:
            fill(50);
            stroke(200);
            ellipse(0, 0, entity.r * 2);

    }

    pop();
}