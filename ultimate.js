//* Initially the first playable grid is the center grid
//* When a player makes their move in a grid, the next playable grid is determined by the index of the cell which is then passed to the setActiveGrid method
// TODO: However that grid is only playable if it is not won or drawn, if the grid is unplayable then the player can play anywhere that has empty cells
// TODO: Also need to make sure the previous grid's state is changed to unplayable but only if the next grid is playable
// TODO: Also need to be able to set EVERY available grid to playable if the player can play anywhere

class InputHandler {
  constructor(game) {
    this.game = game;
    this.pointer = {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    };
    canvas.addEventListener("click", (e) => this.handleClickEvent(e));
    canvas.addEventListener("touchstart", (e) => this.handleTouchStartEvent(e));
    canvas.addEventListener("mousemove", (e) => this.handleMouseMoveEvent(e));
  }
  handleClickEvent(e) {
    const rect = canvas.getBoundingClientRect();
    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;
    this.game.gameBoard.handleClick();
  }
  handleTouchStartEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    this.pointer.x = touch.clientX - rect.left;
    this.pointer.y = touch.clientY - rect.top;
    this.game.gameBoard.handleClick();
  }
  handleMouseMoveEvent(e) {
    const rect = canvas.getBoundingClientRect();
    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;
    // console.log(this.pointer);
    // this.game.gameBoard.handleMouseMove();
  }
}

class GameCell {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cellStates = {
      EMPTY: " ",
      HOVERED_X: "X",
      HOVERED_O: "O",
      FILLED_X: "X",
      FILLED_O: "O",
      DISABLED_X: "disabled_X",
      DISABLED_O: "disabled_O",
      DISABLED_DRAW: "disabled_draw",
    };
    this.init();
  }
  init() {
    this.currentState = this.cellStates.EMPTY;
  }
  isPointerOver(pointer) {
    return (
      pointer.x >= this.x &&
      pointer.x <= this.x + this.width &&
      pointer.y >= this.y &&
      pointer.y <= this.y + this.height
    );
  }
  // isHovered(pointer, currentPlayer) {
  //   if (this.isPointerOver(pointer)) {
  //     if (this.currentState === this.cellStates.EMPTY) {
  //       this.currentState =
  //         currentPlayer === "X"
  //           ? this.cellStates.HOVERED_X
  //           : this.cellStates.HOVERED_O;
  //     }
  //   } else {
  //     if (
  //       this.currentState === this.cellStates.HOVERED_X ||
  //       this.currentState === this.cellStates.HOVERED_O
  //     ) {
  //       this.currentState = this.cellStates.EMPTY;
  //     }
  //   }
  // }
  setGameCellState(newState) {
    if (this.currentState === this.cellStates.EMPTY)
      this.currentState = newState;
  }
  update() {}
  draw() {
    // This determines the color of the lines for each box
    c.save();
    c.strokeStyle = "black";
    c.lineWidth = 1;
    c.strokeRect(this.x, this.y, this.width, this.height);
    c.fillStyle = "grey";
    c.fillRect(this.x, this.y, this.width, this.height);
    c.restore();
    c.save();
    c.fillStyle = "black";
    c.font = "bold 64px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(
      this.currentState,
      this.x + this.width * 0.5,
      this.y + this.height * 0.5
    );
    c.restore();
  }
}

class GameGrid {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.gridStates = {
      ACTIVE: "active",
      INACTIVE: "inactive",
      X_WON: "x_won",
      O_WON: "o_won",
      DRAW: "draw",
    };
    this.init();
  }
  init() {
    this.currentState = this.gridStates.INACTIVE;
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
  setGameGridState(newState) {
    this.currentState = newState;
  }
  isPlayable() {
    return (
      this.currentState !== this.gridStates.X_WON &&
      this.currentState !== this.gridStates.O_WON &&
      this.currentState !== this.gridStates.DRAW
    );
  }
  isGridWon() {
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
    const cellStates = this.cells[0].cellStates;
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const cellA = this.cells[a].currentState;
      const cellB = this.cells[b].currentState;
      const cellC = this.cells[c].currentState;
      if (cellA === cellB && cellB === cellC && cellA !== cellStates.EMPTY) {
        return true;
      }
    }
    return false;
  }
  isGridDraw() {
    for (let cell of this.cells) {
      if (cell.currentState === cell.cellStates.EMPTY) {
        return false;
      }
    }
    return true;
  }
  update() {
    this.cells.forEach((cell) => cell.update());
    if (this.isGridWon()) {
      this.currentState =
        this.cells[0].currentState === this.cells[0].cellStates.FILLED_X
          ? this.gridStates.X_WON
          : this.gridStates.O_WON;
    }
    if (this.isGridDraw()) {
      this.currentState = this.gridStates.DRAW;
    }
  }
  draw() {
    this.cells.forEach((cell) => cell.draw());
    switch (this.currentState) {
      case this.gridStates.ACTIVE:
        c.save();
        c.strokeStyle = "rgba(0, 144, 0, 1)";
        c.lineWidth = 6;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case this.gridStates.X_WON:
        c.save();
        c.strokeStyle = "rgba(0, 0, 144, 1)";
        c.lineWidth = 6;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case this.gridStates.O_WON:
        c.save();
        c.strokeStyle = "rgba(144, 0, 0, 1)";
        c.lineWidth = 6;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case this.gridStates.DRAW:
        c.save();
        c.strokeStyle = "rgba(64, 64, 64, 1)";
        c.lineWidth = 6;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
    }
  }
}

