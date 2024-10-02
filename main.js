// Define a cell where an x or o can be placed
// Define what state the cell is in (empty, x, o)
// Define the grid where each area is placed (3x3, 4x4, 5x5, etc.)
// Define who's turn it is (x or o, x is the initial turn)
// Define the winning conditions (3/4/5 in a row, column, or diagonal)
// Define the draw condition (all areas filled without a winner)
// Define the winning message
// Define the 'draw' message
// Make a replay button

class InputHandler {
  constructor(game) {
    this.game = game;
    this.canvas = this.game.canvas;
    this.mouse = {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    };
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      //   this.game.StartMenu.buttons.forEach((button) =>
      //     button.update(this.mouse)
      //   );
    });
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      //   this.game.StartMenu.buttons.forEach((button) =>
      //     button.handleClick(this.mouse)
      //   );
    //   this.game.GameGrid.cells.forEach((cell) => cell.changeTurn());
    });
    this.canvas.addEventListener("touchstart", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
      //   this.game.StartMenu.buttons.forEach((button) =>
      //     button.handleClick(this.mouse)
      //   );
    //   this.game.GameGrid.cells.forEach((cell) => cell.update(this.mouse));
    });
  }
}

// class Button {
//   constructor({ game, x, y, width, height, radius, text }) {
//     this.game = game;
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.cornerRadius = radius;
//     this.text = text;
//     this.state = "idle";
//     this.states = ["idle", "hover", "click"];
//     this.bgColor;
//     this.textColor;
//     this.isHovered = false;
//     this.isClicked = false;
//   }
//   changeButtonState() {
//     if (this.isHovered) {
//       this.state = "hover";
//     } else if (this.isClicked) {
//       this.state = "click";
//     } else {
//       this.state = "idle";
//     }
//   }
//   handleButtonState() {
//     switch (this.state) {
//       case "idle":
//         this.bgColor = "#131313";
//         this.textColor = "white";
//         break;
//       case "hover":
//         this.bgColor = "#333333";
//         this.textColor = "teal";
//         break;
//       case "click":
//         this.bgColor = "#444444";
//         this.textColor = "red";
//         break;
//     }
//   }
//   drawRoundedRect(c) {
//     c.fillStyle = this.bgColor;
//     c.beginPath();
//     c.moveTo(this.x + this.cornerRadius, this.y);
//     c.lineTo(this.x + this.width - this.cornerRadius, this.y);
//     c.arcTo(
//       this.x + this.width,
//       this.y,
//       this.x + this.width,
//       this.y + this.cornerRadius,
//       this.cornerRadius
//     );
//     c.lineTo(this.x + this.width, this.y + this.height - this.cornerRadius);
//     c.arcTo(
//       this.x + this.width,
//       this.y + this.height,
//       this.x + this.width - this.cornerRadius,
//       this.y + this.height,
//       this.cornerRadius
//     );
//     c.lineTo(this.x + this.cornerRadius, this.y + this.height);
//     c.arcTo(
//       this.x,
//       this.y + this.height,
//       this.x,
//       this.y + this.height - this.cornerRadius,
//       this.cornerRadius
//     );
//     c.lineTo(this.x, this.y + this.cornerRadius);
//     c.arcTo(
//       this.x,
//       this.y,
//       this.x + this.cornerRadius,
//       this.y,
//       this.cornerRadius
//     );
//     c.closePath();
//     c.fill();
//   }
//   drawText() {
//     c.fillStyle = this.textColor;
//     c.font = "bold 32px Monospace";
//     c.textAlign = "center";
//     c.textBaseline = "middle";
//     c.fillText(
//       this.text,
//       this.x + this.width * 0.5,
//       this.y + this.height * 0.5
//     );
//   }
//   isMouseOver(mouse) {
//     return (
//       mouse.x > this.x &&
//       mouse.x < this.x + this.width &&
//       mouse.y > this.y &&
//       mouse.y < this.y + this.height
//     );
//   }
//   handleClick() {
//     if (this.isHovered) {
//         this.isClicked = true;
//       console.log("Button clicked");
//     } else {
//         this.isClicked = false;
//     }
//   }
//   update(mouse) {
//     this.isHovered = this.isMouseOver(mouse);
//     this.changeButtonState();
//     this.handleButtonState();
//   }
//   draw() {
//     this.drawRoundedRect(c);
//     this.drawText(c);
//   }
// }

