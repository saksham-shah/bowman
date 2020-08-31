class Player extends Entity {
    constructor(cell) {
        super(cell, 10, 1, PLAYER);

        this.fireAs = P_PLAYER;

        this.mouseAngle = 0;

        this.maxAcc = 0.7;
        this.maxVel = 3;
        
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
                    this.pullback = 0;
                    console.log(speed);
                    return new Arrow(p5.Vector.fromAngle(this.mouseAngle, 30).add(this.pos), speed, this.mouseAngle, P_PLAYER);
                }
            }
        }

        return null;
    }

    move() {
        let des = createVector(0, 0);

        if (keyIsDown(87)) { // w
            des.y -= this.maxVel;
        }

        if (keyIsDown(83)) { // s
            des.y += this.maxVel;
        }

        if (keyIsDown(65)) { // a
            des.x -= this.maxVel;
        }

        if (keyIsDown(68)) { // d
            des.x += this.maxVel;
        }

        des.normalize();
        des.mult(this.maxVel);

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

    toObject(obj) {
        // obj.angle = this.mouseAngle;
        obj.bow = this.bow;
        obj.pullback = this.pullback;
        obj.cooldown = this.cooldown;
    }
}