let game;


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
    addScreen('menu');

    addStyles();

    setupUI();

    // setFont(font);
    // setSounds(sounds);
    // setCursors({
    //     game: 'assets/game.cur',
    //     ghost: 'assets/ghost.cur'
    // });

    setScreen('menu');

}

function draw() {
    // if (game && !game.paused) game.update();

    updateUI();
    drawUI();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    resizeUI();
}