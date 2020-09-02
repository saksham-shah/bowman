function addLevelEndScreen() {
    let result;
    let time = 0;

    let w = 600, h = 700;

    addPopup('level end', {
        width: w,
        height: h,
        onDisplay: _result => {
            result = _result;
            time = 0;

            console.log(result);
        },
        draw: () => {
            fill('#fdcd92');
            stroke(255);

            rect(w / 2, h / 2, w, h, 20);

            // Text
            textAlign(CENTER);
            textSize(90);
            fill(255);
            noStroke();
            text(`Level ${result.level + 1}`, w / 2, 125);

            let t;
            if (result.stars == 0) {
                t = 'Oh no! You were shot!';
            } else if (result.stars < 3) {
                t = `${result.arrows} fewer arrow${result.arrows == 1 ? '' : 's'} for next star`;
            } else {
                t = 'Well done!';
            }

            textSize(42);
            text(t, w / 2, 390);

            // Stars
            for (let i = 0; i < 3; i++) {
                if (result.stars > i) {
                    fill(255);
                } else {
                    fill(150);
                }

                stroke(100);
                ellipse(w / 2 - 175 + 175 * i, 250, 120);
            }
        }
    })
    .addButton({
        position: { x: w / 2, y: 475 },
        width: 250,
        height: 50,
        textSize: 35,
        text: 'Next level',
        onClick: () => {
            closePopup();
            let level = result.level + 1;
            if (level < levels.length) {
                setScreen('game');
                game = new Level(level);

            } else {
                setScreen('levels');
            }
        }
    })
    .addButton({
        position: { x: w / 2, y: 550 },
        width: 250,
        height: 50,
        textSize: 35,
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
        textSize: 35,
        text: 'Level select',
        onClick: () => {
            closePopup();
            setScreen('levels');
        }
    })
}