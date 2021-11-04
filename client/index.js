const socket = io();
const WIDTH = 1080;
const HEIGHT = 720;
let cam;
let _perspective = [];

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  cam = createCamera();
}

let x = 0,
  y = 0;
function draw() {
  background(0);
  cam.lookAt(..._perspective, 0);
  push();
  strokeWeight(5);
  stroke(255, 0, 0);
  line(0, 0, WIDTH, 0);
  line(0, 0, 0, HEIGHT);
  line(WIDTH, 0, WIDTH, HEIGHT);
  line(0, HEIGHT, WIDTH, HEIGHT);
  pop();
  renderShips();
  renderAsteroids();
  renderBullets();
}

socket.on("update", (data) => {
  SHIPS = data.ships;
  ASTEROIDS = data.asteroids;
  BULLETS = data.bullets;
  let ps = SHIPS.filter((s) => s[0] === socket.id);
  _perspective = [ps[0][1].x, ps[0][1].y];
});

socket.on("collision", (data) => console.log(data));
