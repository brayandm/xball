import Player from "./Player";

class PlayerComponent {
  private player: Player;
  private domElement: HTMLElement;
  private isControllable: boolean;
  private onUpdatePosition: (x: number, y: number) => void;
  private playerWidth = 70;
  private playerHeight = 70;
  private minX;
  private maxX;
  private minY;
  private maxY;

  private ketSet: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  };

  public isItControllable() {
    return this.isControllable;
  }

  public getX() {
    return this.player.x;
  }

  public getY() {
    return this.player.y;
  }

  public getId() {
    return this.player.id;
  }

  public getPosition() {
    return {
      x: this.getX(),
      y: this.getY(),
    };
  }

  public updatePosition(x: number, y: number) {
    this.player.x = x;
    this.player.y = y;

    this.refresh();
  }

  constructor({
    id,
    x,
    y,
    isControllable = false,
    onUpdatePosition = () => {
      return;
    },
    parentComponent,
    minX,
    maxX,
    minY,
    maxY,
  }: {
    id: string;
    x: number;
    y: number;
    isControllable?: boolean;
    onUpdatePosition?: (x: number, y: number) => void;
    parentComponent: HTMLElement;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  }) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;

    this.player = new Player({
      id,
      x,
      y,
      minX,
      maxX,
      minY,
      maxY,
      playerWidth: this.playerWidth,
      playerHeight: this.playerHeight,
    });
    this.isControllable = isControllable;
    this.ketSet = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.onUpdatePosition = onUpdatePosition;

    this.domElement = document.createElement("div");
    this.refresh();

    if (this.isControllable) {
      this.domElement.style.position = "fixed";
      this.domElement.style.left = `calc(50% - ${this.playerWidth / 2}px)`;
      this.domElement.style.top = `calc(50% - ${this.playerHeight / 2}px)`;
      document.body.appendChild(this.domElement);
    } else {
      parentComponent.appendChild(this.domElement);
    }

    this.domElement.classList.add("player");

    if (this.isControllable) {
      window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" || event.key.toLowerCase() === "w")
          this.ketSet.up = true;
        if (event.key === "ArrowDown" || event.key.toLowerCase() === "s")
          this.ketSet.down = true;
        if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a")
          this.ketSet.left = true;
        if (event.key === "ArrowRight" || event.key.toLowerCase() === "d")
          this.ketSet.right = true;
      });

      window.addEventListener("keyup", (event) => {
        if (event.key === "ArrowUp" || event.key.toLowerCase() === "w")
          this.ketSet.up = false;
        if (event.key === "ArrowDown" || event.key.toLowerCase() === "s")
          this.ketSet.down = false;
        if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a")
          this.ketSet.left = false;
        if (event.key === "ArrowRight" || event.key.toLowerCase() === "d")
          this.ketSet.right = false;
      });

      setInterval(() => {
        this.press();
        this.onUpdatePosition(this.player.x, this.player.y);
      }, 1000 / 60);
    }
  }

  private refresh() {
    if (!this.isControllable) {
      this.domElement.style.transform = `translate(${
        this.player.x - this.playerWidth / 2
      }px, ${this.player.y - this.playerHeight / 2}px)`;
    }
  }

  private press() {
    this.player.press(this.ketSet);
    this.refresh();
  }

  public update(x: number, y: number) {
    this.player.move(x, y);
    this.refresh();
  }

  public setOnUpdatePosition(onUpdatePosition: (x: number, y: number) => void) {
    this.onUpdatePosition = onUpdatePosition;
  }

  public destroy() {
    this.domElement.remove();
  }
}

export default PlayerComponent;
