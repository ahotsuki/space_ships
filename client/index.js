const socket = io();

function setup() {
  createCanvas(720, 360);
}

let x = 0,
  y = 0;
function draw() {
  background(0);
  ellipse(x++, y++, 10, 10);
}
