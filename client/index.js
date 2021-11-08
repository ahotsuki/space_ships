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

let RANK = [];
function rankRender() {
  push();
  stroke(255);
  fill(255);
  textSize(18);
  let x = WIDTH - 80;
  let y = 40;
  RANK.sort((a, b) => b[1] - a[1]);
  if (RANK.length > 0)
    RANK.forEach((e) => {
      text(`${e[0]}, ${e[1]}`, x, y);
      y += 25;
    });
  pop();
}

socket.on("setup", (data) => {
  game_width = data.width;
  game_height = data.height;
  setup();
});

socket.emit("username", { uname: window.sessionStorage.getItem("username") });

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

let x = 0,
  y = 0;
function draw() {
  background(0);
  rankRender();
  if (my_ship) renderDetails();
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
  my_ship = ps[0][1];
  _perspective = [my_ship.x, my_ship.y];
  RANK = data.rank;
});

socket.on("gameover", ({ score }) => {
  window.sessionStorage.setItem("score", score);
  window.location = "gameover.html";
});
