const Ship = require("./ship");
const SHIPS = new Map();

const Asteroid = require("./asteroid");
let ASTEROIDS = [];

const Bullet = require("./bullet");
let BULLETS = [];

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

function checkShipCollision(id, ship) {
  let a = false;
  SHIPS.forEach((s, k) => {
    if (k !== id) {
      if (Math.abs(s.x - ship.x) < 50) a = true;
    }
  });
  return a;
}

function addAsteroid() {
  ASTEROIDS = [];
  ASTEROIDS.push(new Asteroid(200, 200, 3));
}

function getAsteroids() {
  return ASTEROIDS;
}

function addBullet() {
  console.log("shots fired!");
}

// function lineIntersection(a, b, c, d) {
//   return (
//     pointsDirection(a, c, d) !== pointsDirection(b, c, d) &&
//     pointsDirection(a, b, c) !== pointsDirection(a, b, d)
//   );
// }

// function pointsDirection(a, b, c) {
//   return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
// }

module.exports = {
  addShip,
  getShips,
  deleteShip,
  getShip,
  updateShips,
  checkShipCollision,
  addAsteroid,
  getAsteroids,
};
