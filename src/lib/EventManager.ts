import GameManager from "./Game/GameManager";
import PlayerComponent from "./Game/PlayerComponent";
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
    let myPlayerComponent: PlayerComponent | undefined;

    const onMessage = (message: string) => {
      const event: updatePlayerEvent | createPlayerEvent | removePlayerEvent =
        JSON.parse(message);

      if (event.type === "createPlayer") {
        const player = this.gameManager.createPlayerComponent({
          id: event.id,
          isMe: event.isMe,
          x: event.x,
          y: event.y,
        });

        if (event.isMe) {
          myPlayerComponent = player;
        }
      } else if (event.type === "updatePlayer") {
        const playerComponent = this.gameManager.getPlayerComponentById(
          event.id,
        );

        if (playerComponent) {
          playerComponent.updatePosition(event.x, event.y);
        }
      } else if (event.type === "removePlayer") {
        this.gameManager.removePlayerComponentById(event.id);
      }
    };

    const onOpenConnection = () => {
      setInterval(() => {
        if (myPlayerComponent) {
          const event = {
            type: "updatePlayer",
            x: myPlayerComponent.getX(),
            y: myPlayerComponent.getY(),
          };

          this.webSocketManager.sendMessage(JSON.stringify(event));
        }
      }, 1000 / 60);
    };

    this.webSocketManager.setOnMessageCallback(onMessage);
    this.webSocketManager.setOnOpenConnectionCallback(onOpenConnection);
  }
}

export default EventManager;
