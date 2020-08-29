function drawLevel(level) {
    let { grid } = level;

    noFill();
    stroke(255, 0, 0);
    rect(800, 450, 48 * grid.length, 48 * grid[0].length);
}