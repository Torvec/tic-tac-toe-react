// TODO: Make buttons clickable
// TODO: Add a hover state to buttons, mouseover event
// TODO: Add a click state to buttons, click event, touchstart event
// TODO: Add a player select screen so you can choose to play an AI or another player
// TODO: Randomize who get X or O, X always goes first
// TODO:

// const checkCollision = (mouse, box) => {
//   return (
//     mouse.position.x < box.position.x + box.width &&
//     mouse.position.x + mouse.width > box.position.x &&
//     mouse.position.y < box.position.y + box.height &&
//     mouse.position.y + mouse.height > box.position.y
//   );
// };

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
      this.game.StartMenu.buttons.forEach((button) =>
        button.update(this.mouse)
      );
    });
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.game.StartMenu.buttons.forEach((button) => button.handleClick());
    });
    this.canvas.addEventListener("touchstart", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
      this.game.StartMenu.buttons.forEach((button) => button.handleClick());
    });
  }
}

// Need to be able to set the following properties for each button
// x position, y, position, width, height, corner radius, background color, text
// Text will always be centered in the button horizontally and vertically
// Text color will be white in idle state, blue in hover state, and red in click/touch state
class Button {
  constructor({ game, x, y, width, height, radius, bgColor, text }) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cornerRadius = radius;
    this.bgColor = bgColor;
    this.text = text;
    this.isHovered = false;
    this.isClicked = false;
  }
  drawRoundedRect(c) {
    c.fillStyle = this.bgColor;
    c.beginPath();
    c.moveTo(this.x + this.cornerRadius, this.y);
    c.lineTo(this.x + this.width - this.cornerRadius, this.y);
    c.arcTo(
      this.x + this.width,
      this.y,
      this.x + this.width,
      this.y + this.cornerRadius,
      this.cornerRadius
    );
    c.lineTo(this.x + this.width, this.y + this.height - this.cornerRadius);
    c.arcTo(
      this.x + this.width,
      this.y + this.height,
      this.x + this.width - this.cornerRadius,
      this.y + this.height,
      this.cornerRadius
    );
    c.lineTo(this.x + this.cornerRadius, this.y + this.height);
    c.arcTo(
      this.x,
      this.y + this.height,
      this.x,
      this.y + this.height - this.cornerRadius,
      this.cornerRadius
    );
    c.lineTo(this.x, this.y + this.cornerRadius);
    c.arcTo(
      this.x,
      this.y,
      this.x + this.cornerRadius,
      this.y,
      this.cornerRadius
    );
    c.closePath();
    c.fill();
  }
  drawText() {
    c.fillStyle = "white";
    c.font = "bold 32px Monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(
      this.text,
      this.x + this.width * 0.5,
      this.y + this.height * 0.5
    );
  }
  isMouseOver(mouse) {
    return (
      mouse.x > this.x &&
      mouse.x < this.x + this.width &&
      mouse.y > this.y &&
      mouse.y < this.y + this.height
    );
  }
  handleClick() {
    if (this.isHovered) {
      console.log(this.isHovered);
      console.log(`Button ${this.text} clicked`);
    }
  }
  update(mouse) {
    this.isHovered = this.isMouseOver(mouse);
  }
  draw() {
    this.drawRoundedRect(c);
    this.drawText(c);
  }
}

class StartMenu {
  constructor(game) {
    this.game = game;
    this.buttons = [
      new Button({
        game: this.game,
        x: this.game.width * 0.5 - 196,
        y: this.game.height * 0.4,
        width: 384,
        height: 80,
        radius: 30,
        bgColor: "#131313",
        text: "Classic",
      }),
      new Button({
        game: this.game,
        x: this.game.width * 0.5 - 196,
        y: this.game.height * 0.5,
        width: 384,
        height: 80,
        radius: 30,
        bgColor: "#131313",
        text: "Ultimate",
      }),
      new Button({
        game: this.game,
        x: this.game.width * 0.5 - 196,
        y: this.game.height * 0.6,
        width: 384,
        height: 80,
        radius: 30,
        bgColor: "#131313",
        text: "Infinite",
      }),
    ];
  }
  update() {
    this.buttons.forEach((button) =>
      button.update(this.game.inputHandler.mouse)
    );
  }
  draw(c) {
    // Title
    c.save();
    c.fillStyle = "#242424";
    c.font = "bold 64px Monospace";
    c.textAlign = "center";
    c.fillText("TIC", this.game.width * 0.5, this.game.height * 0.15);
    c.fillText("TAC", this.game.width * 0.5, this.game.height * 0.2);
    c.fillText("TOE", this.game.width * 0.5, this.game.height * 0.25);
    c.restore();
    // Buttons
    this.buttons.forEach((button) => button.draw());
    // Footer
    c.save();
    c.fillStyle = "#242424";
    c.font = "bold 16px Sans-Serif";
    c.textAlign = "center";
    c.fillText(
      "2024 EDWARD VONSCHONDORF",
      this.game.width * 0.5,
      this.game.height * 0.95
    );
    c.restore();
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.inputHandler = new InputHandler(this);
    this.StartMenu = new StartMenu(this);
  }
  update() {
    this.StartMenu.update();
  }
  draw(c) {
    this.StartMenu.draw(c);
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
