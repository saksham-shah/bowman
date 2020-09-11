let stats = {
    levelData: [],
    gainedStars: 0,
    freeStars: 0,
    totalStars: 0,
    // secret: false
}

let secret = false;

function setupLevelSelect() {
    for (let i = 0; i < levels.length; i++) {
        stats.levelData.push({
            stars: 0,
            secret: false
        });
    }

    let hovered = -1;

    addScreen('levels', {
        getCursorState: () => {
            if (hovered >= 0) return 'pointer';
        },
        update: () => {
            let mousePos = getScreen('levels').mousePos;
            mousePos = {
                x: mousePos.x - 800,
                y: mousePos.y - 100
            }

            let oldHovered = hovered;

            hovered = -1;

            if (mousePos.x < 0 || mousePos.y < 0 || mousePos.x >= 750 || mousePos.y >= 750) return;

            let relPos = {
                x: mousePos.x % 150,
                y: mousePos.y % 150
            }

            if (relPos.x < 100 && relPos.y < 100) {
                let cell = {
                    x: Math.floor(mousePos.x / 150),
                    y: Math.floor(mousePos.y / 150)
                }

                hovered = cell.x + cell.y * 5;

                if (hovered >= levels.length || stats.totalStars < requiredStars[hovered]) {
                    hovered = -1;

                } else if (hovered != oldHovered) {
                    sounds.buttonhover.play();
                }
            }

        },
        draw: () => {
            push();
            noStroke();
            textAlign(CENTER);
            fill(255);

            textSize(60);
            text('Get stars to unlock levels!', 400, 200);

            if (hovered >= 0) {
                textSize(40);
                text(`Difficulty: ${levels[hovered].meta.difficulty || '-'}`, 400, 250);
            }

            textSize(50);
            text('Stars', 250, 370);
            text('Free stars', 550, 370);

            textSize(150);
            text(stats.gainedStars, 250, 500);
            // text(`${stats.gainedStars}/${4 * levels.length}`, 250, 500);
            text(stats.freeStars, 550, 500);

            textSize(35);
            text('While this game is in the Unexpected Jam 2020,\nyou can get free stars to unlock all of the levels!', 400, 650);

            translate(800, 100);
            textSize(72);

            for (let i = 0; i < 25; i++) {
                let x = i % 5 * 150;
                let y = Math.floor(i / 5) * 150;

                noStroke();
                if (i >= levels.length) {
                    fill('#4e2d05');
                } else if (requiredStars[i] > stats.totalStars) {
                    fill('#ac6316')
                } else if (i == hovered) {
                    // fill('#fdb159');
                    fill('#fd962c');
                } else {
                    // fill('#fca440');
                    fill('#ec8622');
                }

                rect(x + 50, y + 50, 100, 100, 10);

                if (i < levels.length) {
                    if (stats.totalStars >= requiredStars[i]) {
                        if (stats.levelData[i].secret) {
                            stroke(255, 225, 0);
                            strokeWeight(5);
                            noFill();
                            rect(x + 50, y + 50, 100, 100, 10);
                        }
    
                        noStroke();
                        if (stats.levelData[i].stars == 3) {
                            fill(255, 225, 0);
                        } else {
                            fill(255);
                        }
                        textSize(72);
                        text(i + 1, x + 50, y + 50);
    
                        // Stars
                        for (let j = 0; j < 3; j++) {
                            let star;
                            if (stats.levelData[i].stars > j) {
                                // fill(255);
                                star = graphics.star.gold;
                            } else {
                                // fill(150);
                                star = graphics.star.grey;
                            }
    
                            // stroke(100);
                            // strokeWeight(1);
                            // ellipse(x + 50 - 30 + 30 * j, y + 75, 20);
                            image(star, x + 6 + 30 * j, y + 61, 28, 28)
                        }
                    } else {
                        noStroke();
                        fill(255);
                        let size, needed = requiredStars[i] - stats.totalStars;
                        if (needed < 10) {
                            textSize(72)
                            text(needed, x + 30, y + 70);
                        } else {
                            textSize(54)
                            text(needed, x + 30, y + 65);
                        }

                        // fill(255);
                        // stroke(100);
                        // strokeWeight(1);
                        // ellipse(x + 70, y + 50, 20);
                        image(graphics.star.gold, x + 52, y + 32, 36, 36);
                    }
                } else {
                    textSize(54);
                    noStroke();
                    fill(255);
                    text('TBD', x + 50, y + 65);
                }
            }

            pop();
        },
    })
    .on('mouseUp', e => {
        if (hovered >= 0) {
            setScreen('game');

            game = new Level(hovered);

            sounds.buttonclick.play();
        }
    })
    .addButton({
        position: { x: 400, y: 765 },
        width: 400,
        height: 70,
        textSize: 50,
        text: 'Get free star',
        onClick: () => {
            if (stats.totalStars < 4 * levels.length) {
                stats.totalStars++;
                stats.freeStars++;

                localStorage.setItem('bowman stats', JSON.stringify(stats));
            }
        }
    })
    .addButton({
        position: { x: 75, y: 75 },
        width: 75,
        height: 75,
        textSize: 75,
        text: '<',
        onClick: () => setScreen('menu')
    });
}

/*
{
    level: number,
    stars: 0/1/2/3,
    secret: boolean
}
*/
function updateStars(result) {
    let levelData = stats.levelData[result.level];

    if (result.stars > levelData.stars) {
        let extra = result.stars - levelData.stars;
        stats.gainedStars += extra;
        levelData.stars = result.stars;
    }

    if (result.stars > 0 && result.secret && !levelData.secret) {
        stats.gainedStars++;
        levelData.secret = true;
    }

    stats.totalStars = stats.gainedStars + stats.freeStars;
    if (stats.totalStars > 4 * levels.length) {
        stats.freeStars = 4 * levels.length - stats.gainedStars;
        stats.totalStars = 4 * levels.length;
    }

    localStorage.setItem('bowman stats', JSON.stringify(stats));

    // openPopup('level end', {
    //     level: result.level,
    //     stars: result.stars,
    //     secret: false,
    //     arrows: 1
    // });
}