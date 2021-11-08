const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const GameClass = require("./game/index");
const GAME = new GameClass(1080, 720, 30, io);
for (let i = 0; i < 2; i++) GAME.addAsteroid();

const FPS = 1000 / GAME.FPS;

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "game.html"));
});

io.on("connection", (socket) => {
  console.log("Client connected.");
  socket.emit("setup", { width: GAME.WIDTH, height: GAME.HEIGHT });
  GAME.addShip(socket.id);

  socket.on("username", ({ uname }) =>
    GAME.RANKS.set(socket.id, [GAME.getShip(socket.id).score, uname])
  );
  socket.on("forward", () => (GAME.getShip(socket.id).boosting = true));
  socket.on("clockwise", () => (GAME.getShip(socket.id).steering = 1));
  socket.on("counter", () => (GAME.getShip(socket.id).steering = -1));
  socket.on("release", () => GAME.getShip(socket.id).release());
  socket.on("releaseSteer", () => (GAME.getShip(socket.id).steering = 0));
  socket.on("fire", () => (GAME.getShip(socket.id).firing = true));
  socket.on("releaseFire", () => (GAME.getShip(socket.id).firing = false));

  socket.on("disconnect", () => {
    GAME.gameOver(GAME.getShip(socket.id));
    GAME.deleteShip(socket.id);
  });
});

function update() {
  io.emit("update", {
    ships: GAME.getShips(),
    asteroids: GAME.getAsteroids(),
    bullets: GAME.getBullets(),
  });
  GAME.update();
}

const gameLoop = new setInterval(update, FPS);

server.listen(3000, () => console.log(`Server running on port 3000...`));
