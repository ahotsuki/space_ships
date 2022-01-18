export default class Asteroid {
  constructor(input) {
    const keys = Object.keys(input);
    keys.forEach((k) => (this[k] = input[k]));
  }

  render(p) {
    p.push();
    p.stroke(...this.color);
    p.strokeWeight(1);
    this.lines.forEach((l) => p.line(...l[0], ...l[1]));
    p.pop();
  }
}
