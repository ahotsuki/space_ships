let WIDTH, HEIGHT, FPS, GAME;
let new_spawn = 0;

const Ship = require("./ship");
const SHIPS = new Map();

const Asteroid = require("./asteroid");
let ASTEROIDS = [];

const Bullet = require("./bullet");
let BULLETS = [];

const Collision = require("./collision");

function addShip(id) {
  SHIPS.set(id, new Ship(100, 100, 30, this, id));
}

function getShips() {
  return [...SHIPS];
}

function getShip(id) {
  return SHIPS.get(id);
}

function deleteShip(id) {
  SHIPS.delete(id);
}

function updateShips() {
  SHIPS.forEach((s) => s.update());
}

function addAsteroid() {
  let w = this.WIDTH / 2;
  let h = this.HEIGHT / 2;
  ASTEROIDS.push(new Asteroid(w, h, 3, this));
}

function birthAsteroid(x, y, lvl) {
  ASTEROIDS.push(new Asteroid(x, y, lvl, this));
}

function getAsteroids() {
  return ASTEROIDS;
}

function deleteAsteroid(asteroid) {
  const index = ASTEROIDS.indexOf(asteroid);
  ASTEROIDS.splice(index, 1);
}

function updateAsteroids() {
  ASTEROIDS.forEach((a) => a.update());
}

function addBullet(id, x, y, speed, mrange, heading) {
  BULLETS.push(new Bullet(id, x, y, speed, mrange, heading, this));
}

function getBullets() {
  return BULLETS;
}

function updateBullets() {
  BULLETS.forEach((b) => b.update());
}

function deleteBullet(bullet) {
  const index = BULLETS.indexOf(bullet);
  BULLETS.splice(index, 1);
}

function checkCollision() {
  BULLETS.forEach((b) => {
    ASTEROIDS.forEach((a) => {
      if (
        a.x > b.xf - 100 &&
        a.x < b.xf + 100 &&
        a.y > b.yf - 100 &&
        a.y < b.yf + 100
      ) {
        a.color = [255, 0, 0];
        if (Collision.bullet_asteroid(b, a)) {
          // a.color = [255, 0, 0];
          if (a.lvl === 1) new_spawn++;
          if (new_spawn >= 8) {
            a.rebirth();
            new_spawn -= 8;
          }
          a.die();
          b.die();
        }
      }
    });
  });

  SHIPS.forEach((s) => {
    ASTEROIDS.forEach((a) => {
      if (
        a.x > s.x - 100 &&
        a.x < s.x + 100 &&
        a.y > s.y - 100 &&
        a.y < s.y + 100
      ) {
        a.color = [0, 0, 255];
        Collision.ship_asteroid(s, a);
      }
    });
  });

  SHIPS.forEach((s1) => {
    SHIPS.forEach((s2) => {
      if (s1 !== s2) {
        if (
          s2.x > s1.x - 100 &&
          s2.x < s1.x + 100 &&
          s2.y > s1.y - 100 &&
          s2.y < s1.y + 100
        ) {
          s2.color = [0, 0, 255];
          Collision.ship_ship(s1, s2);
        }
      }
    });
  });

  BULLETS.forEach((b) => {
    SHIPS.forEach((s) => {
      if (s.id === b.id) return;
      if (
        s.x > b.xf - 100 &&
        s.x < b.xf + 100 &&
        s.y > b.yf - 100 &&
        s.y < b.yf + 100
      ) {
        s.color = [255, 0, 0];
        Collision.bullet_ship(b, s);
      }
    });
  });
}

function update() {
  updateShips();
  updateBullets();
  updateAsteroids();
  checkCollision();
}

module.exports = {
  WIDTH,
  HEIGHT,
  FPS,
  update,
  addShip,
  getShips,
  deleteShip,
  getShip,
  addAsteroid,
  birthAsteroid,
  getAsteroids,
  deleteAsteroid,
  addBullet,
  getBullets,
  deleteBullet,
};
