function addPauseScreen() {
    let level;
    let w = 600, h = 500;

    addPopup('pause', {
        width: w,
        height: h,
        onDisplay: _level => {
            level = _level;
            game.paused = true;
        },
        draw: () => {
            fill('#fdb159');
            stroke('#fca440');
            strokeWeight(10);

            rect(w / 2, h / 2, w, h, 20);

            // Text
            textAlign(CENTER);
            textSize(120);
            fill(255);
            noStroke();
            text(`Level ${level + 1}`, w / 2, 125);
        }
    })
    .on('keyDown', e => {
        if (e.key == 'p') {
            closePopup();
            game.paused = false;
        }
    })
    .addButton({
        position: { x: w / 2, y: 200 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'Resume',
        onClick: () => {
            closePopup();
            game.paused = false;
        }
    })
    .addButton({
        position: { x: w / 2, y: 275 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'Restart',
        onClick: () => {
            closePopup();
            game = new Level(level);
        }
    })
    .addButton({
        position: { x: w / 2, y: 350 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'Next level',
        onClick: () => {
            closePopup();
            let nextLevel = level + 1;
            if (nextLevel < levels.length) {
                if (stats.totalStars >= levels[nextLevel].meta.required) {
                    setScreen('game');
                    game = new Level(nextLevel);
    
                } else {
                    setScreen('levels');
                    openPopup('locked', nextLevel);
                }
            } else {
                setScreen('levels');
                openPopup('thanks');
            }
        }
    })
    .addButton({
        position: { x: w / 2, y: 425 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'Level select',
        onClick: () => {
            closePopup();
            setScreen('levels');
        }
    });
}