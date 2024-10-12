const STATE = {
  IDLE: "idle",
  HOVER: "hover",
};

export class Button {
  constructor({ canvas, name, x, y, srcX, srcY, srcWidth, srcHeight }) {
    this.name = name;
    this.canvas = canvas;
    this.image = new Image();
    this.image.src = "assets/buttons.png";
    this.position = { x: x, y: y };
    this.source = { x: srcX, y: srcY, width: srcWidth, height: srcHeight };
    this.state = STATE.IDLE;
  }
  isPointerOver(pointer) {
    return (
      pointer.x >= this.position.x &&
      pointer.x <= this.position.x + this.source.width &&
      pointer.y >= this.position.y &&
      pointer.y <= this.position.y + this.source.height
    );
  }
  setState(newState) {
    this.state = newState;
  }
  buttonStates(stateName) {
    switch (stateName) {
      case STATE.IDLE:
        this.source.x = 16;
        this.canvas.style.cursor = "default";
        break;
      case STATE.HOVER:
        this.source.x = this.source.width + 32;
        this.canvas.style.cursor = "pointer";
        break;
    }
  }
  update(pointer) {
    if (this.isPointerOver(pointer)) this.setState(STATE.HOVER);
    else this.setState(STATE.IDLE);
    this.buttonStates(this.state);
  }
  draw(c) {
    c.drawImage(
      this.image,
      this.source.x,
      this.source.y,
      this.source.width,
      this.source.height,
      this.position.x,
      this.position.y,
      this.source.width,
      this.source.height
    );
  }
}
