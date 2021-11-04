class Asteroid {
  #points = [];
  #size = 0;

  constructor(x, y, lvl) {
    this.x = x;
    this.y = y;
    this.lvl = lvl;
    this.lines = [];

    this.#size = this.#determineSize(lvl);
    this.#initializePnts();
    this.#updateLines();
  }

  #determineSize(lvl) {
    if (lvl === 1) return 20;
    if (lvl === 2) return 40;
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

  #updateLines() {
    this.lines = [];
    this.#points.forEach((p, i) => {
      if (i !== 5) this.lines.push([p, this.#points[i + 1]]);
      else this.lines.push([p, this.#points[0]]);
    });
  }
}

module.exports = Asteroid;
