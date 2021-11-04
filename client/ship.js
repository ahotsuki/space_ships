let SHIPS = [];

function renderShips() {
  SHIPS.forEach((s) => {
    renderShip(s[1].lines);
  });
}

function renderShip(lines) {
  push();
  stroke(255);
  lines.forEach((l) => line(...l));
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
  if (e.keyCode === 39) socket.emit("releaseSteer");
  if (e.keyCode === 37) socket.emit("releaseSteer");
});
