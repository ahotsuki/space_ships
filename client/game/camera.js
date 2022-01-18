import Rank from "./rank";

export default class Camera {
  static width = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  static height = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  static game_width = 0;
  static game_height = 0;
  static x_perspective = 0;
  static y_perspective = 0;
  static rank = Rank;
  static score;
  static ship;

  static update(my_ship, ranks) {
    this.rank.rankings = ranks;
    this.x_perspective = my_ship.x;
    this.y_perspective = my_ship.y;
    this.score = my_ship.score;
    this.ship = my_ship;
  }

  static render(p) {
    if (this.rank.rankings.length) this.rank.render(p, this.width, this.height);
    if (this.score) this.renderScore(p);

    p.translate(
      this.width / 2 - this.x_perspective,
      this.height / 2 - this.y_perspective
    );
  }

  static renderScore(p) {
    p.push();
    p.noStroke();
    p.fill(255, 255, 0);
    p.textSize(20);
    let x = 35;
    let y = 35;
    p.text(`Name: ${this.score.username} Lvl ${this.ship.Lvl}`, x, y);
    p.textSize(14);
    p.fill(0, 255, 0);
    y += 20;
    p.text(`Score: ${this.score.value}`, x, y);
    p.fill(0, 150, 255);
    y += 14;
    p.text(`Rank: ${this.score.rank}`, x, y);
    p.fill(255, 255, 0);
    y += 14;
    p.text(
      `HP (Lvl ${this.ship.healthLvl <= 5 ? this.ship.healthLvl : "max"}): ${
        this.ship.hp
      }/${this.ship.maxhp}`,
      x,
      y
    );
    p.fill(255, 255, 0);
    y += 14;
    p.text(
      `Weapon (Lvl ${this.ship.weaponLvl <= 5 ? this.ship.weaponLvl : "max"})`,
      x,
      y
    );
    p.fill(255, 255, 0);
    y += 14;
    p.text(
      `Movement (Lvl ${
        this.ship.movementLvl <= 5 ? this.ship.movementLvl : "max"
      })`,
      x,
      y
    );
    p.fill(0, 160, 255);
    y += 14;
    p.text(`HEAL (Use Hotkey(4) to convert score to health.)`, x, y);
    p.pop();
  }
}
