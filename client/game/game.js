import Ship from "./ship";
import Asteroid from "./asteroid";
import Bullet from "./bullet";

export default class Game {
  static ships = [];
  static asteroids = [];
  static bullets = [];
  static my_ship;
  static socket;
  static Camera;

  static addShips(data) {
    data.forEach((s) => {
      let ts = new Ship(s[1]);
      this.ships.push(ts);
      if (s[0] === this.socket.id) this.my_ship = ts;
    });
  }

  static addAsteroids(data) {
    data.forEach((a) => this.asteroids.push(new Asteroid(a)));
  }

  static addBullets(data) {
    data.forEach((b) => this.bullets.push(new Bullet(b)));
  }

  static setUpdates(data) {
    this.ships = [];
    this.asteroids = [];
    this.bullets = [];
    this.addShips(data.ships);
    this.addAsteroids(data.asteroids);
    this.addBullets(data.bullets);
    this.Camera.update(this.my_ship, data.rank);
  }

  static render(p) {
    if (this.ships.length) this.ships.forEach((s) => s.render(p));
    if (this.asteroids.length) this.asteroids.forEach((a) => a.render(p));
    if (this.bullets.length) this.bullets.forEach((b) => b.render(p));
  }
}
