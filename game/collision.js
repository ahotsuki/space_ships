function bullet_asteroid(bullet, asteroid) {
  let collided = false;
  let col = 0;
  asteroid.lines.forEach((l) => {
    if (
      lineIntersection(...l, [bullet.xi, bullet.yi], [bullet.xf, bullet.yf])
    ) {
      col++;
    }
  });
  if (col === 1) collided = true;
  return collided;
}

function lineIntersection(a, b, c, d) {
  return (
    pointsDirection(a, c, d) !== pointsDirection(b, c, d) &&
    pointsDirection(a, b, c) !== pointsDirection(a, b, d)
  );
}

function pointsDirection(a, b, c) {
  return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
}

module.exports = {
  bullet_asteroid,
};
