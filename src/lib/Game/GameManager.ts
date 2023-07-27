import PlayerComponent from "./PlayerComponent";

class GameManager {
  private playerComponents: PlayerComponent[] = [];

  constructor({}) {}

  public getMyPlayerComponent = () => {
    return this.playerComponents.find((playerComponent) =>
      playerComponent.isItControllable(),
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
