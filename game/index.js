const Ship = require("./ship");
const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Collision = require("./collision");

class Game {
  #new_spawn = 0;

  constructor(WIDTH, HEIGHT, FPS, io) {
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    this.FPS = FPS;
    this.io = io;
    this.SHIPS = new Map();
    this.ASTEROIDS = [];
    this.BULLETS = [];
    this.ALLTIMERANK = [];
    this.RANKS = new Map();
  }

  addShip(id) {
    this.SHIPS.set(id, new Ship(100, 100, 30, this, id));
  }

  getShips() {
    return [...this.SHIPS];
  }

  getShip(id) {
    return this.SHIPS.get(id);
  }

  deleteShip(id) {
    this.SHIPS.delete(id);
  }

  updateShips() {
    this.SHIPS.forEach((s) => s.update());
  }

  addAsteroid() {
    let w = this.WIDTH / 2;
    let h = this.HEIGHT / 2;
    this.ASTEROIDS.push(new Asteroid(w, h, 3, this));
  }

  birthAsteroid(x, y, lvl) {
    this.ASTEROIDS.push(new Asteroid(x, y, lvl, this));
  }

  getAsteroids() {
    return this.ASTEROIDS;
  }

  deleteAsteroid(asteroid) {
    const index = this.ASTEROIDS.indexOf(asteroid);
    this.ASTEROIDS.splice(index, 1);
  }

  updateAsteroids() {
    this.ASTEROIDS.forEach((a) => a.update());
  }

  addBullet(id, x, y, speed, mrange, heading) {
    this.BULLETS.push(new Bullet(id, x, y, speed, mrange, heading, this));
  }

  getBullets() {
    return this.BULLETS;
  }

  updateBullets() {
    this.BULLETS.forEach((b) => b.update());
  }

  deleteBullet(bullet) {
    const index = this.BULLETS.indexOf(bullet);
    this.BULLETS.splice(index, 1);
  }

  gameOver(ship) {
    this.io.to(ship.id).emit("gameover", { score: ship.score.value });
  }

  checkCollision() {
    this.BULLETS.forEach((b) => {
      this.ASTEROIDS.forEach((a) => {
        if (
          a.x > b.xf - 100 &&
          a.x < b.xf + 100 &&
          a.y > b.yf - 100 &&
          a.y < b.yf + 100
        ) {
          if (Collision.bullet_asteroid(b, a)) {
            if (a.lvl === 1) this.#new_spawn++;
            if (this.#new_spawn >= 8) {
              this.addAsteroid();
              this.#new_spawn -= 8;
            }
            this.getShip(b.id).score.plus();
            a.die();
            b.die();
          }
        }
      });
    });

    this.SHIPS.forEach((s) => {
      this.ASTEROIDS.forEach((a) => {
        if (
          a.x > s.x - 100 &&
          a.x < s.x + 100 &&
          a.y > s.y - 100 &&
          a.y < s.y + 100
        ) {
          if (Collision.ship_asteroid(s, a)) {
            if (a.lvl === 1) this.#new_spawn++;
            if (this.#new_spawn >= 8) {
              this.addAsteroid();
              this.#new_spawn -= 8;
            }
            s.score.plus();
            a.die();
            this.gameOver(s);
          }
        }
      });
    });

    this.SHIPS.forEach((s1) => {
      this.SHIPS.forEach((s2) => {
        if (s1 !== s2) {
          if (
            s2.x > s1.x - 100 &&
            s2.x < s1.x + 100 &&
            s2.y > s1.y - 100 &&
            s2.y < s1.y + 100
          ) {
            if (Collision.ship_ship(s1, s2)) {
              s1.score.plus();
              s2.score.plus();
              this.gameOver(s1);
              this.gameOver(s2);
            }
          }
        }
      });
    });

    this.BULLETS.forEach((b) => {
      this.SHIPS.forEach((s) => {
        if (s.id === b.id) return;
        if (
          s.x > b.xf - 100 &&
          s.x < b.xf + 100 &&
          s.y > b.yf - 100 &&
          s.y < b.yf + 100
        ) {
          s.color = [255, 0, 0];
          if (Collision.bullet_ship(b, s)) {
            this.getShip(b.id).score.plus();
            this.gameOver(s);
          }
        }
      });
    });
  }

  update() {
    this.updateShips();
    this.updateBullets();
    this.updateAsteroids();
    this.checkCollision();
  }
}

module.exports = Game;
