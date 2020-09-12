// let sounds = {};

const fontToLoad = 'assets/font/VT323-Regular.ttf';
// let font = null;

let assetsLoading = 0;

function addLoadScreen() {
    let loading = false;

    // Loads all sounds and the font
    function loadAssets() {
        loading = true;
        for (let soundToLoad of soundsToLoad) {
            loadSound('assets/sound/' + soundToLoad.file, soundLoaded);

            assetsLoading++;

            function soundLoaded(sound) {
                // Set the volume of the sound
                sounds[soundToLoad.name] = sound;
                assetsLoading--;
            }
        }

        for (let i = 0; i < 3; i++) {
            loadSound(`assets/sound/win${i}.wav`, winstarLoaded);

            assetsLoading++;

            function winstarLoaded(sound) {
                sounds.winstars[i] = sound;
                assetsLoading--;
            }
        }

        loadFont(fontToLoad, fontLoaded);

        assetsLoading++;

        function fontLoaded(loadedFont) {
            setFont(loadedFont);
            font = loadedFont;
            assetsLoading--;
        }
    }

    addScreen('loading', {
        update: () => {
            if (!loading) {
                if (!font) {
                    loadAssets();
                } else {
                    // Go to the main menu
                    setScreen('menu');
                    // Start the music
                    sounds.music.loop();

                    let v = settings.sound / 50;
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

                    sounds.music.setVolume(settings.music / 50 * volumes.music);

                    setFont(font);
                    setSounds({
                        hover: sounds.buttonhover,
                        click: sounds.buttonclick
                    });
                }
                
            } else {
                // Once all the assets have loaded
                if (assetsLoading == 0) {
                    loading = false;
                }
            }
        },
        getCursorState: state => {
            if (loading) return 'wait';
        },
        draw: () => {
            if (loading) {
                noStroke();
                fill(255);
        
                // Three squares growing and shrinking
                let numCircles = 2, r = 30, gap = 100;
                for (let i = -numCircles; i <= numCircles; i++) {
                    let size = 0.5 * (Math.sin(frameCount / 20 + i * Math.PI / (numCircles * 2 + 1)) + 1)
                    rect(800 - i * gap, 450, 2 * r * size, 2 * r * size);
                }
            }
        }
    })
}