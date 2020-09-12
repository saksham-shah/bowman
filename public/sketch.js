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

const soundsToLoad = [
    {
        name: 'buttonclick',
        file: 'buttonclick.wav'
    }, {
        name: 'buttonhover',
        file: 'buttonhover.wav'
    }, {
        name: 'music',
        file: 'music.mp3'
    }, {
        name: 'arrowpull',
        file: 'arrowpull.wav'
    }, {
        name: 'arrowpull2',
        file: 'arrowpull.wav'
    }, {
        name: 'arrowwall',
        file: 'arrowwall.wav'
    }, {
        name: 'arrowfloor',
        file: 'arrowfloor.wav'
    }, {
        name: 'arrowentity',
        file: 'arrowentity.wav'
    }, {
        name: 'arrowfire',
        file: 'arrowfire.wav'
    }, {
        name: 'entitydie',
        file: 'entitydie.wav'
    }, {
        name: 'playerdie',
        file: 'playerdie.wav'
    }, {
        name: 'bowpickup',
        file: 'bowpickup.wav'
    }, {
        name: 'enemyspawn',
        file: 'enemyspawn.wav'
    }, {
        name: 'winlevel',
        file: 'winlevel.wav'
    }, {
        name: 'winsecret',
        file: 'winsecret.wav'
    }, {
        name: 'dooropen',
        file: 'dooropen.wav'
    }, {
        name: 'doorclose',
        file: 'doorclose.wav'
    }, {
        name: 'fireballfire',
        file: 'fireballfire.wav'
    }, {
        name: 'fireballhit',
        file: 'fireballhit.wav'
    }, {
        name: 'breakable',
        file: 'breakable.wav'
    }
];

const volumes = {
    music: 0.3,
    arrowpull: 0.5,
    arrowpull2: 0.5,
    arrowwall: 0.5,
    arrowentity: 5,
    arrowfire: 0.25,
    entitydie: 1.5,
    dooropen: 2,
    doorclose: 2,
    fireballhit: 1.5,
    breakable: 0.5
}

let font, sounds = {};

