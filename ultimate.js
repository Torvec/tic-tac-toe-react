// TODO: Define gameGrids[4] as the first playable grid as it is the center grid
// TODO: Setup how playable grids are determined based off of the last played cell
// TODO: If a grid is won/drawn, it should be unplayable and if the last played cell points to that grid, the next player should be able to play anywhere
// TODO: More TBD

class GameCell {
  constructor({ x, y, width, height }) {
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
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cells = [];
    this.setupGameGrid();
  }
  setupGameGrid() {
    const padding = 10;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.cells.push(
          new GameCell({
            x: this.x + padding + (col * (this.width - 2 * padding)) / 3,
            y: this.y + padding + (row * (this.height - 2 * padding)) / 3,
            width: (this.width - 2 * padding) / 3,
            height: (this.height - 2 * padding) / 3,
          })
        );
      }
    }
  }
  draw() {
    this.cells.forEach((cell) => cell.draw());
  }
}

class GameBoard {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.gameGrids = [];
    this.setupGameBoard();
  }
  setupGameBoard() {
    const padding = 10;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.gameGrids.push(
          new GameGrid({
            x: this.x + padding + (col * (this.width - 2 * padding)) / 3,
            y: this.y + padding + (row * (this.height - 2 * padding)) / 3,
            width: (this.width - 2 * padding) / 3,
            height: (this.height - 2 * padding) / 3,
          })
        );
      }
    }
  }
  draw() {
    this.gameGrids.forEach((grid) => grid.draw());
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
    this.player = { x: "X", o: "O" };
    this.currentPlayer = Math.random() <= 0.5 ? this.player.x : this.player.o;
    this.input = new InputHandler(this);
    this.cellStates = { empty: " ", x: "X", o: "O" };
    this.cellState = this.cellStates.empty;
    this.gameBoard = new GameBoard({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
    });
    console.log(this.gameBoard);
    this.gridWon = false;
    this.gridDraw = false;
    this.gridPlayable = false;
    this.gameWon = false;
    this.gameDraw = false;
  }
  changeCurrentPlayer() {
    if (this.currentPlayer === this.player.x)
      this.currentPlayer = this.player.o;
    else this.currentPlayer = this.player.x;
  }
  handleClick() {
    // this.gameBoard.gameGrids[0].cells[0]
    this.gameBoard.gameGrids.forEach((grid) => {
      grid.cells.forEach((cell) => {
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
    });
  }
  checkWinCondition() {
    // const winningCombinations = [
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   [0, 4, 8],
    //   [2, 4, 6],
    // ];
    // for (let combination of winningCombinations) {
    //   const [a, b, c] = combination;
    //   const cellA = this.gameGrid.cells[a].state;
    //   const cellB = this.gameGrid.cells[b].state;
    //   const cellC = this.gameGrid.cells[c].state;
    //   if (cellA === cellB && cellB === cellC && cellA !== " ") {
    //     return true;
    //   }
    // }
  }
  checkDrawCondition() {
    // return this.gameBoard.gameGrid.cells.every((cell) => cell.state !== " ");
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
    this.gameBoard.draw(c);
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
