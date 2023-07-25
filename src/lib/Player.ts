import { RefObject } from "react";

class Player {
  private X;
  private Y;
  private ref;
  private speed;

  constructor(ref: RefObject<HTMLDivElement>, speed = 10) {
    this.X = 0;
    this.Y = 0;
    this.ref = ref;
    this.speed = speed;
  }

  public moveUp = () => {
    this.move(0, -this.speed);
  };

  public moveDown = () => {
    this.move(0, this.speed);
  };

  public moveLeft = () => {
    this.move(-this.speed, 0);
  };

  public moveRight = () => {
    this.move(this.speed, 0);
  };

  private move = (x: number, y: number) => {
    this.X += x;
    this.Y += y;

    if (this.ref.current)
      this.ref.current.style.transform = `translate(${this.X}px, ${this.Y}px)`;
  };
}

export default Player;
