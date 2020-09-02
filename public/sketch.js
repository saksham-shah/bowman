let game;
let dt;

let cornerX, cornerY, zoom;

let graphicsFolder = '/assets/graphics/';

let graphics = {
    map: {},
    player: {},
    buttons: {},
    targets: {},
    doors: {},
    rock: {},
    projectiles: {}
};

function preload() {
    graphics.map.floor = loadImage(graphicsFolder + 'map/floor.png');
    graphics.map.wall = loadImage(graphicsFolder + 'map/wall.png');
    graphics.map.fence = loadImage(graphicsFolder + 'map/fence.png');
    graphics.map.bow = loadImage(graphicsFolder + 'map/bow.png');

    graphics.player.base = loadImage(graphicsFolder + 'player/playerbase.png');
    graphics.player.bow = [];
    for (let i = 0; i < 4; i++) {
        graphics.player.bow.push(loadImage(graphicsFolder + `player/playerbow${i}.png`));
    }

    graphics.rock.base = loadImage(graphicsFolder + 'rock/rock.png');
    graphics.rock.close = loadImage(graphicsFolder + 'rock/rockclose.png');
    graphics.rock.hover = loadImage(graphicsFolder + 'rock/rockhover.png');

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
        if (e.key == 'p' && game) game.paused = !game.paused;
    });

    setupLevelSelect();
    addLevelEndScreen();

    addStyles();

    setupUI();

    let sounds = {
        hover: { play: () => {} },
        click: { play: () => {} },
    }

    // setFont(font);
    setSounds(sounds);
    // setCursors({
    //     game: 'assets/game.cur',
    //     ghost: 'assets/ghost.cur'
    // });

    setScreen('levels');

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