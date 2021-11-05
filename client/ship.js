let SHIPS = [];

function renderShips() {
  SHIPS.forEach((s) => {
    renderShip(s[1].color, s[1].lines, s[1].boost, s[1].lboost, s[1].rboost);
  });
}

function renderShip(color, lines, boost, lb, rb) {
  push();
  stroke(color);
  lines.forEach((l) => line(...l));
  noStroke();
  fill(0, 0, 255, 95);
  boost.forEach((b) => ellipse(...b, 7, 7));
  fill(255, 0, 0, 95);
  lb.forEach((b) => ellipse(...b, 5, 5));
  rb.forEach((b) => ellipse(...b, 5, 5));
  pop();
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 38) socket.emit("forward");
  if (e.keyCode === 39) socket.emit("clockwise");
  if (e.keyCode === 37) socket.emit("counter");
  if (e.keyCode === 32) socket.emit("fire");
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 38) socket.emit("release");
  if (e.keyCode === 32) socket.emit("releaseFire");
  if (e.keyCode === 39) socket.emit("releaseSteer");
  if (e.keyCode === 37) socket.emit("releaseSteer");
});
