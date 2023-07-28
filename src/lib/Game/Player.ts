class Player {
  public id;
  public x;
  public y;
  public speedUpX;
  public speedUpY;
  private maxSpeedUp;
  private speedUp;
  private minX;
  private maxX;
  private minY;
  private maxY;
  private playerWidth;
  private playerHeight;
  private reboundLoss = 0.8;

  constructor({
    id,
    x = 0,
    y = 0,
    speedUpX = 0,
    speedUpY = 0,
    maxSpeedUp = 10,
    speedUp = 0.1,
    minX,
    maxX,
    minY,
    maxY,
    playerWidth,
    playerHeight,
  }: {
    id: string;
    x?: number;
    y?: number;
    speedUpX?: number;
    speedUpY?: number;
    maxSpeedUp?: number;
    speedUp?: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    playerWidth: number;
    playerHeight: number;
  }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.speedUpX = speedUpX;
    this.speedUpY = speedUpY;
    this.maxSpeedUp = maxSpeedUp;
    this.speedUp = speedUp;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.playerWidth = playerWidth;
    this.playerHeight = playerHeight;
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

    this.x = Math.max(
      this.minX + this.playerWidth / 2,
      Math.min(this.maxX - this.playerWidth / 2, this.x),
    );
    this.y = Math.max(
      this.minY + this.playerHeight / 2,
      Math.min(this.maxY - this.playerHeight / 2, this.y),
    );

    if (
      this.x == this.minX + this.playerWidth / 2 ||
      this.x == this.maxX - this.playerWidth / 2
    ) {
      this.speedUpX = -this.speedUpX * this.reboundLoss;
    }

    if (
      this.y == this.minY + this.playerHeight / 2 ||
      this.y == this.maxY - this.playerHeight / 2
    ) {
      this.speedUpY = -this.speedUpY * this.reboundLoss;
    }

    if (this.speedUpX > 0) {
      this.speedUpX = Math.max(0, this.speedUpX - this.speedUp / 2);
    } else if (this.speedUpX < 0) {
      this.speedUpX = Math.min(0, this.speedUpX + this.speedUp / 2);
    }

    if (this.speedUpY > 0) {
      this.speedUpY = Math.max(0, this.speedUpY - this.speedUp / 2);
    } else if (this.speedUpY < 0) {
      this.speedUpY = Math.min(0, this.speedUpY + this.speedUp / 2);
    }

    if (Math.abs(this.speedUpX) < 0.01) this.speedUpX = 0;
    if (Math.abs(this.speedUpY) < 0.01) this.speedUpY = 0;
  };

  public move = (x = 0, y = 0) => {
    this.x = x;
    this.y = y;
  };
}

export default Player;
