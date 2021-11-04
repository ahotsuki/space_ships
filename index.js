const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Game = require("./game/index");
const FPS = 1000 / 30;

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

io.on("connection", (socket) => {
  console.log("Client connected.");
  Game.addShip(socket.id);
  Game.addAsteroid();

  socket.on("forward", () => (Game.getShip(socket.id).boosting = true));
  socket.on("clockwise", () => (Game.getShip(socket.id).steering = 1));
  socket.on("counter", () => (Game.getShip(socket.id).steering = -1));
  socket.on("release", () => Game.getShip(socket.id).release());
  socket.on("releaseSteer", () => (Game.getShip(socket.id).steering = 0));
  socket.on("fire", () => Game.getShip(socket.id).fire());

  socket.on("disconnect", () => {
    Game.deleteShip(socket.id);
  });
});

function update() {
  io.emit("update", {
    ships: Game.getShips(),
    asteroids: Game.getAsteroids(),
    bullets: Game.getBullets(),
  });
  Game.update();
  // Game.getShips().forEach((s) => {
  //   io.to(s[0]).emit("collision", { message: Game.checkShipCollision(...s) });
  // });
}

const gameLoop = new setInterval(update, FPS);

server.listen(3000, () => console.log(`Server running on port 3000...`));
