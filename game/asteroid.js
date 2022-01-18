class Asteroid {
  #points = [];
  #size = 0;
  #GAME;

  constructor(x, y, lvl, GAME) {
    this.x = x;
    this.y = y;
    this.lvl = lvl;
    this.lines = [];
    this.hp = 0;
    this.color = [255, 255, 255];
    this.#GAME = GAME;
    this.heading = (Math.floor(Math.random() * 360) * Math.PI) / 180;
    this.speed = Math.floor(Math.random() * 6);
    // this.speed = 0;
    this.vx = Math.cos(this.heading) * this.speed;
    this.vy = Math.sin(this.heading) * this.speed;

    this.#size = this.#determineSize(lvl);
    this.#initializePnts();
    this.#updateLines();
  }

  update() {
    this.color = [255, 255, 255];
    if (this.x < this.#size || this.x > this.#GAME.WIDTH - this.#size)
      this.vx *= -1;
    if (this.y < this.#size || this.y > this.#GAME.HEIGHT - this.#size)
      this.vy *= -1;
    this.x += this.vx;
    this.y += this.vy;
    this.#movePnts();
    this.#updateLines();
    this.#updateColor();
  }

  die() {
    if (this.lvl > 1) {
      this.#GAME.birthAsteroid(this.x, this.y, this.lvl - 1);
      this.#GAME.birthAsteroid(this.x, this.y, this.lvl - 1);
    }
    if (this.lvl > 2) {
      this.#GAME.birthAsteroid(this.x, this.y, this.lvl - 1);
      this.#GAME.birthAsteroid(this.x, this.y, this.lvl - 1);
    }
    this.#GAME.deleteAsteroid(this);
  }

  #determineSize(lvl) {
    if (lvl === 1) {
      this.hp = 5;
      return 20;
    } else if (lvl === 2) {
      this.hp = 10;
      return 40;
    }
    this.hp = 20;
    return 80;
  }

  #initializePnts() {
    let angle = Math.PI / 3;
    const getRand = () =>
      Math.floor((Math.random() * this.#size * 3) / 5 + (this.#size * 2) / 5);
    for (let i = 0; i < 6; i++) {
      const tr = getRand();
      this.#points.push([
        Math.cos(angle * i) * tr + this.x,
        Math.sin(angle * i) * tr + this.y,
      ]);
    }
  }

  #movePnts() {
    this.#points = this.#points.map((p) => {
      p[0] += this.vx;
      p[1] += this.vy;
      return p;
    });
  }

  #updateLines() {
    this.lines = [];
    this.#points.forEach((p, i) => {
      if (i !== 5) this.lines.push([p, this.#points[i + 1]]);
      else this.lines.push([p, this.#points[0]]);
    });
  }

  #updateColor() {
    if (this.lvl === 1) {
      if (this.hp > 4) this.color = [255, 255, 255];
      else if (this.hp > 1) this.color = [255, 255, 0];
      else this.color = [255, 0, 0];
    } else if (this.lvl === 2) {
      if (this.hp > 7) this.color = [255, 255, 255];
      else if (this.hp > 3) this.color = [255, 255, 0];
      else this.color = [255, 0, 0];
    } else {
      if (this.hp > 14) this.color = [255, 255, 255];
      else if (this.hp > 6) this.color = [255, 255, 0];
      else this.color = [255, 0, 0];
    }
  }
}

module.exports = Asteroid;
