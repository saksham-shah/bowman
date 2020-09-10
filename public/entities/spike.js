class Spike extends Entity {
    constructor(cell) {
        super(cell, 15, 1, SPIKE);

        this.manualAngle = 0;
        this.angularVel = 0;

        this.previousCells = [];

        this.previousUpdate = 0;
    }

    update(grid) {
        this.vel = p5.Vector.mult(this.vel, Math.pow(0.95, dt));

        this.angularVel *= Math.pow(0.95, dt);
        this.manualAngle = (this.manualAngle + this.angularVel * dt) % (2 * Math.PI);

        if (this.previousUpdate > 0) this.previousUpdate -= dt;

        if ((this.vel.magSq() > 0.01 && this.previousUpdate <= 0) || this.previousCells.length == 0) {
            console.log('doing an update');

            this.previousUpdate = 20;

            for (let cell of this.previousCells) {
                grid[cell.x][cell.y].spikes--;
            }

            let thisCell = getCell(this.pos);
            let newCells = [thisCell];

            let relativePos = {
                x: this.pos.x % CELL,
                y: this.pos.y % CELL
            }

            let up = false, down = false, left = false, right = false;

            if (thisCell.x >= 0 && relativePos.x < this.r) left = true;
            if (thisCell.x < grid.length && relativePos.x > CELL - this.r) right = true;
            if (thisCell.y >= 0 && relativePos.y < this.r) up = true;
            if (thisCell.y < grid[0].length && relativePos.y > CELL - this.r) down = true;

            if (left) {
                newCells.push({ x: thisCell.x - 1, y: thisCell.y });
                if (up) {
                    newCells.push({ x: thisCell.x - 1, y: thisCell.y - 1 });
                } else if (down) {
                    newCells.push({ x: thisCell.x - 1, y: thisCell.y + 1 });
                }
            } else if (right) {
                newCells.push({ x: thisCell.x + 1, y: thisCell.y });
                if (up) {
                    newCells.push({ x: thisCell.x + 1, y: thisCell.y - 1 });
                } else if (down) {
                    newCells.push({ x: thisCell.x + 1, y: thisCell.y + 1 });
                }
            }

            if (up) {
                newCells.push({ x: thisCell.x, y: thisCell.y - 1 });
            } else if (down) {
                newCells.push({ x: thisCell.x, y: thisCell.y + 1 });
            }

            for (let cell of newCells) {
                grid[cell.x][cell.y].spikes++;
            }

            this.previousCells = newCells;
        }
    }

    updateAngle() {
        this.angle = this.manualAngle;
    }
}