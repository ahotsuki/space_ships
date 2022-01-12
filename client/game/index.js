import p5 from "./p5";
import socketProcesses from "./socket";
import Camera from "./camera";
import Game from "./game";
import Ship from "./ship";
import Asteroid from "./asteroid";
import Bullet from "./bullet";
import Rank from "./rank";

const socket = io();
const containerElement = document.body;
Game.Camera = Camera;
Game.socket = socket;

////////////////////////////////////////////////////////////////////////////////
// p5 processes
////////////////////////////////////////////////////////////////////////////////
const sketch = (p) => {
  p.setup = function () {
    p.createCanvas(Camera.width || 0, Camera.height || 0);
  };

  p.draw = function () {
    // draw background
    p.background(0);
    Camera.render(p);

    // draw game border
    p.push();
    p.strokeWeight(5);
    p.stroke(255, 0, 0);
    p.line(0, 0, Camera.game_width, 0);
    p.line(0, 0, 0, Camera.game_height);
    p.line(Camera.game_width, 0, Camera.game_width, Camera.game_height);
    p.line(0, Camera.game_height, Camera.game_width, Camera.game_height);
    p.pop();

    // render game
    Game.render(p);
  };
};

const gameSketch = new p5(sketch, containerElement);

////////////////////////////////////////////////////////////////////////////////
// socket processes
////////////////////////////////////////////////////////////////////////////////
socketProcesses(socket, Camera, gameSketch, Game);
