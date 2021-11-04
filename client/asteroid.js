let ASTEROIDS = [];

function renderAsteroids() {
  ASTEROIDS.forEach((a) => {
    renderAsteroid(a.lines, a.color);
  });
}

function renderAsteroid(lines, color) {
  stroke(color);
  lines.forEach((l) => {
    line(...l[0], ...l[1]);
  });
}
