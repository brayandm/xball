import GameManager from "./Game/GameManager";
import WebSocketManager from "./WebSocketManager";

class EventManager {
  private gameManager: GameManager;
  private webSocketManager: WebSocketManager;

  constructor(gameManager: GameManager, webSocketManager: WebSocketManager) {
    this.gameManager = gameManager;
    this.webSocketManager = webSocketManager;
  }
}

export default EventManager;
