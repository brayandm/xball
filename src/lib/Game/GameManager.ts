import PlayerComponent from "./PlayerComponent";

class GameManager {
  private playerComponents: PlayerComponent[] = [];

  constructor({}) {}

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
  };

  public destroy() {
    this.playerComponents.forEach((playerComponent) => {
      playerComponent.destroy();
    });
  }
}

export default GameManager;
