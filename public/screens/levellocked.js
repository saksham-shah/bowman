function addLockedScreen() {
    let level, needed;
    let w = 675, h = 500;

    addPopup('locked', {
        width: w,
        height: h,
        onDisplay: _level => {
            level = _level;

            needed = levels[level].meta.required - stats.totalStars;
        },
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
            text(`Not enough stars`, w / 2, 125);

            textSize(40);
            text(`You need ${needed} more stars to play Level ${level + 1}.\nGet more stars by using fewer arrows\nin previous levels, or by using the\nfree star buton.`, w / 2, 200);
        }
    })
    .on('keyDown', e => {
        if (e.key == 'p') {
            closePopup();
            game.paused = false;
        }
    })
    .addButton({
        position: { x: w / 2, y: 425 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'OK',
        onClick: () => {
            closePopup();
        }
    });
}