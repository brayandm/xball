class MapComponent {
  private width: number;
  private height: number;
  private viewX;
  private viewY;
  private map: HTMLElement | null = null;

  constructor({
    width,
    height,
    viewX,
    viewY,
  }: {
    width: number;
    height: number;
    viewX: number;
    viewY: number;
  }) {
    this.width = width;
    this.height = height;
    this.viewX = viewX;
    this.viewY = viewY;
  }

  getMapWidth() {
    return this.width;
  }

  getMapHeight() {
    return this.height;
  }

  getMapElement() {
    return this.map;
  }

  createMap() {
    this.map = document.createElement("div");
    this.map.classList.add("map");
    this.map.style.width = `${this.width}px`;
    this.map.style.height = `${this.height}px`;
    document.body.appendChild(this.map);
  }

  updateViewPosition(viewX: number, viewY: number) {
    this.viewX = viewX;
    this.viewY = viewY;
  }

  public startRendering() {
    setInterval(() => {
      this.render();
    }, 1000 / 60);
  }

  public render() {
    if (this.map) {
      this.map.style.transform = `translate(${
        -this.viewX + window.innerWidth / 2
      }px, ${-this.viewY + window.innerHeight / 2}px)`;
      document.body.style.backgroundPosition = `${
        -this.viewX + window.innerWidth / 2
      }px ${-this.viewY + window.innerHeight / 2}px`;
    }
  }
}

export default MapComponent;
