export default function (socket, Camera, gameSketch, Game, Shop) {
  socket.emit("username", { uname: window.sessionStorage.getItem("username") });

  socket.on("setup", (data) => {
    Camera.game_width = data.width;
    Camera.game_height = data.height;
    Shop.GOD = data.god;
    gameSketch.setup();
  });

  socket.on("update", (data) => {
    Game.setUpdates(data);
  });

  socket.on("gameover", ({ score }) => {
    window.sessionStorage.setItem("score", score);
    window.location = "../gameover.html";
  });

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 38) socket.emit("forward");
    if (e.keyCode === 39) socket.emit("clockwise");
    if (e.keyCode === 37) socket.emit("counter");
    if (e.keyCode === 32) socket.emit("fire");
  });

  document.addEventListener("keyup", (e) => {
    if (e.keyCode === 38) socket.emit("release");
    if (e.keyCode === 32) socket.emit("releaseFire");
    if (e.keyCode === 39) socket.emit("releaseSteer");
    if (e.keyCode === 37) socket.emit("releaseSteer");
  });
}
