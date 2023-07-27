class WebSocketManager {
  private webSocket: WebSocket;
  private onMessageCallback: (message: string) => void;
  private onOpenConnectionCallback: () => void;
  private onCloseConnectionCallback: () => void;
  private onErrorMessageCallback: () => void;

  constructor({
    webSocketUrl,
    onMessageCallback = () => {
      return;
    },
    onOpenConnectionCallback = () => {
      return;
    },
    onCloseConnectionCallback = () => {
      return;
    },
    onErrorMessageCallback = () => {
      return;
    },
  }: {
    webSocketUrl: string;
    onMessageCallback?: (message: string) => void;
    onOpenConnectionCallback?: () => void;
    onCloseConnectionCallback?: () => void;
    onErrorMessageCallback?: () => void;
  }) {
    this.webSocket = new WebSocket(webSocketUrl);

    this.onMessageCallback = onMessageCallback;
    this.onOpenConnectionCallback = onOpenConnectionCallback;
    this.onCloseConnectionCallback = onCloseConnectionCallback;
    this.onErrorMessageCallback = onErrorMessageCallback;

    this.webSocket.onopen = () => {
      console.log("WebSocket is connected.");

      this.onOpenConnectionCallback();
    };

    this.webSocket.onclose = () => {
      console.log("WebSocket is closed.");

      this.onCloseConnectionCallback();
    };

    this.webSocket.onerror = () => {
      console.log("WebSocket is error.");

      this.onErrorMessageCallback();
    };

    this.webSocket.onmessage = (event) => {
      this.onMessageCallback(event.data.toString());
    };
  }

  public sendMessage(message: string) {
    this.webSocket.send(message);
  }

  public closeConnection() {
    this.webSocket.close();
  }

  public setOnMessageCallback(callback: (message: string) => void) {
    this.onMessageCallback = callback;
  }

  public setOnOpenConnectionCallback(callback: () => void) {
    this.onOpenConnectionCallback = callback;
  }

  public setOnCloseConnectionCallback(callback: () => void) {
    this.onCloseConnectionCallback = callback;
  }

  public setOnErrorMessageCallback(callback: () => void) {
    this.onErrorMessageCallback = callback;
  }
}

export default WebSocketManager;
