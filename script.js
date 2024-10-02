class GameCell {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = " ";
  }
  isMouseOver(mouse) {
    return (
      mouse.x >= this.x &&
      mouse.x <= this.x + this.width &&
      mouse.y >= this.y &&
      mouse.y <= this.y + this.height
    );
  }
  changeState(newState) {
    if (this.state === " ") this.state = newState;
  }
  draw(c) {
    c.fillStyle = "black";
    c.lineWidth = 2;
    c.strokeRect(this.x, this.y, this.width, this.height);
    c.font = "bold 64px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(
      this.state,
      this.x + this.width * 0.5,
      this.y + this.height * 0.5
    );
  }
}

class GameGrid {
  constructor(game, x, y, width, height, rows, cols) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
    this.setupGameGrid();
  }
  setupGameGrid() {
    const cellWidth = this.width / this.cols;
    const cellHeight = this.height / this.rows;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x = this.x + col * cellWidth;
        const y = this.y + row * cellHeight;
        this.cells.push(new GameCell(x, y, cellWidth, cellHeight));
      }
    }
  }
  draw(c) {
    this.cells.forEach((cell) => cell.draw(c));
  }
}

class InputHandler {
  constructor(game) {
    this.game = game;
    this.mouse = {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    };
    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = event.clientX - rect.left;
      this.mouse.y = event.clientY - rect.top;
      this.game.handleClick();
    });
    canvas.addEventListener("touchstart", (event) => {
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
      this.game.handleClick();
    });
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.players = ["X", "O"];
    this.currentPlayer =
      Math.random() <= 0.5 ? this.players[0] : this.players[1];
    this.input = new InputHandler(this);
    this.cellState = " ";
    this.cellStates = [" ", "X", "O"];
    this.gameGrid = new GameGrid(this, 0, 0, this.width, this.height, 3, 3);
  }
  changeCurrentPlayer() {
    if (this.currentPlayer === "X") this.currentPlayer = "O";
    else this.currentPlayer = "X";
  }
  handleClick() {
    this.gameGrid.cells.forEach((cell) => {
      if (cell.isMouseOver(this.input.mouse) && cell.state === " ") {
        cell.changeState(this.currentPlayer);
        this.changeCurrentPlayer();
      }
    });
  }
  draw() {
    c.fillStyle = "black";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(
      "It is " + this.currentPlayer + "'s Turn",
      this.width * 0.5,
      this.height * 0.05
    );
    this.gameGrid.draw(c);
  }
}

const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth - 64;
canvas.height = window.innerHeight - 64;

const game = new Game(canvas);

function animationLoop() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(c);
  requestAnimationFrame(animationLoop);
}
requestAnimationFrame(animationLoop);
