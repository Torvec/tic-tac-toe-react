import { InputHandler } from "./InputHandler.js";
import { StartMenu } from "./StartMenu.js";

export class Menu {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.input = new InputHandler(this, this.canvas, (pointer) => {
      this.handlePointerEvent(pointer);
    });
    this.startMenu = new StartMenu(this);
  }
  handlePointerEvent(pointer) {
    this.startMenu.handleClick(pointer);
  }
  gameLogo(c) {
    c.save();
    c.fillStyle = "black";
    c.font = "bold 32px monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("TIC", this.width * 0.5, this.height - this.height + 32);
    c.fillText("TAC", this.width * 0.5, this.height - this.height + 64);
    c.fillText("TOE", this.width * 0.5, this.height - this.height + 96);
    c.restore();
  }
  footer(c) {
    c.save();
    c.fillStyle = "black";
    c.textAlign = "left";
    c.textBaseline = "middle";
    c.font = "bold 24px Arial";
    c.fillText("EV", this.width * 0.4, this.height - 44);
    c.font = "16px Arial";
    c.fillText("2024 Edward Vonscondorf", this.width * 0.44, this.height - 56);
    c.font = "bold 16px Arial";
    c.fillStyle = "darkorange";
    c.fillText("edward-vonschondorf.dev", this.width * 0.44, this.height - 32);
    c.restore();
  }
  render(c) {
    this.gameLogo(c);
    this.startMenu.update(c);
    this.startMenu.draw(c);
    this.footer(c);
  }
}
