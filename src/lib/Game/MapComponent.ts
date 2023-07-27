class MapComponent {
  private width: number;
  private height: number;
  private viewX: number;
  private viewY: number;
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
    this.viewX = viewX;
    this.viewY = viewY;
    this.width = width;
    this.height = height;
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

  updateViewPosition(x: number, y: number) {
    this.viewX = x;
    this.viewY = y;
  }

  public startRendering() {
    setInterval(() => {
      this.render();
    }, 1000 / 60);
  }

  public render() {
    if (this.map) {
      this.map.style.transform = `translate(${-this.viewX}px, ${-this
        .viewY}px)`;
    }
  }
}

export default MapComponent;
