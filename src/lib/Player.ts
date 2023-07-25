import { RefObject } from "react";

class Player {
  public x;
  public y;
  private ref;
  private speedUpX;
  private speedUpY;
  private maxSpeedUp;
  private speedUp;

  constructor(ref: RefObject<HTMLDivElement>) {
    this.x = 0;
    this.y = 0;
    this.speedUpX = 0;
    this.speedUpY = 0;
    this.maxSpeedUp = 10;
    this.speedUp = 1;
    this.ref = ref;
  }

  public moveVector = (vector: boolean[]) => {
    if (vector[0]) this.speedUpY -= this.speedUp;
    if (vector[1]) this.speedUpY += this.speedUp;
    if (vector[2]) this.speedUpX -= this.speedUp;
    if (vector[3]) this.speedUpX += this.speedUp;

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

    if (this.ref.current)
      this.ref.current.style.transform = `translate(${this.x}px, ${this.y}px)`;
  };

  private move = (x: number, y: number) => {
    this.x += x;
    this.y += y;

    if (this.ref.current)
      this.ref.current.style.transform = `translate(${this.x}px, ${this.y}px)`;
  };
}

export default Player;
