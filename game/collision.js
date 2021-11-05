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

function ship_asteroid(ship, asteroid) {
  asteroid.lines.forEach((a) => {
    ship.lines.forEach((s) => {
      if (lineIntersection(...a, [s[0], s[1]], [s[2], s[3]]))
        asteroid.color = [255, 0, 0];
    });
  });
}

function ship_ship(ship1, ship2) {
  ship1.lines.forEach((s1) => {
    ship2.lines.forEach((s2) => {
      if (
        lineIntersection(
          [s1[0], s1[1]],
          [s1[2], s1[3]],
          [s2[0], s2[1]],
          [s2[2], s2[3]]
        )
      ) {
        ship2.color = [255, 0, 0];
      }
    });
  });
}

function bullet_ship(bullet, ship) {
  // let collided = false;
  let col = 0;
  ship.lines.forEach((l) => {
    if (
      lineIntersection(
        [l[0], l[1]],
        [l[2], l[3]],
        [bullet.xi, bullet.yi],
        [bullet.xf, bullet.yf]
      )
    ) {
      col++;
    }
  });
  if (col === 1) ship.color = [0, 255, 0];
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
  ship_asteroid,
  ship_ship,
  bullet_ship,
};
