function addLevelEndScreen() {
    let result;
    let time = 0;
    let starsDrawn;

    let w = 600, h = 700;

    addPopup('level end', {
        width: w,
        height: h,
        onDisplay: _result => {
            result = _result;
            time = 0;

            starsDrawn = [false, false, false];

            if (result.stars == 0) {
                sounds.playerdie.play();
            }
        },
        draw: () => {
            time += dt;
            fill('#fdb159');
            stroke('#fca440');
            strokeWeight(10);

            rect(w / 2, h / 2, w, h, 20);

            // Text
            textAlign(CENTER);
            textSize(120);
            fill(255);
            noStroke();
            text(`Level ${result.level + 1}`, w / 2, 125);

            let t;
            if (result.stars == 0) {
                t = 'Oh no! You were shot!';
                textSize(50);
            } else if (result.stars < 3) {
                t = `${result.arrows} fewer arrow${result.arrows == 1 ? '' : 's'} for next star`;
                textSize(45);
            } else {
                t = 'Well done!';
                textSize(60);
            }

            text(t, w / 2, 390);

            // Stars
            let interval = 20;
            for (let i = 0; i < 3; i++) {
                tint(255);
                image(graphics.star.grey, w / 2 - 245 + 175 * i, 170);

                if (result.stars > i) {
                    if (time > interval / 2 + interval * i) {
                        if (time < interval + interval * i) {
                            let percent = (2 * time - interval - 2 * interval * i) / interval;
                            tint(255, 255 * percent);
                        } else {
                            tint(255);
                        }
                        image(graphics.star.gold, w / 2 - 245 + 175 * i, 170);

                        if (!starsDrawn[i]) {
                            starsDrawn[i] = true;
                            sounds.winstars[i].play();
                        }
                    }
                }
            }
        }
    })
    .addButton({
        position: { x: w / 2, y: 475 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'Next level',
        onClick: () => {
            closePopup();
            let level = result.level + 1;
            if (level < levels.length) {
                if (stats.totalStars >= levels[level].meta.required) {
                    setScreen('game');
                    game = new Level(level);
    
                } else {
                    setScreen('levels');
                    openPopup('locked', level);
                }
            } else {
                setScreen('levels');
                openPopup('thanks');
            }
        }
    })
    .addButton({
        position: { x: w / 2, y: 550 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'Try again',
        onClick: () => {
            closePopup();
            setScreen('game');
            game = new Level(result.level);
        }
    })
    .addButton({
        position: { x: w / 2, y: 625 },
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