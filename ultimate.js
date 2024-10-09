const STATES = {
  PLAYER: {
    X: "X",
    O: "O",
  },
  CELL: {
    E: " ",
    X: "X",
    O: "O",
  },
  GRID: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    X: "X",
    O: "O",
    DRAW: "draw",
  },
  BOARD: {
    PLAY: "play",
    X: "X",
    O: "O",
    DRAW: "draw",
  },
};

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

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
}

class GameCell {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.init();
  }
  init() {
    this.currentState = STATES.CELL.E;
  }
  isPointerOver(pointer) {
    return (
      pointer.x >= this.x &&
      pointer.x <= this.x + this.width &&
      pointer.y >= this.y &&
      pointer.y <= this.y + this.height
    );
  }
  setGameCellState(newState) {
    if (this.currentState === STATES.CELL.E) this.currentState = newState;
  }
  drawCellBorder() {
    c.save();
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.strokeRect(this.x, this.y, this.width, this.height);
    c.restore();
  }
  drawCellBg() {
    c.save();
    if (this.currentState === STATES.CELL.E) c.fillStyle = "lightgray";
    if (this.currentState === STATES.CELL.X) c.fillStyle = "darkblue";
    if (this.currentState === STATES.CELL.O) c.fillStyle = "maroon";
    c.fillRect(this.x, this.y, this.width, this.height);
    c.restore();
  }
  drawCellContent() {
    c.save();
    if (this.currentState === STATES.CELL.X) c.fillStyle = "lightblue";
    if (this.currentState === STATES.CELL.O) c.fillStyle = "pink";
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
  render() {
    this.drawCellBorder();
    this.drawCellBg();
    this.drawCellContent();
  }
}

class GameGrid {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.init();
  }
  init() {
    this.currentState = STATES.GRID.INACTIVE;
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
      this.currentState === STATES.GRID.ACTIVE ||
      this.currentState === STATES.GRID.INACTIVE
    );
  }
  isNotPlayable() {
    return (
      this.currentState === STATES.GRID.X ||
      this.currentState === STATES.GRID.O ||
      this.currentState === STATES.GRID.DRAW
    );
  }
  isGridWon() {
    for (let combination of WINNING_COMBOS) {
      const [a, b, c] = combination;
      const cellA = this.cells[a].currentState;
      const cellB = this.cells[b].currentState;
      const cellC = this.cells[c].currentState;
      if (cellA === cellB && cellB === cellC && cellA !== STATES.CELL.E) {
        return { won: true, winner: cellA };
      }
    }
    return false;
  }
  isGridDraw() {
    return this.cells.every((cell) => cell.currentState !== STATES.CELL.E);
  }
  drawGridState() {
    switch (this.currentState) {
      case STATES.GRID.ACTIVE:
        c.save();
        c.strokeStyle = "rgba(0, 196, 0, 1)";
        c.lineWidth = 5;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case STATES.GRID.X:
        c.save();
        c.fillStyle = "rgba(0, 0, 144, 0.25)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case STATES.GRID.O:
        c.save();
        c.fillStyle = "rgba(144, 0, 0, 0.25)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case STATES.GRID.DRAW:
        c.save();
        c.fillStyle = "rgba(64, 64, 64, 0.25)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
    }
  }
  render() {
    this.cells.forEach((cell) => cell.render());
    this.drawGridState();
  }
}

