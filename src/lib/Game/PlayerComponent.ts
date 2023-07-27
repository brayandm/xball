import Player from "./Player";

class PlayerComponent {
  private player: Player;
  private domElement: HTMLElement;
  private isControllable: boolean;

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

  public getPosition() {
    return {
      x: this.getX(),
      y: this.getY(),
    };
  }

  constructor({
    id,
    x,
    y,
    isControllable = false,
  }: {
    id: string;
    x: number;
    y: number;
    isControllable?: boolean;
  }) {
    this.player = new Player({
      id,
      x,
      y,
    });
    this.isControllable = isControllable;
    this.ketSet = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.domElement = document.createElement("div");

    this.refresh();

    document.body.appendChild(this.domElement);

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
      }, 1000 / 60);
    }
  }

  private refresh() {
    this.domElement.style.transform = `translate(${this.player.x}px, ${this.player.y}px)`;
  }

  private press() {
    this.player.press(this.ketSet);
    this.domElement.style.transform = `translate(${this.player.x}px, ${this.player.y}px)`;
  }

  public update(x: number, y: number) {
    this.player.move(x, y);
    this.domElement.style.transform = `translate(${this.player.x}px, ${this.player.y}px)`;
  }

  public destroy() {
    this.domElement.remove();
  }
}

export default PlayerComponent;
