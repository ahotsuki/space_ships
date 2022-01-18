class Score {
  value = 0;
  rank = 0;
  username = "";

  constructor(id) {
    this.id = id;
  }

  plus(p) {
    this.value += p;
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
    this.lines = [];
    this.boosting = false;
    this.#GAME = GAME;
    this.id = id;
    this.steering = 0;
    this.color = [0, 255, 0];
    this.score = new Score(id);

    this.Lvl = 1;

    // health
    this.hp = 1;
    this.maxhp = 1;
    this.healthLvl = 1; // max 6

    // weapon
    this.weaponLvl = 1; // min 1 max 6
    this.fireRate = 1; // min 1 max 6
    this.bulletRange = 100; // min 100 max 600
    this.bulletSpeed = 2; // min 2 max 12
    this.load = 0;
    this.firing = false;

    // movement
    this.movementLvl = 1;
    this.topSpeed = 2; // min 2 max 12
    this.rotSpeed = Math.PI / 120; // min 120 max 20

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
    this.updateColor();
  }

  updateColor() {
    if (this.hp <= this.maxhp * 0.3) this.color = [255, 0, 0];
    else if (this.hp <= this.maxhp * 0.8) this.color = [255, 255, 0];
    else this.color = [0, 255, 0];
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

  upgradeHealth() {
    if (this.healthLvl > 5) return false;
    if (this.score.value < 2 ** this.healthLvl && !this.#GAME.GOD) return false;
    this.score.value -= 2 ** this.healthLvl;
    this.healthLvl++;
    this.maxhp = 2 ** (this.healthLvl - 1);
    this.Lvl++;
    if (this.Lvl > 15) this.Lvl = "max";
    return true;
  }

  upgradeWeapon() {
    if (this.weaponLvl > 5) return false;
    if (this.score.value < 2 ** this.weaponLvl && !this.#GAME.GOD) return false;
    this.score.value -= 2 ** this.weaponLvl;
    this.weaponLvl++;
    this.fireRate = this.weaponLvl;
    this.bulletSpeed = this.weaponLvl * 2;
    this.bulletRange = this.weaponLvl * 100;
    this.Lvl++;
    if (this.Lvl > 15) this.Lvl = "max";
    return true;
  }

  upgradeMovement() {
    if (this.movementLvl > 5) return false;
    if (this.score.value < 2 ** this.movementLvl && !this.#GAME.GOD)
      return false;
    this.score.value -= 2 ** this.movementLvl;
    this.movementLvl++;
    this.topSpeed = this.movementLvl * 2;
    this.rotSpeed = Math.PI / (120 - (this.movementLvl - 1) * 20);
    this.Lvl++;
    if (this.Lvl > 15) this.Lvl = "max";
    return true;
  }

  updateScore(lvl, asteroid = true, collide = false) {
    let score;
    let diff = this.maxhp - this.hp;
    if (asteroid) {
      score = 0;
      if (lvl === 1) score += 5;
      else if (lvl === 2) score += 10;
      else if (lvl === 3) score += 20;
    } else score = lvl;

    if (diff > 0) {
      if (diff >= score) {
        this.hp += score;
        if (collide && this.hp < this.maxhp) this.hp++;
      } else {
        score = score - diff;
        this.hp += diff;
        this.score.plus(score);
      }
    } else this.score.plus(score);
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
