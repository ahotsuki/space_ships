const socket = io();

function setup() {
  createCanvas(1080, 720);
}

let x = 0,
  y = 0;
function draw() {
  background(0);
  renderShips();
  renderAsteroids();
}

socket.on("update", (data) => {
  SHIPS = data.ships;
  ASTEROIDS = data.asteroids;
});

socket.on("collision", (data) => console.log(data));
