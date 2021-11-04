class Bullet {
  #GAME;
  constructor(id, x, y, speed, heading, GAME) {
    this.id = id;
    this.xi = x;
    this.yi = y;
    this.speed = speed;
    this.heading = heading;
    this.xf = x;
    this.yf = y;
    this.vx = Math.cos(this.heading) * this.speed;
    this.vy = Math.sin(this.heading) * this.speed;
    this.maxRange = 50;
    this.range = 0;
    this.#GAME = GAME;
  }

  update() {
    this.xf += this.vx;
    this.yf += this.vy;
    this.range++;
    if (this.range >= this.maxRange) this.die();
  }

  die() {
    this.#GAME.deleteBullet(this);
  }
}

module.exports = Bullet;
