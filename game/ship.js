class Ship {
  #x = 0;
  #y = 0;
  #size = 0;
  #heading = 0;
  #points = [];
  #lboost = [];
  #rboost = [];
  #boost = [];
  #velocity = new Map();
  #friction = 0.995;
  constructor(x, y, size) {
    this.#x = x;
    this.#y = y;
    this.#size = size;
    this.speed = 0;
    this.acc = 0.01;
    this.topSpeed = 1.2;
    this.rotSpeed = Math.PI / 200;
    this.lines = [];

    const ts = arrayMultiply(trianglePnt(Math.PI / 6), this.#size);
    this.#points.push([this.#x + (this.#size * 2) / 5, this.#y]);
    this.#points.push(arraySum(this.#points[0], [-ts[0], -ts[1]]));
    this.#points.push(arraySum(this.#points[0], [-ts[0], ts[1]]));
    this.#points.push([this.#x - this.#size / 5, this.#y - (ts[1] * 3) / 5]);
    this.#points.push([this.#x - this.#size / 5, this.#y + (ts[1] * 3) / 5]);
    this.#points.push([this.#points[1][0], this.#points[0][1]]);
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
