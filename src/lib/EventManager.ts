import GameManager from "./Game/GameManager";
import WebSocketManager from "./WebSocketManager";

type createPlayerEvent = {
  type: "createPlayer";
  isMe: boolean;
  id: string;
  x: number;
  y: number;
  aceleracionX?: number;
  aceleracionY?: number;
  balls?: boolean[];
};

type updatePlayerEvent = {
  type: "updatePlayer";
  id: string;
  x: number;
  y: number;
  aceleracionX?: number;
  aceleracionY?: number;
  balls?: boolean[];
};

type removePlayerEvent = {
  type: "removePlayer";
  id: string;
};

class EventManager {
  private gameManager: GameManager;
  private webSocketManager: WebSocketManager;

  constructor(gameManager: GameManager, webSocketManager: WebSocketManager) {
    this.gameManager = gameManager;
    this.webSocketManager = webSocketManager;
  }

  public start() {
    const onMessage = (message: string) => {
      const parsedMessage:
        | updatePlayerEvent
        | createPlayerEvent
        | removePlayerEvent = JSON.parse(message);

      console.log(parsedMessage);
    };

    this.webSocketManager.setOnMessageCallback(onMessage);
    // this.webSocketManager.setOnNewConnectionCallback(onNewConnection);
    // this.webSocketManager.setOnCloseConnectionCallback(onCloseConnection);
  }
}

export default EventManager;