class GameBoard {
  constructor({ game, x, y, width, height }) {
    this.game = game;
    this.input = this.game.input;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.player = { x: "X", o: "O" };
    this.gameBoardStates = {
      PLAY: "play",
      X_WON: "x_won",
      O_WON: "o_won",
      DRAW: "draw",
    };
    this.init();
  }
  init() {
    this.gameWon = false;
    this.gameDraw = false;
    this.currentPlayer = Math.random() <= 0.5 ? this.player.x : this.player.o;
    this.gameGrids = [];
    this.setupGameBoard();
    this.setGameBoardState(this.gameBoardStates.PLAY);
    this.setActiveGrid(null, 4);
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
  setGameBoardState(newState) {
    this.currentState = newState;
  }
  setActiveGrid(prevIndex, newIndex) {
    this.gameGrids[newIndex].setGameGridState(
      this.gameGrids[newIndex].gridStates.ACTIVE
    );
    if (prevIndex !== null && prevIndex !== newIndex) {
      this.gameGrids[prevIndex].setGameGridState(
        this.gameGrids[prevIndex].gridStates.INACTIVE
      );
    }
  }
  handleClick() {
    this.gameGrids.forEach((grid, gridIndex) => {
      if (grid.currentState === grid.gridStates.ACTIVE) {
        grid.cells.forEach((cell, cellIndex) => {
          if (cell.isPointerOver(this.input.pointer)) {
            cell.setGameCellState(
              this.currentPlayer === this.player.x
                ? cell.cellStates.FILLED_X
                : cell.cellStates.FILLED_O
            );
            if (grid.isGridWon()) {
              grid.setGameGridState(
                this.currentPlayer === this.player.x
                  ? grid.gridStates.X_WON
                  : grid.gridStates.O_WON
              );
              console.log(this.currentPlayer + " has won the grid!");
            }
            this.changeCurrentPlayer();
            this.setActiveGrid(gridIndex, cellIndex);
          }
        });
      }
    });
  }
  // handleMouseMove() {
  //   this.gameGrids.forEach((grid) => {
  //     if (grid.currentState === grid.gridStates.ACTIVE) {
  //       grid.cells.forEach((cell) => {
  //         if (cell.currentState === cell.cellStates.EMPTY) {
  //           cell.isHovered(this.input.pointer, this.currentPlayer);
  //         }
  //       });
  //     }
  //   });
  // }
  changeCurrentPlayer() {
    if (this.currentPlayer === this.player.x)
      this.currentPlayer = this.player.o;
    else this.currentPlayer = this.player.x;
  }
  isGameWon() {
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
    //   if (cellA === cellB && cellB === cellC && cellA !== cell.states.empty) {
    //     return true;
    //   }
    // }
  }
  isGameDraw() {
    for (let grid of this.gameGrids) {
      for (let cell of grid.cells) {
        if (cell.currentState === cell.cellStates.EMPTY) {
          return false;
        }
      }
    }
    this.gameDraw = true;
    return true;
  }
  update() {
    this.gameGrids.forEach((grid) => grid.update());
  }
  draw() {
    this.gameGrids.forEach((grid) => grid.draw());
    // if (this.checkWinCondition()) {
    //   this.gameWon = true;
    //   c.fillText(
    //     this.currentPlayer + " has won!",
    //     this.width * 0.5,
    //     this.height * 0.95
    //   );
    // }
    if (this.isGameDraw()) {
      c.fillText("It's a draw!", this.width * 0.5, this.height * 0.95);
    }
  }
}

class Game {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.input = new InputHandler(this);
    this.gameBoard = new GameBoard({
      game: this,
      x: 16,
      y: 32,
      width: this.width - 32,
      height: this.height - 32,
    });
  }
  update() {
    this.gameBoard.update();
  }
  draw() {
    c.save();
    c.fillStyle = "black";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(
      "It is " + this.gameBoard.currentPlayer + "'s Turn",
      this.width * 0.5,
      this.height - this.height + 32
    );
    c.restore();
    this.gameBoard.draw();
  }
}

const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");
canvas.height = window.innerHeight - 64;
canvas.width = canvas.height;

const game = new Game(canvas);

function animationLoop() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  game.update();
  game.draw();
  requestAnimationFrame(animationLoop);
}
requestAnimationFrame(animationLoop);
