const PLAYER = {
  X: "X",
  O: "O",
};

const CELL = {
  INIT: " ",
  X: PLAYER.X,
  O: PLAYER.O,
};

const GRID = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  X: PLAYER.X,
  O: PLAYER.O,
  DRAW: "draw",
};

const BOARD = {
  PLAY: "play",
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
    this.state = CELL.INIT;
  }
  isPointerOver(pointer) {
    return (
      pointer.x >= this.x &&
      pointer.x <= this.x + this.width &&
      pointer.y >= this.y &&
      pointer.y <= this.y + this.height
    );
  }
  setState(newState) {
    if (this.state === CELL.INIT) this.state = newState;
  }
  update() {}
  draw() {
    // Cell Border
    c.save();
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.strokeRect(this.x, this.y, this.width, this.height);
    c.restore();
    // Cell Background
    c.save();
    if (this.state === CELL.INIT) c.fillStyle = "lightgray";
    if (this.state === CELL.X) c.fillStyle = "darkblue";
    if (this.state === CELL.O) c.fillStyle = "maroon";
    c.fillRect(this.x, this.y, this.width, this.height);
    c.restore();
    // Cell Content
    c.save();
    if (this.state === CELL.X) c.fillStyle = "lightblue";
    if (this.state === CELL.O) c.fillStyle = "pink";
    c.font = "bold 64px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(
      this.state,
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
    this.state = GRID.INACTIVE;
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
  setState(newState) {
    this.state = newState;
  }
  isPlayable() {
    return this.state === GRID.ACTIVE || this.state === GRID.INACTIVE;
  }
  isNotPlayable() {
    return (
      this.state === GRID.X || this.state === GRID.O || this.state === GRID.DRAW
    );
  }
  isGridWon() {
    for (let combination of WINNING_COMBOS) {
      const [a, b, c] = combination;
      const cellA = this.cells[a].state;
      const cellB = this.cells[b].state;
      const cellC = this.cells[c].state;
      if (cellA === cellB && cellB === cellC && cellA !== CELL.INIT) {
        return { won: true, winner: cellA };
      }
    }
    return { wond: false, winner: null };
  }
  isGridDraw() {
    return this.cells.every((cell) => cell.state !== CELL.INIT);
  }
  handleGridStateChange() {
    const { won, winner } = this.isGridWon();
    if (won) this.setState(GRID[winner]);
    else if (this.isGridDraw()) this.setState(GRID.DRAW);
  }
  update() {
    this.cells.forEach((cell) => cell.update());
    this.handleGridStateChange();
  }
  draw() {
    this.cells.forEach((cell) => cell.draw());
    switch (this.state) {
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
    this.player = null;
    this.setCurrentPlayer();
    this.grids = [];
    this.setupBoard();
    this.setState(BOARD.PLAY);
    this.setActiveGrid(4, 4);
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
  setState(newState) {
    this.state = newState;
  }
  setCurrentPlayer() {
    if (this.player === null)
      this.player = Math.random() <= 0.5 ? PLAYER.X : PLAYER.O;
    else if (this.player === PLAYER.X) this.player = PLAYER.O;
    else if (this.player === PLAYER.O) this.player = PLAYER.X;
  }
  handleClick() {
    this.grids.forEach((grid, gridIndex) => {
      if (grid.state === GRID.ACTIVE && !this.game.gameOver) {
        grid.cells.forEach((cell, cellIndex) => {
          if (cell.isPointerOver(this.input.pointer)) {
            cell.setState(CELL[this.player]);
            grid.handleGridStateChange();
            this.handleBoardStateChange();
            if (this.game.gameOver) return;
            this.setActiveGrid(gridIndex, cellIndex);
            this.setCurrentPlayer();
          }
        });
      }
    });
  }
  setActiveGrid(prevIndex, newIndex) {
    const nextGrid = this.grids[newIndex];
    const prevGrid = this.grids[prevIndex];
    this.grids.forEach((grid) => {
      if (grid.state === GRID.ACTIVE) grid.setState(GRID.INACTIVE);
    });
    if (prevGrid === nextGrid) {
      if (nextGrid.isNotPlayable()) {
        this.grids.forEach((grid) => {
          if (grid.state === GRID.INACTIVE) grid.setState(GRID.ACTIVE);
        });
      } else if (nextGrid.isPlayable()) {
        nextGrid.setState(GRID.ACTIVE);
      }
    } else {
      if (prevGrid.isPlayable()) prevGrid.setState(GRID.INACTIVE);
      if (nextGrid.isNotPlayable()) {
        this.grids.forEach((grid) => {
          if (grid.state === GRID.INACTIVE) grid.setState(GRID.ACTIVE);
        });
      } else if (nextGrid.isPlayable()) {
        nextGrid.setState(GRID.ACTIVE);
      }
    }
  }
  isBoardWon(grid) {
    for (let combination of WINNING_COMBOS) {
      const [a, b, c] = combination;
      const gridA = grid[a].state;
      const gridB = grid[b].state;
      const gridC = grid[c].state;
      if (
        gridA === gridB &&
        gridB === gridC &&
        gridA !== GRID.INACTIVE &&
        gridA !== GRID.ACTIVE
      ) {
        return { won: true, winner: gridA };
      }
    }
    return { won: false, winner: null };
  }
  isBoardDraw(grid) {
    return grid.every((grids) => grids.isNotPlayable());
  }
  handleBoardStateChange() {
    const { won, winner } = this.isBoardWon(this.grids);
    if (won) {
      this.setState(BOARD[winner]);
      this.game.gameOver = true;
    } else if (this.isBoardDraw(this.grids)) {
      this.setState(BOARD.DRAW);
      this.game.gameOver = true;
    }
  }

  update() {
    this.grids.forEach((grid) => grid.update());
  }
  draw() {
    this.grids.forEach((grid) => grid.draw());
    c.save();
    c.fillStyle = "white";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    // Current Player
    c.fillText(
      "It is " + this.player + "'s Turn",
      this.width * 0.5,
      this.height - this.height + 32
    );
    // Winner Message
    const { won, winner } = this.isBoardWon(this.grids);
    if (won) c.fillText(winner + " has won!", this.width * 0.5, this.height);
    // Draw Message
    else if (this.isBoardDraw(this.grids))
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
    this.gameOver = false;
  }
  render() {
    this.board.update();
    this.board.draw();
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
animationLoop();
