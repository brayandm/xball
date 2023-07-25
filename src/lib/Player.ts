import { RefObject } from "react";

class Player {
  private X;
  private Y;
  private ref;
  private speedUpX;
  private speedUpY;
  private maxSpeedUp;
  private speedUp;

  constructor(ref: RefObject<HTMLDivElement>) {
    this.X = 0;
    this.Y = 0;
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

    this.X += this.speedUpX;
    this.Y += this.speedUpY;

    this.speedUpX *= 0.95;
    this.speedUpY *= 0.95;

    if (this.ref.current)
      this.ref.current.style.transform = `translate(${this.X}px, ${this.Y}px)`;
  };

  private move = (x: number, y: number) => {
    this.X += x;
    this.Y += y;

    if (this.ref.current)
      this.ref.current.style.transform = `translate(${this.X}px, ${this.Y}px)`;
  };
}

export default Player;