function preload() {
    graphics.map.floor = loadImage(graphicsFolder + 'map/floor.png');
    graphics.map.wall = loadImage(graphicsFolder + 'map/wall.png');
    graphics.map.fence = loadImage(graphicsFolder + 'map/fence.png');
    graphics.map.bow = loadImage(graphicsFolder + 'map/bow.png');
    graphics.map.cave = loadImage(graphicsFolder + 'map/hole.png');
    graphics.map.breakable = loadImage(graphicsFolder + 'map/breakable.png');

    graphics.player.base = loadImage(graphicsFolder + 'player/playerbase.png');
    graphics.player.bow = [];
    for (let i = 0; i < 4; i++) {
        graphics.player.bow.push(loadImage(graphicsFolder + `player/playerbow${i}.png`));
    }
    // graphics.player.foot = loadImage(graphicsFolder + 'player/rightfoot.png');

    graphics.rock.base = loadImage(graphicsFolder + 'rock/rock.png');
    graphics.rock.close = loadImage(graphicsFolder + 'rock/rockclose.png');
    graphics.rock.hover = loadImage(graphicsFolder + 'rock/rockhover.png');
    graphics.rock.spike = loadImage(graphicsFolder + 'rock/spike.png');

    graphics.enemies.archer = [];
    for (let i = 0; i < 4; i++) {
        graphics.enemies.archer.push(loadImage(graphicsFolder + `enemies/archer${i}.png`));
    }

    graphics.enemies.mage = [];
    for (let i = 0; i < 4; i++) {
        graphics.enemies.mage.push(loadImage(graphicsFolder + `enemies/mage${i}.png`));
    }

    graphics.corpses.player = loadImage(graphicsFolder + 'corpses/playercorpse.png');

    graphics.corpses.archer = {};
    graphics.corpses.archer.base = loadImage(graphicsFolder + 'corpses/archer.png');
    graphics.corpses.archer.close = loadImage(graphicsFolder + 'corpses/archerclose.png');
    graphics.corpses.archer.hover = loadImage(graphicsFolder + 'corpses/archerhover.png');

    graphics.corpses.mage = {};
    graphics.corpses.mage.base = loadImage(graphicsFolder + 'corpses/mage.png');
    graphics.corpses.mage.close = loadImage(graphicsFolder + 'corpses/mageclose.png');
    graphics.corpses.mage.hover = loadImage(graphicsFolder + 'corpses/magehover.png');

    graphics.projectiles.arrow = loadImage(graphicsFolder + 'projectiles/arrow.png');
    graphics.projectiles.fireball = loadImage(graphicsFolder + 'projectiles/fireball.png');

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

    // for (let sound of soundsToLoad) {
    //     let p5sound = loadSound('assets/sound/' + sound.file);
    //     // let vol = volumes[sound.name];
    //     // if (vol == undefined) vol = 1;
    //     // p5sound.setVolume(vol);

    //     sounds[sound.name] = p5sound;
    // }

    sounds.winstars = [null, null, null];
    // for (let i = 0; i < 3; i++) {
    //     sounds.winstars.push(loadSound(`assets/sound/win${i}.wav`));
    // }

    // font = loadFont('/assets/font/PressStart2P-Regular.ttf');
    // font = loadFont('assets/font/VT323-Regular.ttf');
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
    addLoadScreen();
    setupLevelSelect();
    addLevelEndScreen();
    addPauseScreen();
    addLockedScreen();
    addThanksScreen();

    let storedSettings = localStorage.getItem('bowman settings');
    if (storedSettings) {
        settings = JSON.parse(storedSettings);
    } else {
        localStorage.setItem('bowman settings', JSON.stringify(settings));
    }

    // let v = settings.sound / 50;
    // for (let soundName in sounds) {
    //     if (soundName != 'music') {
    //         let vol = volumes[soundName];
    //         if (vol == undefined) vol = 1;
    //         if (soundName != 'winstars') {
    //             sounds[soundName].setVolume(v * vol);
    //         } else {
    //             for (let s of sounds[soundName]) {
    //                 s.setVolume(v * vol);
    //             }
    //         }
    //     }
    // }

    // sounds.music.setVolume(settings.music / 50 * volumes.music);

    addMainScreens();

    // let w = 675, h = 500;
    // addPopup('beta', {
    //     width: w,
    //     height: h,
    //     draw: () => {
    //         fill('#fdb159');
    //         stroke('#fca440');
    //         strokeWeight(10);

    //         rect(w / 2, h / 2, w, h, 20);

    //         // Text
    //         textAlign(CENTER);
    //         textSize(80);
    //         fill(255);
    //         noStroke();
    //         text(`Warning`, w / 2, 125);

    //         textSize(40);
    //         text(`This is a beta version of the game.\nWhen the full version is released (13\nSeptember), you will most likely lose\nyour progress.`, w / 2, 200);
    //     }
    // })
    // .addButton({
    //     position: { x: w / 2, y: 425 },
    //     width: 250,
    //     height: 50,
    //     textSize: 45,
    //     text: 'CLOSE',
    //     onClick: () => {
    //         closePopup();
    //     }
    // });

    addStyles();

    setupUI();

    // setFont(font);
    // setSounds({
    //     hover: sounds.buttonhover,
    //     click: sounds.buttonclick
    // });
    // setCursors({
    //     game: 'assets/game.cur',
    //     ghost: 'assets/ghost.cur'
    // });

    // setScreen('menu');

    // sounds.music.loop();

    setScreen('loading');

    let version = localStorage.getItem('bowman version');

    if (version == '1') {
        stats = JSON.parse(localStorage.getItem('bowman stats'));

        for (let i = stats.levelData.length; i < levels.length; i++) {
            stats.levelData.push({
                stars: 0,
                secret: false
            });
        }
        localStorage.setItem('bowman stats', JSON.stringify(stats));

        // openPopup('beta');
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