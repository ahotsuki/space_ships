const WIDTH = 1080,
  HEIGHT = 720;

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

// function checkShipCollision(id, ship) {
//   let a = false;
//   SHIPS.forEach((s, k) => {
//     if (k !== id) {
//       if (Math.abs(s.x - ship.x) < 50) a = true;
//     }
//   });
//   return a;
// }

function addAsteroid() {
  // ASTEROIDS = [];
  ASTEROIDS.push(new Asteroid(200, 200, 3, this));
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

function addBullet(id, x, y, speed, heading) {
  BULLETS.push(new Bullet(id, x, y, speed, heading, this));
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
      if (Collision.bullet_asteroid(b, a)) {
        // a.color = [255, 0, 0];
        a.die();
        b.die();
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
