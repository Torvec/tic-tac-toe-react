import { InputHandler } from "./InputHandler.js";
import { Button } from "./Button.js";

const MENU = {
  MODE: "mode",
  VERSUS: "versus",
};

const MODE = {
  CLASSIC: "classic",
  ULTIMATE: "ultimate",
};

const VERSUS = {
  PVP: "pvp",
  PVC: "pvc",
};

const SELECT_TEXT = {
  MODE: "Select Mode",
  VERSUS: "Select Opponent",
};

export class Menu {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.gameLogo = new Image();
    this.gameLogo.src = "assets/game_logo.png";
    this.myLogo = new Image();
    this.myLogo.src = "assets/logo_bo.png";
    this.input = new InputHandler({
      menu: this,
      canvas: this.canvas,
      onPointerEvent: (pointer) => this.handlePointerEvent(pointer),
    });
    this.buttons = [
      new Button({
        name: "Classic Mode",
        canvas: this.canvas,
        x: this.width * 0.3 - 64,
        y: this.height * 0.5 - 128,
        srcX: 16,
        srcY: 16,
        srcWidth: 256,
        srcHeight: 256,
      }),
      new Button({
        name: "Ultimate Mode",
        canvas: this.canvas,
        x: this.width * 0.5 + 64,
        y: this.height * 0.5 - 128,
        srcX: 16,
        srcY: 288,
        srcWidth: 256,
        srcHeight: 256,
      }),
      new Button({
        name: "Player vs Player",
        canvas: this.canvas,
        x: this.width * 0.3 - 64,
        y: this.height * 0.5,
        srcX: 16,
        srcY: 560,
        srcWidth: 256,
        srcHeight: 256,
      }),
      new Button({
        name: "Player vs Computer",
        canvas: this.canvas,
        x: this.width * 0.5 + 64,
        y: this.height * 0.5,
        srcX: 16,
        srcY: 832,
        srcWidth: 256,
        srcHeight: 256,
      }),
    ];
    this.state = MENU.VERSUS;
  }
  handlePointerEvent(pointer) {
    // Handle button clicks/touches here
  }
  checkPointerOverButtons(pointer) {
    this.buttons.forEach((button) => button.update(pointer));
  }
  setState(newState) {
    this.state = newState;
  }
  header(c) {
    c.drawImage(
      this.gameLogo,
      this.width * 0.5 - 50,
      this.height * 0.01,
      100,
      100
    );
  }
  menuTitle(c, text) {
    c.save();
    c.fillStyle = "black";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = "bold 36px Roboto Mono";
    c.fillText(text, this.width * 0.5, this.height * 0.4);
    c.restore();
  }
  footer(c) {
    c.drawImage(this.myLogo, this.width * 0.4 - 24, this.height - 72, 48, 48);
    c.save();
    c.fillStyle = "black";
    c.textAlign = "left";
    c.textBaseline = "middle";
    c.font = "24px Roboto";
    c.fillText("2024 Edward Vonscondorf", this.width * 0.425, this.height - 64);
    c.fillStyle = "darkorange";
    c.fillText("edward-vonschondorf.dev", this.width * 0.425, this.height - 32);
    c.restore();
  }
  update() {
    // Handle state changes here between MENU.MODE and MENU.VERSUS
    // Handle state changes between IDLE and HOVER for each button
  }
  draw(c) {
    this.header(c);
    if (this.state === MENU.MODE) {
      this.menuTitle(c, SELECT_TEXT.MODE);
      this.buttons[0].draw(c);
      this.buttons[1].draw(c);
    } else if (this.state === MENU.VERSUS) {
      this.menuTitle(c, SELECT_TEXT.VERSUS);
      this.buttons[2].draw(c);
      this.buttons[3].draw(c);
    }
    this.footer(c);
  }
}
