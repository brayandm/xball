import GameManager from "./Game/GameManager";
import PlayerComponent from "./Game/PlayerComponent";
import WebSocketManager from "./WebSocketManager";

type createPlayerEvent = {
  type: "createPlayer";
  isMe: boolean;
  id: string;
  x: number;
  y: number;
  accelerationX?: number;
  accelerationY?: number;
  balls?: boolean[];
};

type updatePlayerEvent = {
  type: "updatePlayer";
  id: string;
  x: number;
  y: number;
  accelerationX: number;
  accelerationY: number;
  balls?: boolean[];
};

type removePlayerEvent = {
  type: "removePlayer";
  id: string;
};

type keySetPlayerEvent = {
  type: "keySetPlayer";
  id: string;
  keySet: boolean[];
};

class EventManager {
  private gameManager: GameManager;
  private webSocketManager: WebSocketManager;
  private fps: number = 60;

  constructor(
    gameManager: GameManager,
    webSocketManager: WebSocketManager,
    fps: number = 60,
  ) {
    this.gameManager = gameManager;
    this.webSocketManager = webSocketManager;
    this.fps = fps;
  }

  public start() {
    let myPlayerComponent: PlayerComponent | undefined;

    const onMessage = (message: string) => {
      const event:
        | updatePlayerEvent
        | createPlayerEvent
        | removePlayerEvent
        | keySetPlayerEvent = JSON.parse(message);

      if (event.type === "createPlayer") {
        if (event.isMe) {
          this.gameManager.getMapComponent().createMap();
        }

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
          if (this.fps === 60) {
            playerComponent.updatePosition(event.x, event.y);
          } else {
            playerComponent.updateAndPredictPosition(
              event.x,
              event.y,
              event.accelerationX,
              event.accelerationY,
            );
          }
        }
      } else if (event.type === "removePlayer") {
        this.gameManager.removePlayerComponentById(event.id);
      } else if (event.type === "keySetPlayer") {
        console.log(event.keySet);
        const playerComponent = this.gameManager.getPlayerComponentById(
          event.id,
        );

        if (playerComponent) {
          playerComponent.updateKeySet(event.keySet);
        }
      }
    };

    const onOpenConnection = () => {
      setInterval(() => {
        if (myPlayerComponent) {
          const event = {
            type: "updatePlayer",
            x: myPlayerComponent.getX(),
            y: myPlayerComponent.getY(),
            accelerationX: myPlayerComponent.getAccelerationX(),
            accelerationY: myPlayerComponent.getAccelerationY(),
          };

          this.webSocketManager.sendMessage(JSON.stringify(event));
        }
      }, 1000 / this.fps);

      // setInterval(() => {
      //   if (myPlayerComponent) {
      //     const event = {
      //       type: "keySetPlayer",
      //       keySet: myPlayerComponent.getKeySet(),
      //     };

      //     this.webSocketManager.sendMessage(JSON.stringify(event));
      //   }
      // }, 1000 / this.);
    };

    this.webSocketManager.setOnMessageCallback(onMessage);
    this.webSocketManager.setOnOpenConnectionCallback(onOpenConnection);
  }
}

export default EventManager;
