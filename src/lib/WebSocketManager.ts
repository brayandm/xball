class WebSockerManager {
  private webSocket: WebSocket;
  private onMessageCallback: (connectionId: string, message: string) => void;
  private onOpenConnectionCallback: (connectionId: string) => void;
  private onCloseConnectionCallback: (connectionId: string) => void;
  private onErrorMessageCallback: (connectionId: string) => void;

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

    onMessageCallback: (connectionId: string, message: string) => void;
    onOpenConnectionCallback: (connectionId: string) => void;
    onCloseConnectionCallback: (connectionId: string) => void;
    onErrorMessageCallback: (connectionId: string) => void;
  }) {
    this.webSocket = new WebSocket(webSocketUrl);

    this.onMessageCallback = onMessageCallback;
    this.onOpenConnectionCallback = onOpenConnectionCallback;
    this.onCloseConnectionCallback = onCloseConnectionCallback;
    this.onErrorMessageCallback = onErrorMessageCallback;

    this.webSocket.onopen = () => {
      console.log("WebSocket is connected.");

      this.onOpenConnectionCallback(this.webSocket.url);
    };

    this.webSocket.onclose = () => {
      console.log("WebSocket is closed.");

      this.onCloseConnectionCallback(this.webSocket.url);
    };

    this.webSocket.onerror = () => {
      console.log("WebSocket is error.");

      this.onErrorMessageCallback(this.webSocket.url);
    };

    this.webSocket.onmessage = (event) => {
      this.onMessageCallback(this.webSocket.url, event.data.toString());
    };
  }

  public sendMessage(message: string) {
    this.webSocket.send(message);
  }
}

export default WebSockerManager;
