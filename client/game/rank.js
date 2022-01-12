export default class Rank {
  static rankings = [];
  static render(p, w, h) {
    this.rankings = this.rankings.sort((a, b) => {
      if (a[1] === b[1]) return 0;
      else return a[1] < b[1] ? -1 : 1;
    });
    p.push();
    p.noStroke();
    p.fill(255);
    p.textSize(14);
    let x = 49;
    let y = h - 140;
    this.rankings.forEach((e) => {
      p.text(`${e[0]}: ${e[2]}`, x, y);
      y += 14;
    });
    x = 21;
    y = h - 140;
    let tc = [255, 255, 0];
    for (let i = 1; i <= 10; i++) {
      p.fill(...tc);
      p.text(`${i}. `, x, y);
      y += 14;
      tc[0] -= 18;
      tc[1] -= 18;
    }
    y = h - 160;
    p.fill(223, 0, 254);
    p.textSize(20);
    p.text(`Top Players:`, 7, y);
    p.pop();
  }
}
