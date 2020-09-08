let settings = {
    music: 50,
    sound: 50
}

function addMainScreens() {
    // Menu
    addScreen('menu', {
        draw: () => {
            textAlign(CENTER);
            textSize(300);
            fill(255);
            noStroke();

            text('Bowman', 800, 250);
        }
    })
    .addButton({
        position: { x: 800, y: 450 },
        width: 400,
        height: 100,
        textSize: 75,
        text: 'Play',
        onClick: () => setScreen('levels')
    })
    .addButton({
        position: { x: 800, y: 650 },
        width: 400,
        height: 100,
        textSize: 75,
        text: 'Settings',
        onClick: () => setScreen('settings')
    });

    // Game
    addScreen('game', {
        draw: () => {
            if (game && !game.paused) {
                // dt = deltaTime * 0.06;
                // if (dt > 5) dt = 5;
                game.update();
            }

            if (game) drawLevel(game.toObject());
        }
    })
    .on('mouseDown', e => {
        if (game && !game.paused) game.click(e.button == 0);
    })
    .on('keyDown', e => {
        if (e.key == ' ' && game && !game.paused) return game.click(false);

        if ((e.key == 'p') && game && !game.paused && (game.ended == -1)) {
            openPopup('pause', game.level);
        } else if (e.key == 'r' && game && !game.paused && (game.ended == -1)) {
            game = new Level(game.level);
        }
    });

    // Settings
    addScreen('settings', {
        draw: () => {
            textAlign(CENTER);
            textSize(300);
            fill(255);
            noStroke();

            text('Settings', 800, 250);

            textSize(75);

            text('Sound', 800, 380)
            text('Music', 800, 580)
        }
    })
    .addSlider({
        position: { x: 800, y: 440 },
        width: 500,
        height: 20,
        max: 100,
        value: settings.sound,
        scrollSpeed: 2,
        radius: 40,
        textSize: 40,
        onMove: v => {
            settings.sound = v;
            v /= 50;
            for (let soundName in sounds) {
                if (soundName != 'music') {
                    let vol = volumes[soundName];
                    if (vol == undefined) vol = 1;
                    if (soundName != 'winstars') {
                        sounds[soundName].setVolume(v * vol);
                    } else {
                        for (let s of sounds[soundName]) {
                            s.setVolume(v * vol);
                        }
                    }
                }
            }
        },
    })
    .addSlider({
        position: { x: 800, y: 640 },
        width: 500,
        height: 20,
        max: 100,
        value: settings.music,
        scrollSpeed: 2,
        radius: 40,
        textSize: 40,
        onMove: v => {
            settings.music = v;
            sounds.music.setVolume(v / 50 * volumes.music);
        },
    })
    .addButton({
        position: { x: 800, y: 800 },
        width: 400,
        height: 75,
        textSize: 60,
        text: 'Reset progress',
        onClick: () => openPopup('confirm reset')
    })
    .addButton({
        position: { x: 75, y: 75 },
        width: 75,
        height: 75,
        textSize: 75,
        text: '<',
        onClick: () => {
            setScreen('menu');

            localStorage.setItem('bowman settings', JSON.stringify(settings));
        }
    });

    // Reset confirmation
    let w = 675, h = 400;
    addPopup('confirm reset', {
        width: w,
        height: h,
        draw: () => {
            fill('#fdb159');
            stroke('#fca440');
            strokeWeight(10);

            rect(w / 2, h / 2, w, h, 20);

            // Text
            textAlign(CENTER);
            textSize(80);
            fill(255);
            noStroke();
            text(`Are you sure?`, w / 2, 125);

            textSize(40);
            text(`You will lose your ${stats.totalStars} star${stats.totalStars == 1 ? '' : 's'} of\nprogress.`, w / 2, 200);
        }
    })
    .addButton({
        position: { x: w / 2 - 150, y: 325 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'Reset',
        onClick: () => {
            stats = {
                levelData: [],
                gainedStars: 0,
                freeStars: 0,
                totalStars: 0,
            }

            for (let i = 0; i < levels.length; i++) {
                stats.levelData.push({
                    stars: 0,
                    secret: false
                });
            }

            localStorage.setItem('bowman stats', JSON.stringify(stats));
            
            closePopup();
        }
    })
    .addButton({
        position: { x: w / 2 + 150, y: 325 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'Cancel',
        onClick: () => {
            closePopup();
        }
    });
}