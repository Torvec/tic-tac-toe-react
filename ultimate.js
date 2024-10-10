const PLAYER = {
  X: "X",
  O: "O",
};

const CELL = {
  INIT: " ",
  INIT_BG: "lightgray",
  X: PLAYER.X,
  X_BG: "darkblue",
  X_COLOR: "lightblue",
  O: PLAYER.O,
  O_BG: "maroon",
  O_COLOR: "pink",
};

const GRID = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  X: PLAYER.X,
  O: PLAYER.O,
  DRAW: "draw",
};

const BOARD = {
  INIT: "init",
  X: PLAYER.X,
  O: PLAYER.O,
  DRAW: "draw",
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
    this.game.board.handleClick();
  }
  handleTouchStartEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    this.pointer.x = touch.clientX - rect.left;
    this.pointer.y = touch.clientY - rect.top;
    this.game.board.handleClick();
  }
}

class Cell {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.init();
  }
  init() {
    this.currentState = CELL.INIT;
  }
  isPointerOver(pointer) {
    return (
      pointer.x >= this.x &&
      pointer.x <= this.x + this.width &&
      pointer.y >= this.y &&
      pointer.y <= this.y + this.height
    );
  }
  setCellState(newState) {
    if (this.currentState === CELL.INIT) this.currentState = newState;
  }
  render() {
    // Cell Border
    c.save();
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.strokeRect(this.x, this.y, this.width, this.height);
    c.restore();
    // Cell Background
    c.save();
    if (this.currentState === CELL.INIT) c.fillStyle = "lightgray";
    if (this.currentState === CELL.X) c.fillStyle = "darkblue";
    if (this.currentState === CELL.O) c.fillStyle = "maroon";
    c.fillRect(this.x, this.y, this.width, this.height);
    c.restore();
    // Cell Content
    c.save();
    if (this.currentState === CELL.X) c.fillStyle = "lightblue";
    if (this.currentState === CELL.O) c.fillStyle = "pink";
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

class Grid {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.init();
  }
  init() {
    this.currentState = GRID.INACTIVE;
    this.cells = [];
    this.setupGrid();
  }
  setupGrid() {
    const padding = 10;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.cells.push(
          new Cell({
            x: this.x + padding + (col * (this.width - 2 * padding)) / 3,
            y: this.y + padding + (row * (this.height - 2 * padding)) / 3,
            width: (this.width - 2 * padding) / 3,
            height: (this.height - 2 * padding) / 3,
          })
        );
      }
    }
  }
  setGridState(newState) {
    this.currentState = newState;
  }
  isPlayable() {
    return (
      this.currentState === GRID.ACTIVE || this.currentState === GRID.INACTIVE
    );
  }
  isNotPlayable() {
    return (
      this.currentState === GRID.X ||
      this.currentState === GRID.O ||
      this.currentState === GRID.DRAW
    );
  }
  isGridWon() {
    for (let combination of WINNING_COMBOS) {
      const [a, b, c] = combination;
      const cellA = this.cells[a].currentState;
      const cellB = this.cells[b].currentState;
      const cellC = this.cells[c].currentState;
      if (cellA === cellB && cellB === cellC && cellA !== CELL.INIT) {
        return { won: true, winner: cellA };
      }
    }
    return false;
  }
  isGridDraw() {
    return this.cells.every((cell) => cell.currentState !== CELL.INIT);
  }
  render() {
    this.cells.forEach((cell) => cell.render());
    switch (this.currentState) {
      case GRID.ACTIVE:
        c.save();
        c.strokeStyle = "rgba(0, 196, 0, 1)";
        c.lineWidth = 5;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case GRID.X:
        c.save();
        c.fillStyle = "rgba(0, 0, 144, 0.25)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case GRID.O:
        c.save();
        c.fillStyle = "rgba(144, 0, 0, 0.25)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
      case GRID.DRAW:
        c.save();
        c.fillStyle = "rgba(64, 64, 64, 0.25)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.restore();
        break;
    }
  }
}

