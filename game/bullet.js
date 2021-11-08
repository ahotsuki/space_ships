class Bullet {
  #GAME;
  constructor(id, x, y, speed, mrange, heading, GAME) {
    this.id = id;
    this.xi = x;
    this.yi = y;
    this.speed = speed;
    this.heading = heading;
    this.xf = x;
    this.yf = y;
    this.vx = Math.cos(this.heading) * this.speed;
    this.vy = Math.sin(this.heading) * this.speed;
    this.maxRange = mrange;
    this.#GAME = GAME;
  }

  #distance(a, b, x, y) {
    return Math.sqrt(Math.pow(a - x, 2) + Math.pow(b - y, 2));
  }

  update() {
    this.xf += this.vx;
    this.yf += this.vy;
    if (this.#distance(this.xi, this.yi, this.xf, this.yf) >= this.maxRange)
      this.die();
  }

  die() {
    this.#GAME.deleteBullet(this);
  }
}

module.exports = Bullet;
