import PlayerComponent from "./PlayerComponent";

class GameManager {
  private playerComponents: PlayerComponent[] = [];

  constructor({}) {}

  public createPlayerComponent = () => {
    const playerComponent = new PlayerComponent({ isControllable: true });

    this.playerComponents.push(playerComponent);
  };

  public destroy() {
    this.playerComponents.forEach((playerComponent) => {
      playerComponent.destroy();
    });
  }
}

export default GameManager;
