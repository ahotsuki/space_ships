// external module requires
const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// game module setup
const GameClass = require("./game/index");
const GAME = new GameClass(1080, 720, 30, io, true);
for (let i = 0; i < 2; i++) GAME.addAsteroid();
const FPS = 1000 / GAME.FPS;

// rank module setup
const RankClass = require("./game/rank");
const RANK = new RankClass();

// express middlewares setup
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

//////////////////////////////////////////////////////////////////
// express routes
//////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "game.html"));
});

app.get("/score", (req, res) => {
  res.send({ ranks: RANK.getRankings(), alltime: RANK.getAlltime() });
});

app.post("/health", (req, res) => {
  let ship = GAME.getShip(req.body.id);
  ship.upgradeHealth();
  res.send({ value: ship.healthLvl, cost: 2 ** ship.healthLvl });
});

app.post("/weapon", (req, res) => {
  let ship = GAME.getShip(req.body.id);
  ship.upgradeWeapon();
  res.send({ value: ship.weaponLvl, cost: 2 ** ship.weaponLvl });
});

app.post("/movement", (req, res) => {
  let ship = GAME.getShip(req.body.id);
  ship.upgradeMovement();
  res.send({ value: ship.movementLvl, cost: 2 ** ship.movementLvl });
});

app.post("/heal", (req, res) => {
  let ship = GAME.getShip(req.body.id);
  if ((ship.score.value > 0 || GAME.GOD) && ship.hp < ship.maxhp) {
    ship.score.value--;
    ship.hp++;
  }
  res.send({});
});

//////////////////////////////////////////////////////////////////
// socket connection
//////////////////////////////////////////////////////////////////
io.on("connection", (socket) => {
  console.log("Client connected.");
  socket.emit("setup", {
    width: GAME.WIDTH,
    height: GAME.HEIGHT,
    god: GAME.GOD,
  });
  GAME.addShip(socket.id);
  RANK.setScore(socket.id, GAME.getShip(socket.id).score);

  socket.on("username", ({ uname }) =>
    GAME.getShip(socket.id).setUsername(uname)
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
    RANK.deleteScore(socket.id);
  });
});

function update() {
  io.emit("update", {
    ships: GAME.getShips(),
    asteroids: GAME.getAsteroids(),
    bullets: GAME.getBullets(),
    alltime: RANK.getAlltime(),
    rank: RANK.getRankings(),
  });
  GAME.update();
  RANK.update();
}

const gameLoop = new setInterval(update, FPS);

//////////////////////////////////////////////////////////////////
// server setup
//////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
