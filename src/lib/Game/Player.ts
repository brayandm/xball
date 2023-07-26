class Player {
  public x;
  public y;
  private speedUpX;
  private speedUpY;
  private maxSpeedUp;
  private speedUp;

  constructor({
    x = 0,
    y = 0,
    speedUpX = 0,
    speedUpY = 0,
    maxSpeedUp = 10,
    speedUp = 1,
  }) {
    this.x = x;
    this.y = y;
    this.speedUpX = speedUpX;
    this.speedUpY = speedUpY;
    this.maxSpeedUp = maxSpeedUp;
    this.speedUp = speedUp;
  }

  public press = ({
    up = false,
    down = false,
    left = false,
    right = false,
  }) => {
    if (up) this.speedUpY -= this.speedUp;
    if (down) this.speedUpY += this.speedUp;
    if (left) this.speedUpX -= this.speedUp;
    if (right) this.speedUpX += this.speedUp;

    this.speedUpY = Math.max(
      -this.maxSpeedUp,
      Math.min(this.maxSpeedUp, this.speedUpY),
    );
    this.speedUpX = Math.max(
      -this.maxSpeedUp,
      Math.min(this.maxSpeedUp, this.speedUpX),
    );

    this.x += this.speedUpX;
    this.y += this.speedUpY;

    this.speedUpX *= 0.95;
    this.speedUpY *= 0.95;

    if (Math.abs(this.speedUpX) < 0.5) this.speedUpX = 0;
    if (Math.abs(this.speedUpY) < 0.5) this.speedUpY = 0;
  };

  public move = (x = 0, y = 0) => {
    this.x = x;
    this.y = y;
  };
}

export default Player;
