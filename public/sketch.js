let game;
let dt;

let cornerX, cornerY, zoom;

let graphicsFolder = 'assets/graphics/';

let graphics = {
    map: {},
    player: {},
    buttons: {},
    targets: {},
    doors: {},
    rock: {},
    projectiles: {},
    star: {},
    enemies: {},
    corpses: {},
    goal: {}
};

let font;

function preload() {
    graphics.map.floor = loadImage(graphicsFolder + 'map/floor.png');
    graphics.map.wall = loadImage(graphicsFolder + 'map/wall.png');
    graphics.map.fence = loadImage(graphicsFolder + 'map/fence.png');
    graphics.map.bow = loadImage(graphicsFolder + 'map/bow.png');
    graphics.map.cave = loadImage(graphicsFolder + 'map/hole.png');

    graphics.player.base = loadImage(graphicsFolder + 'player/playerbase.png');
    graphics.player.bow = [];
    for (let i = 0; i < 4; i++) {
        graphics.player.bow.push(loadImage(graphicsFolder + `player/playerbow${i}.png`));
    }

    graphics.rock.base = loadImage(graphicsFolder + 'rock/rock.png');
    graphics.rock.close = loadImage(graphicsFolder + 'rock/rockclose.png');
    graphics.rock.hover = loadImage(graphicsFolder + 'rock/rockhover.png');

    graphics.enemies.archer = [];
    for (let i = 0; i < 4; i++) {
        graphics.enemies.archer.push(loadImage(graphicsFolder + `enemies/archer${i}.png`));
    }

    graphics.corpses.player = loadImage(graphicsFolder + 'corpses/playercorpse.png');

    graphics.corpses.archer = {};
    graphics.corpses.archer.base = loadImage(graphicsFolder + 'corpses/archer.png');
    graphics.corpses.archer.close = loadImage(graphicsFolder + 'corpses/archerclose.png');
    graphics.corpses.archer.hover = loadImage(graphicsFolder + 'corpses/archerhover.png');

    graphics.projectiles.arrow = loadImage(graphicsFolder + 'projectiles/arrow.png');

    for (let colour of COLOURS) {
        graphics.buttons[colour] = [];
        graphics.buttons[colour].push(loadImage(graphicsFolder + `buttons/button${colour}.png`));
        graphics.buttons[colour].push(loadImage(graphicsFolder + `buttons/button${colour}press.png`));

        graphics.targets[colour] = [];
        graphics.targets[colour].push(loadImage(graphicsFolder + `targets/target${colour}.png`));
        graphics.targets[colour].push(loadImage(graphicsFolder + `targets/target${colour}press.png`));

        graphics.doors[colour] = loadImage(graphicsFolder + `doors/door${colour}.png`);
    }

    graphics.goal.gold = loadImage(graphicsFolder + 'goal/goalgold.png');
    graphics.goal.grey = loadImage(graphicsFolder + 'goal/goalgrey.png');

    graphics.star.gold = loadImage(graphicsFolder + 'star/stargold.png');
    graphics.star.grey = loadImage(graphicsFolder + 'star/stargrey.png');

    // font = loadFont('/assets/font/PressStart2P-Regular.ttf');
    font = loadFont('assets/font/VT323-Regular.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    setTimeout(() => {
        resizeCanvas(windowWidth, windowHeight);

        resizeUI();
    }, 2000);

    createUI({
        width: 1600,
        height: 900,
        buffer: 1
    });
    
    //add screens
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

    setupLevelSelect();
    addLevelEndScreen();
    addPauseScreen();
    addLockedScreen();
    addThanksScreen();

    addStyles();

    setupUI();

    let sounds = {
        hover: { play: () => {} },
        click: { play: () => {} },
    }

    setFont(font);
    setSounds(sounds);
    // setCursors({
    //     game: 'assets/game.cur',
    //     ghost: 'assets/ghost.cur'
    // });

    setScreen('levels');

    let version = localStorage.getItem('bowman version');

    if (version == '1') {
        stats = JSON.parse(localStorage.getItem('bowman stats'));
    } else {
        localStorage.setItem('bowman version', '1');
        localStorage.setItem('bowman stats', JSON.stringify(stats));
    }

    // openPopup('level end', {
    //     level: 1,
    //     stars: 2,
    //     secret: false,
    //     arrows: 1
    // });

    // setTimeout(() => {
    //     game = new Level(TUTORIALFENCE);
    // }, 100);

}

function draw() {
    // if (game) {
        dt = deltaTime * 0.06;
        if (dt > 5) dt = 5;
        // game.update();
    // }

    updateUI();
    drawUI();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    resizeUI();
}

function wrapTextNoNewLines(txt, tSize, lineWidth) {
    // Work out how much of the word can fit in one line
    function resizeWord(word, lineWidth) {
        if (textWidth(word) <= lineWidth) return [word, ''];
    
        // Keep adding characters until the word no longer fits
        let i = 0, partialWord = '';
        while (i < word.length && textWidth(partialWord + word[i]) <= lineWidth) {
            partialWord += word[i];
            i++;
        }
    
        return [partialWord, word.substring(i)];
    }
    
    push();
    textSize(tSize);
    let words = txt.split(' ');
    let line = '', lines = [], testLine = '', testWidth;
    while (words.length > 0) {
        let word = words.splice(0, 1)[0];
        testLine = line + word;
        // If this isn't the last word, add a space
        if (words.length > 0) testLine += ' ';
        testWidth = textWidth(testLine);

        // If this word can't fit on this line
        if (testWidth > lineWidth) {
            // If this is the first word on the line (i.e. the word is longer than the whole line)
            if (line == '') {
                // Work out how much of the word fits and add it
                let [wordToAdd, remainingWord] = resizeWord(word, lineWidth);
                lines.push(wordToAdd);
                // Add the left over word back to the words array
                if (remainingWord.length > 0) {
                    words.unshift(remainingWord);
                }
            } else {
                // Start a new line
                lines.push(line);
                line = '';
                words.unshift(word);
            }
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    pop();
    return lines;
}