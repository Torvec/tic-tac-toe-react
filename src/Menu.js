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
    this.input = new InputHandler(this, this.canvas, (pointer) => {
      this.handlePointerEvent(pointer);
    });
    this.buttons = [
      new Button({
        imageSrc: "assets/classic_mode_button.png",
        x: this.width * 0.35 - 128,
        y: this.height * 0.5,
        width: 256,
        height: 256,
      }),
      new Button({
        imageSrc: "assets/ultimate_mode_button.png",
        x: this.width * 0.65 - 128,
        y: this.height * 0.5,
        width: 256,
        height: 256,
      }),
      new Button({
        imageSrc: "assets/pvp_button.png",
        x: this.width * 0.35 - 100,
        y: this.height * 0.5 - 50,
        width: 256,
        height: 256,
      }),
      new Button({
        imageSrc: "assets/pvc_button.png",
        x: this.width * 0.65 - 100,
        y: this.height * 0.5 - 50,
        width: 256,
        height: 256,
      }),
    ];
    this.state = MENU.VERSUS;
  }
  handlePointerEvent(pointer) {
    // Handle button clicks/touches here
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
  }
  draw(c) {
    this.header(c);
    if (this.state === MENU.MODE) {
      this.menuTitle(c, SELECT_TEXT.MODE);
      for (let i = 0; i < 2; i++) {
        this.buttons[i].draw(c);
      }
    } else if (this.state === MENU.VERSUS) {
      this.menuTitle(c, SELECT_TEXT.VERSUS);
      for (let i = 2; i < this.buttons.length; i++) {
        this.buttons[i].draw(c);
      }
    }
    this.footer(c);
  }
}
