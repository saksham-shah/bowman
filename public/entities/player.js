class Player extends Entity {
    constructor(cell) {
        super(cell, 10, 3, PLAYER);

        this.fireAs = P_PLAYER;

        this.mouseAngle = 0;

        this.maxAcc = 0.7;
        this.targetVel = 3;
        
        this.bow = false;

        this.pullback = 0;
        this.pullingBack = false;

        this.fireRate = 30;

        this.cooldown = 0;
    }

    update() {
        this.move();
        this.aimToMouse();

    if (this.cooldown > 0) this.cooldown -= dt;

    if (this.pullingBack) {
        if (mouseIsPressed) {
            // if (this.cooldown == 0) {
                this.pullback += dt;
            // }

        } else {
            this.pullingBack = false;
            if (this.pullback > 0) {
                // this.cooldown = this.fireRate;
                if (this.pullback > PULLBACK) this.pullback = PULLBACK;
                let percent = this.pullback / PULLBACK;
                let speed = MINSPEED + (MAXSPEED - MINSPEED) * percent * percent;
                // this.pullback = 0;
                // console.log(speed);
                game.arrowsFired++;
                sounds.arrowpull.stop();
                // return new Arrow(p5.Vector.fromAngle(this.mouseAngle, 30).add(this.pos), speed, this.mouseAngle, P_PLAYER);
                return new Arrow(this.pos.copy(), speed, this.mouseAngle, P_PLAYER);
            }
        }
    } else if (this.pullback > 0) {
        this.pullback -= 15 * dt;

        if (this.pullback < 0) this.pullback = 0;
    }

        return null;
    }

    move() {
        let des = createVector(0, 0);

        if (keyIsDown(87)) { // w
            des.y -= this.targetVel;
        }

        if (keyIsDown(83)) { // s
            des.y += this.targetVel;
        }

        if (keyIsDown(65)) { // a
            des.x -= this.targetVel;
        }

        if (keyIsDown(68)) { // d
            des.x += this.targetVel;
        }

        // des.normalize();
        des.setMag(this.targetVel);

        this.acc.add(des);
        this.acc.sub(this.vel);
    }

    aimToMouse() {
        let mousePos = getScreen('game').mousePos;
        let dx = (mousePos.x - cornerX) / zoom - this.pos.x;
        let dy = (mousePos.y - cornerY) / zoom - this.pos.y;

        this.mouseAngle = Math.atan2(dy, dx);
    }

    updateAngle() { this.angle = this.mouseAngle }

    damage() {
        this.hit = true;
        this.health = 0;
    }

    toObject(obj) {
        // obj.angle = this.mouseAngle;
        obj.bow = this.bow;
        obj.pullback = this.pullback;
        obj.cooldown = this.cooldown;
    }
}