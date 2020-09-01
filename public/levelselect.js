function setupLevelSelect() {
    let levelData = [];
    for (let i = 0; i < levels.length; i++) {
        levelData.push({
            stars: 0,
            secret: false
        });
    }

    let hovered = -1;

    addScreen('levels', {
        update: () => {
            let mousePos = getScreen('levels').mousePos;
            mousePos = {
                x: mousePos.x - 800,
                y: mousePos.y - 100
            }

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
            }

        },
        draw: () => {
            push();
            translate(800, 100);

            noStroke();

            for (let i = 0; i < 25; i++) {
                let x = i % 5 * 150;
                let y = Math.floor(i / 5) * 150;

                if (i >= levels.length) {
                    fill(150);
                } else if (i == hovered) {
                    fill(200);
                } else {
                    fill(255);
                }

                rect(x + 50, y + 50, 100, 100);
            }

            pop();
        },
    })
    .on('mouseUp', e => {
        if (hovered >= 0) {
            setScreen('game');

            game = new Level(levels[hovered]);
        }
    })
}