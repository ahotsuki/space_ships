function lineIntersection(a, b, c, d) {
  return (
    pointsDirection(a, c, d) !== pointsDirection(b, c, d) &&
    pointsDirection(a, b, c) !== pointsDirection(a, b, d)
  );
}

function pointsDirection(a, b, c) {
  return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
}
