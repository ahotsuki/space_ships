let ASTEROIDS = [];

function renderAsteroids() {
  ASTEROIDS.forEach((a) => {
    renderAsteroid(a.lines);
  });
}

function renderAsteroid(lines) {
  stroke(255);
  lines.forEach((l) => {
    line(...l[0], ...l[1]);
  });
}
