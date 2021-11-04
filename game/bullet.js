class Bullet {
  constructor(id, x, y, speed, heading) {
    this.id = id;
    this.xi = x;
    this.yi = y;
    this.speed = speed;
    this.heading = heading;
    this.xf = x;
    this.yf = y;
    this.vx = Math.cos(this.heading) * this.speed;
    this.vy = Maath.sin(this.heading) * this.speed;
    this.maxRange = 20;
    this.range = 0;
    this.die = false;
  }

  update() {
    this.xf += this.vx;
    this.yf += this.vy;
    this.range++;
    if (this.range >= this.maxRange) this.die = true;
  }
}