class GameBoard {
  constructor(game) {
    this.game = game;
    this.input = this.game.input;
    this.x = 16;
    this.y = 32;
    this.width = this.game.width - 32;
    this.height = this.game.height - 64;
    this.init();
  }
  init() {
    this.currentPlayer = null;
    this.setCurrentPlayer();
    this.gameGrids = [];
    this.setupGameBoard();
    this.setGameBoardState(STATES.BOARD.PLAY);
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

  //! BUG: If a player makes a winning move in a grid where the cell corresponds to the same grid (i.e. cell 6, in grid 6) it does not activate all playable grids like it does if you make a winning move in a grid that corresponds to an unplayable grid (i.e. cell 6, in grid 7 where grid 6 is already won)
  //? Will probably need to completely refactor this method to make everything work as intended
  setActiveGrid(prevIndex, newIndex) {
    const nextGrid = this.gameGrids[newIndex];
    const prevGrid = this.gameGrids[prevIndex];
    // Deactivates all active grids after a move where all playable grids were activated
    this.gameGrids.forEach((grid) => {
      if (grid.currentState === STATES.GRID.ACTIVE) {
        grid.setGameGridState(STATES.GRID.INACTIVE);
      }
    });
    // Activates all inactive grids after a move where the cell corresponded to an unplayable grid
    if (nextGrid.isNotPlayable()) {
      this.gameGrids.forEach((grid) => {
        if (grid.currentState === STATES.GRID.INACTIVE) {
          grid.setGameGridState(STATES.GRID.ACTIVE);
        }
      });
      // Activates the grid corresponding to the cell that was clicked if it was playable
    } else if (nextGrid.isPlayable()) {
      nextGrid.setGameGridState(STATES.GRID.ACTIVE);
    }
    // Activates all inactive grids after a winning move is made where the cell corresponds to the same grid (example: cell 6, in grid 6)
    if (prevIndex === newIndex) {
      if (prevGrid.isNotPlayable()) {
        this.gameGrids.forEach((grid) => {
          if (grid.currentState === STATES.GRID.INACTIVE) {
            grid.setGameGridState(STATES.GRID.ACTIVE);
          }
        });
      }
    }
    // Deactivates the previously active grid if it is not the same as the newly active grid
    if (prevIndex !== null && prevIndex !== newIndex) {
      prevGrid.setGameGridState(STATES.GRID.INACTIVE);
    }
  }
  handleClick() {
    this.gameGrids.forEach((grid, gridIndex) => {
      if (grid.currentState === STATES.GRID.ACTIVE) {
        grid.cells.forEach((cell, cellIndex) => {
          if (cell.isPointerOver(this.input.pointer)) {
            cell.setGameCellState(STATES.CELL[this.currentPlayer]);
            this.setActiveGrid(gridIndex, cellIndex);
            this.setCurrentPlayer();
          }
        });
      }
    });
  }
  checkForGridWinOrDraw(grid) {
    if (
      grid.currentState === STATES.GRID.ACTIVE ||
      grid.currentState === STATES.GRID.INACTIVE
    ) {
      const { won, winner } = grid.isGridWon();
      if (won) {
        grid.setGameGridState(STATES.GRID[winner]);
      } else if (grid.isGridDraw()) {
        grid.setGameGridState(STATES.GRID.DRAW);
      }
    }
  }
  checkForGameWinOrDraw() {
    const { won, winner } = this.isGameWon();
    if (won) {
      this.setGameBoardState(STATES.BOARD[winner]);
      return;
    } else if (this.isGameDraw()) {
      this.setGameBoardState(STATES.BOARD.DRAW);
      return;
    }
  }
  setCurrentPlayer() {
    if (this.currentPlayer === null) {
      this.currentPlayer =
        Math.random() <= 0.5 ? STATES.PLAYER.X : STATES.PLAYER.O;
    } else if (this.currentPlayer === STATES.PLAYER.X) {
      this.currentPlayer = STATES.PLAYER.O;
    } else if (this.currentPlayer === STATES.PLAYER.O) {
      this.currentPlayer = STATES.PLAYER.X;
    }
  }
  isGameWon() {
    for (let combination of WINNING_COMBOS) {
      const [a, b, c] = combination;
      const gridA = this.gameGrids[a].currentState;
      const gridB = this.gameGrids[b].currentState;
      const gridC = this.gameGrids[c].currentState;
      if (
        gridA === gridB &&
        gridB === gridC &&
        gridA !== STATES.GRID.INACTIVE &&
        gridA !== STATES.GRID.ACTIVE
      ) {
        return { won: true, winner: gridA };
      }
    }
    return false;
  }
  isGameDraw() {
    return this.gameGrids.every((grid) => grid.isNotPlayable());
  }
  displayCurrentPlayer() {
    c.save();
    c.fillStyle = "black";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(
      "It is " + this.currentPlayer + "'s Turn",
      this.width * 0.5,
      this.height - this.height + 32
    );
    c.restore();
  }
  displayWinningPlayer(winner) {
    c.save();
    c.fillStyle = "black";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(winner + " has won!", this.width * 0.5, this.height - 32);
  }
  displayDrawMessage() {
    c.save();
    c.fillStyle = "black";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("It's a draw!", this.width * 0.5, this.height - 32);
    c.restore();
  }
  render() {
    this.displayCurrentPlayer();
    this.gameGrids.forEach((grid) => {
      this.checkForGridWinOrDraw(grid);
      this.checkForGameWinOrDraw();
      grid.render();
    });
    const { won, winner } = this.isGameWon();
    if (won) this.displayWinningPlayer(winner);
    if (this.isGameDraw()) this.displayDrawMessage();
  }
}

class Game {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.input = new InputHandler(this);
    this.gameBoard = new GameBoard(this);
  }
  render() {
    this.gameBoard.render();
  }
}

const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = canvas.height;

const game = new Game(canvas);

function animationLoop() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  game.render();
  requestAnimationFrame(animationLoop);
}
requestAnimationFrame(animationLoop);
