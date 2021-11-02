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
  #friction = 0.9;
  constructor(x, y, size) {
    this.#x = x;
    this.#y = y;
    this.#size = size;
    this.speed = 0;
    this.acc = 0.1;
    this.topSpeed = 4;
    this.rotSpeed = Math.PI / 20;
    this.lines = [];
    this.boosting = false;

    const ts = arrayMultiply(trianglePnt(Math.PI / 6), this.#size);
    this.#points.push([this.#x + (this.#size * 2) / 5, this.#y]);
    this.#points.push(arraySum(this.#points[0], [-ts[0], -ts[1]]));
    this.#points.push(arraySum(this.#points[0], [-ts[0], ts[1]]));
    this.#points.push([this.#x - this.#size / 5, this.#y - (ts[1] * 3) / 5]);
    this.#points.push([this.#x - this.#size / 5, this.#y + (ts[1] * 3) / 5]);
    this.#points.push([this.#points[1][0], this.#points[0][1]]);

    this.#updateLines();
  }

  update() {
    if (this.boosting) this.forward();
    let vel = [0, 0];
    this.#velocity.forEach((e, k) => {
      // add velocities to the general velocity
      vel = arraySum(vel, e);
      // multiply friction to velocities
      if (!this.boosting) e = arrayMultiply(e, this.#friction);
      // reset velocities
      this.#velocity.set(k, e);
      // deletes a 0 velocity
      if (e[0] === 0 && e[1] === 0) this.#velocity.delete(k);
    });
    this.#x += vel[0];
    this.#y += vel[1];
    this.#movePnts(vel);
  }

  forward() {
    if (this.speed < this.topSpeed) this.speed += this.acc;
    let d = arrayMultiply(trianglePnt(this.#heading), this.speed);
    if (this.#velocity.has(this.#heading)) {
      let vt = this.#velocity.get(this.#heading);
      if (Math.abs(vt[0]) <= this.topSpeed && Math.abs(vt[1]) <= this.topSpeed)
        this.#velocity.set(this.#heading, arraySum(vt, d));
    } else {
      this.#velocity.set(this.#heading, d);
    }
  }

  rotcw() {
    this.#heading += this.rotSpeed;
    this.#points = this.#points.map((p) =>
      rotatePnt(this.#x, this.#y, p[0], p[1], this.rotSpeed)
    );
    this.#updateLines();
  }

  rotccw() {
    this.#heading -= this.rotSpeed;
    this.#points = this.#points.map((p) =>
      rotatePnt(this.#x, this.#y, p[0], p[1], -this.rotSpeed)
    );
    this.#updateLines();
  }

  release() {
    this.speed = 0;
    this.boosting = false;
  }

  render = () => {
    const p = this.#points;
    stroke(255);
    this.lines.forEach((l) => line(...l));
  };

  #updateLines() {
    this.lines = [];
    const p = this.#points;
    this.lines.push([...p[0], ...p[1]]);
    this.lines.push([...p[0], ...p[2]]);
    this.lines.push([...p[3], ...p[4]]);
  }

  #movePnts(data) {
    this.#points = this.#points.map((p) => arraySum(p, data));
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
