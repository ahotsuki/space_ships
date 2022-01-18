export default class Ship {
  constructor(input) {
    const keys = Object.keys(input);
    keys.forEach((k) => (this[k] = input[k]));
  }

  render(p) {
    p.push();
    p.fill(255, 255, 255);
    p.text(
      `${this.score.username} : lvl ${this.Lvl}`,
      this.x - this.score.username.length * 4 - 10,
      this.y - 25
    );
    p.stroke(...this.color);
    p.strokeWeight(2);
    this.lines.forEach((l) => p.line(...l));
    p.pop();
  }
}
