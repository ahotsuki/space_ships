let SHIPS = [];
let my_ship = false;

function renderShips() {
  SHIPS.forEach((s) => {
    renderShip(s[1].color, s[1].lines, s[1].boost, s[1].lboost, s[1].rboost);
  });
}

function renderShip(color, lines) {
  push();
  stroke(color);
  lines.forEach((l) => line(...l));
  pop();
}

function renderDetails() {
  push();
  stroke(255);
  fill(0, 255, 0);
  textSize(18);
  let x = WIDTH / 2 - 20;
  let y = 40;
  text(`${my_ship.score.username}`, x, y);
  text(`SCORE: ${my_ship.score.value}`, x, y + 25);
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