// class StartMenu {
//   constructor(game) {
//     this.game = game;
//     this.buttons = [
//       new Button({
//         game: this.game,
//         x: this.game.width * 0.5 - 196,
//         y: this.game.height * 0.4,
//         width: 384,
//         height: 80,
//         radius: 30,
//         text: "Classic",
//       }),
//       new Button({
//         game: this.game,
//         x: this.game.width * 0.5 - 196,
//         y: this.game.height * 0.5,
//         width: 384,
//         height: 80,
//         radius: 30,
//         text: "Ultimate",
//       }),
//       new Button({
//         game: this.game,
//         x: this.game.width * 0.5 - 196,
//         y: this.game.height * 0.6,
//         width: 384,
//         height: 80,
//         radius: 30,
//         text: "Infinite",
//       }),
//     ];
//   }
//   update() {
//     this.buttons.forEach((button) =>
//       button.update(this.game.inputHandler.mouse)
//     );
//   }
//   draw(c) {
//     // Title
//     c.save();
//     c.fillStyle = "#242424";
//     c.font = "bold 64px Monospace";
//     c.textAlign = "center";
//     c.fillText("TIC", this.game.width * 0.5, this.game.height * 0.15);
//     c.fillText("TAC", this.game.width * 0.5, this.game.height * 0.2);
//     c.fillText("TOE", this.game.width * 0.5, this.game.height * 0.25);
//     c.restore();
//     // Buttons
//     this.buttons.forEach((button) => button.draw());
//     // Footer
//     c.save();
//     c.fillStyle = "#242424";
//     c.font = "bold 16px Sans-Serif";
//     c.textAlign = "center";
//     c.fillText(
//       "2024 EDWARD VONSCHONDORF",
//       this.game.width * 0.5,
//       this.game.height * 0.95
//     );
//     c.restore();
//   }
// }

class GameCell {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentTurn = "x";
    this.state = "test";
    this.states = [" ", "x", "o"];
    this.bgColor = "black";
    this.textColor = "white";
  }
  changeTurn() {
    if (this.currentTurn === "x") {
      this.currentTurn = "o";
    } else {
      this.currentTurn = "x";
    }
  }
  changeCellState() {
    if (this.state === "test") {
      this.state = this.currentTurn;
    }
  }
  update() {
    this.changeTurn();
    this.changeCellState();
  }
  draw(c) {
    c.fillStyle = this.bgColor;
    c.lineWidth = 4;
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
  constructor({ game, x, y, width, height, rows, cols }) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
    this.createCells();
  }
  createCells() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.cells.push(
          new GameCell({
            x: this.x + col * this.width,
            y: this.y + row * this.height,
            width: this.width,
            height: this.height,
          })
        );
      }
    }
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.inputHandler = new InputHandler(this);
    this.GameGrid = new GameGrid({
      game: this,
      x: 0,
      y: 0,
      width: this.width / 3,
      height: this.height / 3,
      rows: 3,
      cols: 3,
    });
    // this.StartMenu = new StartMenu(this);
  }
  update() {
    // this.StartMenu.update();
    this.GameGrid.cells.forEach((cell) => cell.update());
  }
  draw(c) {
    // this.StartMenu.draw(c);
    this.GameGrid.cells.forEach((cell) => cell.draw(c));
  }
}

const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth - 64;
canvas.height = window.innerHeight - 64;

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
