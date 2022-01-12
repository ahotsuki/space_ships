class Score {
  value = 0;
  rank = 0;
  username = "";

  constructor(id) {
    this.id = id;
  }

  plus(v = 1) {
    this.value += v;
  }
}

class Ship {
  #size = 0;
  heading = 0;
  points = [];
  velocity = [0, 0];
  friction = 0.9;
  #GAME = 0;

  constructor(x, y, size, GAME, id) {
    this.x = x;
    this.y = y;
    this.#size = size;
    this.speed = 0;
    this.acc = 0.1;
    this.topSpeed = 4;
    this.rotSpeed = Math.PI / 20;
    this.lines = [];
    this.boosting = false;
    this.#GAME = GAME;
    this.id = id;
    this.steering = 0;
    this.fireRate = 1;
    this.bulletRange = 100;
    this.bulletSpeed = 6;
    this.load = 0;
    this.firing = false;
    this.color = [255, 255, 255];
    this.score = new Score(id);

    const ts = arrayMultiply(trianglePnt(Math.PI / 6), this.#size);
    this.points.push([this.x + (this.#size * 2) / 5, this.y]);
    this.points.push(arraySum(this.points[0], [-ts[0], -ts[1]]));
    this.points.push(arraySum(this.points[0], [-ts[0], ts[1]]));
    this.points.push([this.x - this.#size / 5, this.y - (ts[1] * 3) / 5]);
    this.points.push([this.x - this.#size / 5, this.y + (ts[1] * 3) / 5]);
    this.points.push([this.points[1][0], this.points[0][1]]);

    this.#updateLines();
  }

  setUsername(uname) {
    this.score.username = uname;
  }

  update() {
    this.load++;
    this.#rotate();
    if (this.boosting)
      this.velocity = arrayMultiply(trianglePnt(this.heading), this.topSpeed);
    this.#forward();
    if (this.firing) this.#fire();
    this.velocity = arrayMultiply(this.velocity, this.friction);
  }

  #fire() {
    if (this.load >= this.#GAME.FPS / this.fireRate) {
      this.#GAME.addBullet(
        this.id,
        ...this.points[0],
        this.bulletSpeed,
        this.bulletRange,
        this.heading
      );
      this.load = 0;
    }
  }

  #forward() {
    const widthcheck =
      this.x + this.velocity[0] > 0 + this.#size &&
      this.x + this.velocity[0] < this.#GAME.WIDTH - this.#size;
    const heightcheck =
      this.y + this.velocity[1] > 0 + this.#size &&
      this.y + this.velocity[1] < this.#GAME.HEIGHT - this.#size;
    if (widthcheck) this.x += this.velocity[0];
    if (heightcheck) this.y += this.velocity[1];
    this.#movePnts(this.velocity, widthcheck, heightcheck);
  }

  #rotate() {
    this.heading += this.steering * this.rotSpeed;
    this.points = this.points.map((p) =>
      rotatePnt(this.x, this.y, p[0], p[1], this.steering * this.rotSpeed)
    );
    this.#updateLines();
  }

  release() {
    this.speed = 0;
    this.boosting = false;
  }

  #updateLines() {
    this.lines = [];
    const p = this.points;
    this.lines.push([...p[0], ...p[1]]);
    this.lines.push([...p[0], ...p[2]]);
    this.lines.push([...p[3], ...p[4]]);
  }

  #movePnts(data, w, h) {
    this.points = this.points.map((p) => {
      if (w) p[0] += data[0];
      if (h) p[1] += data[1];
      return p;
    });
    this.#updateLines();
  }
}

function rotatePnt(a, b, c, d, t) {
  const [cs, sn] = trianglePnt(t);
  return [cs * (c - a) - sn * (d - b) + a, sn * (c - a) + cs * (d - b) + b];
}

function trianglePnt(a) {
  return [Math.cos(a), Math.sin(a)];
}

function arraySum(a, b) {
  return a.map((e, i) => b[i] + e);
}

function arrayMultiply(a, s) {
  return a.map((e) => e * s);
}

module.exports = Ship;
