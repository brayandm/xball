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

  constructor({ isControllable = false }) {
    this.player = new Player({});
    this.isControllable = isControllable;
    this.ketSet = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.domElement = document.createElement("div");

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
        console.log(this.ketSet);
        this.press();
      }, 1000 / 60);
    }
  }

  private press() {
    this.player.press(this.ketSet);
    this.domElement.style.transform = `translate(${this.player.x}px, ${this.player.y}px)`;
  }

  public update(x: number, y: number) {
    this.player.move(x, y);
    this.domElement.style.transform = `translate(${this.player.x}px, ${this.player.y}px)`;
  }
}

export default PlayerComponent;
