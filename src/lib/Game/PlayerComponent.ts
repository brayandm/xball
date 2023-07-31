import Player from "./Player";

class PlayerComponent {
  private player: Player;
  private domElement: HTMLElement;
  private isControllable: boolean;
  private onUpdatePosition: (x: number, y: number) => void;
  private onKeySetChange: (keySet: boolean[]) => void;
  private playerWidth = 70;
  private playerHeight = 70;
  private minX;
  private maxX;
  private minY;
  private maxY;
  private renderTimer: NodeJS.Timer | undefined;
  private viewAccelerationFactor = 10;
  private viewAccelerationSpeed = 0.1;
  private viewAccelerationX = 0;
  private viewAccelerationY = 0;

  private keySet: {
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

  public getAccelerationX() {
    return this.player.speedUpX;
  }

  public getAccelerationY() {
    return this.player.speedUpY;
  }

  public getPosition() {
    return {
      x: this.getX(),
      y: this.getY(),
    };
  }

  public updateKeySet(keySet: boolean[]) {
    this.keySet = {
      up: keySet[0],
      down: keySet[1],
      left: keySet[2],
      right: keySet[3],
    };
  }

  public getKeySet() {
    return this.keySet;
  }

  constructor({
    id,
    x,
    y,
    isControllable = false,
    onUpdatePosition = () => {
      return;
    },
    onKeySetChange = () => {
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
    onKeySetChange?: (keySet: boolean[]) => void;
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
    this.keySet = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.onUpdatePosition = onUpdatePosition;
    this.onKeySetChange = onKeySetChange;

    this.domElement = document.createElement("div");

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
        let keySetChange = false;

        if (
          this.keySet.up === false &&
          (event.key === "ArrowUp" || event.key.toLowerCase() === "w")
        ) {
          this.keySet.up = true;
          keySetChange = true;
        }
        if (
          this.keySet.down === false &&
          (event.key === "ArrowDown" || event.key.toLowerCase() === "s")
        ) {
          this.keySet.down = true;
          keySetChange = true;
        }
        if (
          this.keySet.left === false &&
          (event.key === "ArrowLeft" || event.key.toLowerCase() === "a")
        ) {
          this.keySet.left = true;
          keySetChange = true;
        }
        if (
          this.keySet.right === false &&
          (event.key === "ArrowRight" || event.key.toLowerCase() === "d")
        ) {
          this.keySet.right = true;
          keySetChange = true;
        }

        if (keySetChange) {
          this.onKeySetChange([
            this.keySet.up,
            this.keySet.down,
            this.keySet.left,
            this.keySet.right,
          ]);
        }
      });

      window.addEventListener("keyup", (event) => {
        let keySetChange = false;
        if (
          this.keySet.up === true &&
          (event.key === "ArrowUp" || event.key.toLowerCase() === "w")
        ) {
          this.keySet.up = false;
          keySetChange = true;
        }
        if (
          this.keySet.down === true &&
          (event.key === "ArrowDown" || event.key.toLowerCase() === "s")
        ) {
          this.keySet.down = false;
          keySetChange = true;
        }
        if (
          this.keySet.left === true &&
          (event.key === "ArrowLeft" || event.key.toLowerCase() === "a")
        ) {
          this.keySet.left = false;
          keySetChange = true;
        }
        if (
          this.keySet.right === true &&
          (event.key === "ArrowRight" || event.key.toLowerCase() === "d")
        ) {
          this.keySet.right = false;
          keySetChange = true;
        }

        if (keySetChange) {
          this.onKeySetChange([
            this.keySet.up,
            this.keySet.down,
            this.keySet.left,
            this.keySet.right,
          ]);
        }
      });

      setInterval(() => {
        this.press();

        if (this.player.speedUpX < this.viewAccelerationX) {
          this.viewAccelerationX = Math.max(
            this.player.speedUpX,
            this.viewAccelerationX - this.viewAccelerationSpeed,
          );
        } else if (this.player.speedUpX > this.viewAccelerationX) {
          this.viewAccelerationX = Math.min(
            this.player.speedUpX,
            this.viewAccelerationX + this.viewAccelerationSpeed,
          );
        }

        if (this.player.speedUpY < this.viewAccelerationY) {
          this.viewAccelerationY = Math.max(
            this.player.speedUpY,
            this.viewAccelerationY - this.viewAccelerationSpeed,
          );
        } else if (this.player.speedUpY > this.viewAccelerationY) {
          this.viewAccelerationY = Math.min(
            this.player.speedUpY,
            this.viewAccelerationY + this.viewAccelerationSpeed,
          );
        }

        this.onUpdatePosition(
          this.player.x - this.viewAccelerationX * this.viewAccelerationFactor,
          this.player.y - this.viewAccelerationY * this.viewAccelerationFactor,
        );
      }, 1000 / 60);
    } else {
      setInterval(() => {
        this.press();
      }, 1000 / 60);
    }
  }

  public render() {
    if (!this.isControllable) {
      this.domElement.style.transform = `translate(${
        this.player.x - this.playerWidth / 2
      }px, ${this.player.y - this.playerHeight / 2}px)`;
    } else {
      this.domElement.style.transform = `translate(${
        this.viewAccelerationX * this.viewAccelerationFactor
      }px, ${this.viewAccelerationY * this.viewAccelerationFactor}px)`;
    }
  }

  private press() {
    this.player.press(this.keySet);
  }

  public update(x: number, y: number) {
    this.player.move(x, y);
  }

  public setOnUpdatePosition(onUpdatePosition: (x: number, y: number) => void) {
    this.onUpdatePosition = onUpdatePosition;
  }

  public setOnKeySetChange(onKeySetChange: (keySet: boolean[]) => void) {
    this.onKeySetChange = onKeySetChange;
  }

  public destroy() {
    this.domElement.remove();
  }
}

export default PlayerComponent;
