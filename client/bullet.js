let BULLETS = [];

function renderBullets() {
  noStroke();
  fill(255, 0, 0);
  BULLETS.forEach((b) => ellipse(b.xf, b.yf, 5, 5));
}
