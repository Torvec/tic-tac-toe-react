import { InputHandler } from "./InputHandler.js";
import { Board } from "./ultimate.js";
// import { Grid } from "./classic.js"

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.input = new InputHandler(this, this.canvas, (pointer) => {
      this.handlePointerEvent(pointer);
    });
    // this.grid = new Grid(this);
    this.board = new Board(this);
  }
  handlePointerEvent(pointer) {
    // this.grid.handleClick(pointer);
    this.board.handleClick(pointer);
  }
  render(c) {
    // this.grid.update(c);
    // this.grid.draw(c);
    this.board.update(c);
    this.board.draw(c);
  }
}
