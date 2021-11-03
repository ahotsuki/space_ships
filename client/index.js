const socket = io();

function setup() {
  createCanvas(1080, 720);
}

let x = 0,
  y = 0;
function draw() {
  background(0);
  renderShips();
}

socket.on("update", (data) => {
  SHIPS = data.ships;
});

socket.on("collision", (data) => console.log(data));
