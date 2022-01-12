export default class Bullet {
  constructor(input) {
    const keys = Object.keys(input);
    keys.forEach((k) => (this[k] = input[k]));
  }

  render(p) {
    p.push();
    p.noStroke();
    p.fill(255, 0, 0);
    p.ellipse(this.xf, this.yf, 5, 5);
    p.pop();
  }
}
