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
            if (game) drawLevel(game.toObject());
        }
    })
    .on('mouseDown', e => {
        if (e.button != 0) return;
        if (game) game.click();
    });

    addStyles();

    setupUI();

    // setFont(font);
    // setSounds(sounds);
    // setCursors({
    //     game: 'assets/game.cur',
    //     ghost: 'assets/ghost.cur'
    // });

    setScreen('game');

    setTimeout(() => {
        game = new Level(TUTORIALFENCE);
    }, 100);

}

function draw() {
    if (game) {
        dt = deltaTime * 0.06;
        game.update();
    }

    updateUI();
    drawUI();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    resizeUI();
}