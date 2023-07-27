import PlayerComponent from "./PlayerComponent";
import MapComponent from "./MapComponent";

class GameManager {
  private playerComponents: PlayerComponent[] = [];
  private mapComponent: MapComponent;

  constructor({mapComponent}: {mapComponent: MapComponent}) {
    this.mapComponent = mapComponent;

    this.mapComponent.startRendering();
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
    });

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
