class Enemy extends Entity {
    constructor(cell, target, type, r = 15, mass = 1.5, health = 40) {
        super(cell, r, mass, type);

        this.fireAs = P_ENEMY;

        this.maxAcc = 0.7;
        this.targetVel = 3;

        this.target = target;

        this.health = health;
        this.maxHealth = health;
        this.shownHealth = health;

        this.moving = true;
    }

    update() {
        if (this.shownHealth != this.health) {
            this.shownHealth += (this.health - this.shownHealth) * 0.1;

            if (Math.abs(this.shownHealth - this.health) <= 1) {
                this.shownHealth = this.health;
            }
        }

        this.move();

        return this.subUpdate();
    }

    subUpdate() {}

    move() {
        if (this.moving) {
            let des = p5.Vector.sub(this.target.pos, this.pos);
            des.setMag(this.targetVel);
            this.acc.add(des);
        }

        this.acc.sub(this.vel);
    }

    damage(dmg) {
        this.health -= dmg;
        if (this.health <= 0) {
            this.health = 0;
            this.hit = true;
            console.log('dead');
        }

        console.log(this.health);
    }

    // updateAngle() {
    //     this.angle = 
    // }

    toObject(obj) {
        obj.healthPercent = this.shownHealth / this.maxHealth;

        this.subToObject(obj);
    }

    subToObject() {

    }
}