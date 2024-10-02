// TODO: Make buttons clickable
// TODO: Add a hover state to buttons
// TODO: Add a click state to buttons
// TODO: Add a player select screen so you can choose to play an AI or another player
// TODO: Randomize who get X or O, X always goes first
// TODO: 

class InputHandler {
  constructor() {}
}

class Button {
  constructor() {}
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  update(deltaTime) {}
  draw(c) {
    // Title Text
    c.save();
    c.fillStyle = "black";
    c.font = "bold 64px Monospace";
    c.textAlign = "center";
    c.fillText("TIC", this.width * 0.5, this.height * 0.15);
    c.fillText("TAC", this.width * 0.5, this.height * 0.2);
    c.fillText("TOE", this.width * 0.5, this.height * 0.25);
    c.restore();
    // Menu Buttons
    c.save();
    c.fillStyle = "darkblue";
    this.drawParallelogram(
      c,
      this.width * 0.5 - 196 + 24,
      this.height * 0.4,
      384,
      80,
      48
    );
    this.drawParallelogram(
      c,
      this.width * 0.5 - 196 + 24,
      this.height * 0.5,
      384,
      80,
      48
    );
    this.drawParallelogram(
      c,
      this.width * 0.5 - 196 + 24,
      this.height * 0.6,
      384,
      80,
      48
    );    c.restore();
    // Menu Button Text
    c.save();
    c.fillStyle = "white";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.fillText("Classic", this.width * 0.5, this.height * 0.45);
    c.fillText("Ultimate", this.width * 0.5, this.height * 0.55);
    c.fillText("Infinite", this.width * 0.5, this.height * 0.65);
    c.restore();

    c.save();
    c.fillStyle = "black";
    c.font = "bold 16px Sans-Serif";
    c.textAlign = "center";
    c.fillText("2024 EDWARD VONSCHONDORF", this.width * 0.5, this.height * 0.95);
    c.restore();
  }
  drawParallelogram(c, x, y, width, height, skew) {
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + width, y);
    c.lineTo(x + width - skew, y + height);
    c.lineTo(x - skew, y + height);
    c.closePath();
    c.fill();
  }
}

const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = canvas.width;

const game = new Game(canvas);

let previousTimestamp = 0;

function animationLoop(timeStamp) {
  if (previousTimestamp === 0) previousTimestamp = timeStamp;
  const deltaTime = timeStamp - previousTimestamp;
  previousTimestamp = timeStamp;
  c.clearRect(0, 0, canvas.width, canvas.height);
  game.update(deltaTime);
  game.draw(c);
  requestAnimationFrame(animationLoop);
}
requestAnimationFrame(animationLoop);
