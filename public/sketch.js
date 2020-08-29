let game;
let dt;

function preload() {
    
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
            drawLevel(game.toObject());
        }
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

    game = new Level(TUTORIAL);

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