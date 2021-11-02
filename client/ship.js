let SHIPS = [];

function renderShips() {
  SHIPS.forEach((s) => {
    renderShip(s[1].lines);
  });
}

function renderShip(lines) {
  stroke(255);
  lines.forEach((l) => line(...l));
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 38) socket.emit("forward");
  if (e.keyCode === 39) socket.emit("clockwise");
  if (e.keyCode === 37) socket.emit("counter");
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 38) socket.emit("release");
});
