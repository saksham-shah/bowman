function addThanksScreen() {
    let w = 675, h = 400;

    addPopup('thanks', {
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
            text(`Thanks for playing!`, w / 2, 125);

            textSize(40);
            text(`That was the last level.\nI hope you enjoyed it!`, w / 2, 200);
        }
    })
    .on('keyDown', e => {
        if (e.key == 'p') {
            closePopup();
            game.paused = false;
        }
    })
    .addButton({
        position: { x: w / 2, y: 325 },
        width: 250,
        height: 50,
        textSize: 45,
        text: 'CLOSE',
        onClick: () => {
            closePopup();
        }
    });
}