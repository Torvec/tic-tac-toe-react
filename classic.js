class GameCell {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = " ";
  }
  isPointerOver(pointer) {
    return (
      pointer.x >= this.x &&
      pointer.x <= this.x + this.width &&
      pointer.y >= this.y &&
      pointer.y <= this.y + this.height
    );
  }
  changeState(newState) {
    if (this.state === " ") this.state = newState;
  }
  draw() {
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
  draw() {
    this.cells.forEach((cell) => cell.draw());
  }
}

class InputHandler {
  constructor(game) {
    this.game = game;
    this.pointer = {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    };
    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      this.pointer.x = event.clientX - rect.left;
      this.pointer.y = event.clientY - rect.top;
      this.game.handleClick();
    });
    canvas.addEventListener("touchstart", (event) => {
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      this.pointer.x = touch.clientX - rect.left;
      this.pointer.y = touch.clientY - rect.top;
      this.game.handleClick();
    });
  }
}

class Game {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.players = ["X", "O"];
    this.currentPlayer =
      Math.random() <= 0.5 ? this.players[0] : this.players[1];
    this.input = new InputHandler(this);
    this.cellState = " ";
    this.cellStates = [" ", "X", "O"];
    this.gameGrid = new GameGrid(this, 0, 0, this.width, this.height, 3, 3);
    this.gameWon = false;
    this.gameDraw = false;
  }
  changeCurrentPlayer() {
    if (this.currentPlayer === this.players[0])
      this.currentPlayer = this.players[1];
    else this.currentPlayer = this.players[0];
  }
  handleClick() {
    this.gameGrid.cells.forEach((cell) => {
      if (
        cell.isPointerOver(this.input.pointer) &&
        cell.state === " " &&
        !this.gameWon
      ) {
        cell.changeState(this.currentPlayer);
        if (this.checkWinCondition()) {
          this.gameWon = true;
          return;
        }
        this.changeCurrentPlayer();
      }
    });
  }
  checkWinCondition() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const cellA = this.gameGrid.cells[a].state;
      const cellB = this.gameGrid.cells[b].state;
      const cellC = this.gameGrid.cells[c].state;
      if (cellA === cellB && cellB === cellC && cellA !== " ") {
        return true;
      }
    }
  }
  checkDrawCondition() {
    return this.gameGrid.cells.every((cell) => cell.state !== " ");
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
    if (this.checkWinCondition()) {
      this.gameWon = true;
      c.fillText(
        this.currentPlayer + " has won!",
        this.width * 0.5,
        this.height * 0.95
      );
    } else if (this.checkDrawCondition()) {
      this.gameDraw = true;
      c.fillText("It's a draw!", this.width * 0.5, this.height * 0.95);
    }
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
