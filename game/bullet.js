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
    this.maxrx = Math.abs(Math.cos(this.heading) * this.maxRange);
    this.maxry = Math.abs(Math.sin(this.heading) * this.maxRange);
    this.#GAME = GAME;
  }

  update() {
    this.xf += this.vx;
    this.yf += this.vy;
    if (
      Math.abs(this.xf - this.xi) >= this.maxrx ||
      Math.abs(this.yf - this.yi) >= this.maxry
    )
      this.die();
  }

  die() {
    this.#GAME.deleteBullet(this);
  }
}

module.exports = Bullet;
