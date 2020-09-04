class Particle {
    constructor(pos, vel, r, life, col) {
        this.pos = pos;
        this.vel = vel;
        this.r = r;
        this.life = life;
        this.maxLife = life;
        this.col = col;
    }

    update() {
        this.pos.add(p5.Vector.mult(this.vel, dt));

        this.life -= dt;

        return this.life <= 0;
    }

    toObject() {
        let r = this.r * this.life / this.maxLife;
        return {
            pos: this.pos,
            colour: this.col,
            r
        }
    }
}

Level.prototype.particle = function(options) {
    for (let i = 0; i < options.num; i++) {
        let { speed, angle, life } = options;
        if (options.speedErr) {
            speed += (Math.random() - 0.5) * 2 * options.speedErr;
        }
        if (options.angleErr) {
            angle += (Math.random() - 0.5) * 2 * options.angleErr;
        }
        if (options.lifeErr) {
            life += (Math.random() - 0.5) * 2 * options.lifeErr;
        }

        let vel = p5.Vector.fromAngle(angle, speed);

        let p = new Particle(options.pos.copy(), vel, options.r, life, options.col);
        this.particles.push(p);
    }
}