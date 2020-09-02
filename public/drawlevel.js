let star = {
    pos: null,
    time: 0
};

let texts = {};

let textDisplayed = {
    default: false,
    cave: false,
    kill: false,
    bow: false
}

resetText();

function resetText() {
    texts[NORTH] = '';
    texts[SOUTH] = '';
    
    textDisplayed = {
        default: false,
        kill: false,
        bow: false
    }
}

function displayText(meta, textType) {
    if (textDisplayed[textType]) return;
    textDisplayed[textType] = true;

    if (!meta.text[textType]) return;

    for (let t of meta.text[textType]) {
        texts[t.position] = t.text;
    }
}

function drawLevel(level) {
    let { entities, arrows, grid, interactables, buttons, targets } = level;

    push();
    translate(cornerX, cornerY);
    scale(zoom);

    drawGrid(grid, interactables, buttons, targets);

    for (let arrow of arrows) {
        // if (!arrow.grounded) continue;
        drawArrow(arrow);
    }

    // for (let arrow of arrows) {
    //     if (arrow.grounded) continue;
    //     drawArrow(arrow);
    // }

    for (let entity of entities) {
        drawEntity(entity);
    }

    for (let entity of entities) {
        drawEntityArrows(entity);
    }

    if (star.time > 0) {
        let percent = (180 - star.time) / 180;
        let size = 28 + 112 * percent;
        tint(255, 255 - 255 * percent);
        image(graphics.star.gold, star.pos.x - size / 2, star.pos.y - size / 2, size, size);
        tint(255);

        star.time -= dt;
    }

    pop();

    textAlign(CENTER);
    textSize(30 * zoom);
    fill(255);
    noStroke();

    if (texts[NORTH].length > 0) {
        text(texts[NORTH], 800, (cornerY - CELL * zoom) / 2 + 15);
    }

    if (texts[SOUTH].length > 0) {
        text(texts[SOUTH], 800, 900 - (cornerY - CELL * zoom) / 2 + 15);
    }
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
                    image(graphics.map.fence, x * CELL, y * CELL);
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

            if (cell.targets.length == 0) continue;
            push();
            translate(x * CELL + CELL / 2, y * CELL + CELL / 2);
            for (let target of cell.targets) {
                push();
                rotate((target.direction * Math.PI - Math.PI) / 2);

                colour = interactables[target.interactID].colour;
                image(graphics.targets[colour][targets[target.targetID].pressed ? 1 : 0], -CELL / 2, -CELL / 2);

                pop();
            }
            pop();
        }
    }
}

function drawEntity(entity) {
    push();
    translate(entity.pos);
    rotate(entity.angle);
    strokeWeight(2);

    let img;
    switch (entity.type) {
        case PLAYER:
            push();
            rotate(Math.PI / 2);
            let frame = 0;
            if (entity.bow) {
                frame = Math.min(3, Math.ceil(entity.pullback / 20));
                img = graphics.player.bow[frame];
            } else {
                img = graphics.player.base;
            }
            image(img, -CELL / 2, -CELL * 3 / 4);
            pop();

            if (entity.bow && (entity.cooldown <= 0 || frame > 0)) {
                rotate()
                drawArrow({
                    pos: createVector(30 - frame * 3, 0),
                    angle: 0
                });
            }

            break;
        case ROCK:
            img = graphics.rock.base;
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
        case ARCHER:
            fill(150, 0, 0);
            stroke(200);
            ellipse(0, 0, entity.r * 2);
            line(0, 0, entity.r, 0);

            rotate(-entity.angle);
            rect(0, -entity.r * 2, entity.r * 2.5, entity.r / 1.5 );
            fill(0, 150, 0);
            rect(-entity.r * 1.25 + entity.r * 1.25 * entity.healthPercent, -entity.r * 2, entity.r * 2.5 * entity.healthPercent, entity.r / 1.5)
            break;
        case CORPSE:
            fill(150);
            stroke(200);
            ellipse(0, 0, entity.r * 2);
            line(0, 0, entity.r, 0);

            if (entity.healthPercent > 0) {
                rotate(-entity.angle);
                fill(150, 0, 0);
                rect(0, -entity.r * 2, entity.r * 2.5, entity.r / 1.5 );
                fill(0, 150, 0);
                rect(-entity.r * 1.25 + entity.r * 1.25 * entity.healthPercent, -entity.r * 2, entity.r * 2.5 * entity.healthPercent, entity.r / 1.5)
            }
            break;
        default:
            fill(50);
            stroke(200);
            ellipse(0, 0, entity.r * 2);
            line(0, 0, entity.r, 0);

    }

    // for (let arrow of entity.arrows) {
    //     drawArrow(arrow);
    // }

    pop();
}

function drawEntityArrows(entity) {
    push();
    translate(entity.pos);
    rotate(entity.angle);

    for (let arrow of entity.arrows) {
        drawArrow(arrow);
    }

    pop();
}

function drawArrow(arrow) {
    push();
    translate(arrow.pos);
    rotate(arrow.angle + Math.PI / 2);

    image(graphics.projectiles.arrow, -4.5, -12);//, 6, 24)

    // stroke(255);
    // strokeWeight(2);
    // // ellipse(0, 0, 10);
    // line(0, 0, -10, 0)

    pop();
}