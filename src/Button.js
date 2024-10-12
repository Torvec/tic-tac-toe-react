const STATE = {
  IDLE: 0,
  HOVER: 1,
};

export class Button {
  constructor({imageSrc, x, y, width, height, text }) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.state = STATE.IDLE;
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
    this.state = newState;
  }
  buttonStates(stateName) {
    switch (stateName) {
      case STATE.IDLE:
        this.color = "#CCCCCC";
        break;
      case STATE.HOVER:
        this.color = "#EEEEEE";
        break;
    }
  }
  update(pointer) {
    if (this.isPointerOver(pointer)) this.setState(STATE.HOVER);
    else this.setState(STATE.IDLE);
    this.buttonStates(this.state);
  }
  draw(c) {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
    // c.save();
    // c.fillStyle = "#404040";
    // c.fillRect(this.x, this.y, this.width, this.height);
    // c.fillStyle = "#CCCCCC";
    // c.textAlign = "center";
    // c.textBaseline = "middle";
    // c.font = "bold 32px Roboto Mono";
    // c.fillText(
    //   this.text,
    //   this.x + this.width * 0.5,
    //   this.y + this.height * 0.5
    // );
    // c.restore();
  }
}
