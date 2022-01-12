export default class Ship {
  constructor(input) {
    const keys = Object.keys(input);
    keys.forEach((k) => (this[k] = input[k]));
  }

  render(p) {
    p.push();
    p.stroke(255, 255, 255);
    p.strokeWeight(2);
    this.lines.forEach((l) => p.line(...l));
    p.pop();
  }
}