class Board {
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
    this.grids = [];
    this.setupBoard();
    this.setBoardState(BOARD.INIT);
    this.setActiveGrid({ prevIndex: 4, newIndex: 4 });
  }
  setupBoard() {
    const padding = 10;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.grids.push(
          new Grid({
            x: this.x + padding + (col * (this.width - 2 * padding)) / 3,
            y: this.y + padding + (row * (this.height - 2 * padding)) / 3,
            width: (this.width - 2 * padding) / 3,
            height: (this.height - 2 * padding) / 3,
          })
        );
      }
    }
  }
  setBoardState(newState) {
    this.currentState = newState;
  }
  setActiveGrid({ prevIndex, newIndex }) {
    const nextGrid = this.grids[newIndex];
    const prevGrid = this.grids[prevIndex];
    this.grids.forEach((grid) => {
      if (grid.currentState === GRID.ACTIVE)
        grid.setGridState(GRID.INACTIVE);
    });
    if (nextGrid.isNotPlayable()) {
      this.grids.forEach((grid) => {
        if (grid.currentState === GRID.INACTIVE) grid.setGridState(GRID.ACTIVE);
      });
    } else if (nextGrid.isPlayable()) nextGrid.setGridState(GRID.ACTIVE);
    if (prevGrid !== nextGrid && nextGrid.isPlayable())
      prevGrid.setGridState(GRID.INACTIVE);
  }
  handleClick() {
    this.grids.forEach((grid, gridIndex) => {
      if (grid.currentState === GRID.ACTIVE) {
        grid.cells.forEach((cell, cellIndex) => {
          if (cell.isPointerOver(this.input.pointer)) {
            cell.setCellState(CELL[this.currentPlayer]);
            this.setActiveGrid({ prevIndex: gridIndex, newIndex: cellIndex });
            this.setCurrentPlayer();
          }
        });
      }
    });
  }
  handleGridStateChange(grid) {
    if (
      grid.currentState === GRID.ACTIVE ||
      grid.currentState === GRID.INACTIVE
    ) {
      const { won, winner } = grid.isGridWon();
      if (won) {
        grid.setGridState(GRID[winner]);
        return;
      } else if (grid.isGridDraw()) grid.setGridState(GRID.DRAW);
    }
  }
  handleBoardStateChange() {
    const { won, winner } = this.isBoardWon();
    if (won) this.setBoardState(BOARD[winner]);
    else if (this.isBoardDraw()) this.setBoardState(BOARD.DRAW);
  }
  setCurrentPlayer() {
    if (this.currentPlayer === null)
      this.currentPlayer = Math.random() <= 0.5 ? PLAYER.X : PLAYER.O;
    else if (this.currentPlayer === PLAYER.X) this.currentPlayer = PLAYER.O;
    else if (this.currentPlayer === PLAYER.O) this.currentPlayer = PLAYER.X;
  }
  isBoardWon() {
    for (let combination of WINNING_COMBOS) {
      const [a, b, c] = combination;
      const gridA = this.grids[a].currentState;
      const gridB = this.grids[b].currentState;
      const gridC = this.grids[c].currentState;
      if (
        gridA === gridB &&
        gridB === gridC &&
        gridA !== GRID.INACTIVE &&
        gridA !== GRID.ACTIVE
      ) {
        return { won: true, winner: gridA };
      }
    }
    return false;
  }
  isBoardDraw() {
    return this.grids.every((grid) => grid.isNotPlayable());
  }
  render() {
    // Game and Grid state checks
    this.grids.forEach((grid) => {
      this.handleGridStateChange(grid);
      this.handleBoardStateChange();
      grid.render();
    });
    c.save();
    c.fillStyle = "white";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    // Current Player
    c.fillText(
      "It is " + this.currentPlayer + "'s Turn",
      this.width * 0.5,
      this.height - this.height + 32
    );
    // Winner Message
    const { won, winner } = this.isBoardWon();
    if (won) c.fillText(winner + " has won!", this.width * 0.5, this.height);
    // Draw Message
    else if (this.isBoardDraw())
      c.fillText("It's a draw!", this.width * 0.5, this.height - 32);
    c.restore();
  }
}

class Game {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.input = new InputHandler(this);
    this.board = new Board(this);
  }
  render() {
    this.board.render();
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
