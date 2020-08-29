class Rock extends Entity {
    constructor(cell) {
        super(cell, 15, 2, ROCK, true);

        this.maxAcc = 0;
        this.maxVel = 0;
    }
}