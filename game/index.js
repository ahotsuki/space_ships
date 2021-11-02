const Ship = require("./ship");
const SHIPS = new Map();

function addShip(id) {
  SHIPS.set(id, new Ship(100, 100, 30));
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

// function lineIntersection(a, b, c, d) {
//   return (
//     pointsDirection(a, c, d) !== pointsDirection(b, c, d) &&
//     pointsDirection(a, b, c) !== pointsDirection(a, b, d)
//   );
// }

// function pointsDirection(a, b, c) {
//   return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
// }

module.exports = { addShip, getShips, deleteShip, getShip, updateShips };
