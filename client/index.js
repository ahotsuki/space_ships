const socket = io();
const WIDTH =
  Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) -
  4;
const HEIGHT =
  Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  ) - 4;
let game_width;
let game_height;
let cam;
let _perspective = [];

socket.on("setup", (data) => {
  game_width = data.width;
  game_height = data.height;
  setup();
});

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

let x = 0,
  y = 0;
function draw() {
  background(0);
  translate(WIDTH / 2 - _perspective[0], HEIGHT / 2 - _perspective[1]);
  push();
  strokeWeight(5);
  stroke(255, 0, 0);
  line(0, 0, game_width, 0);
  line(0, 0, 0, game_height);
  line(game_width, 0, game_width, game_height);
  line(0, game_height, game_width, game_height);
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
