import PlayerComponent from "./PlayerComponent";
import MapComponent from "./MapComponent";

class GameManager {
  private playerComponents: PlayerComponent[] = [];
  private mapComponent: MapComponent;

  constructor({ mapComponent }: { mapComponent: MapComponent }) {
    this.mapComponent = mapComponent;

    this.mapComponent.startRendering();
  }

  public getMapComponent() {
    return this.mapComponent;
  }

  public getMyPlayerComponent = () => {
    return this.playerComponents.find((playerComponent) =>
      playerComponent.isItControllable(),
    );
  };

  public getPlayerComponentById = (id: string) => {
    return this.playerComponents.find(
      (playerComponent) => playerComponent.getId() === id,
    );
  };

  public removePlayerComponentById = (id: string) => {
    const playerComponent = this.getPlayerComponentById(id);

    if (playerComponent) {
      playerComponent.destroy();
    }

    this.playerComponents = this.playerComponents.filter(
      (playerComponent) => playerComponent.getId() !== id,
    );
  };

  public createPlayerComponent = ({
    id,
    isMe,
    x,
    y,
  }: {
    id: string;
    isMe: boolean;
    x: number;
    y: number;
  }) => {
    const playerComponent = new PlayerComponent({
      id,
      x,
      y,
      isControllable: isMe,
      parentComponent: this.mapComponent.getMapElement()!,
      minX: 0,
      maxX: this.mapComponent.getMapWidth(),
      minY: 0,
      maxY: this.mapComponent.getMapHeight(),
    });

    if (isMe) {
      playerComponent.setOnUpdatePosition((x, y) => {
        this.mapComponent.updateViewPosition(x, y);
      });
    }

    this.playerComponents.push(playerComponent);

    return playerComponent;
  };

  public destroy() {
    this.playerComponents.forEach((playerComponent) => {
      playerComponent.destroy();
    });
  }
}

export default GameManager;
