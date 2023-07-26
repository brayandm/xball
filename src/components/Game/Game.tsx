"use client";

import GameManager from "@/lib/Game/GameManager";
import WebSocketManager from "@/lib/WebSocketManager";
import { useEffect, useState } from "react";

export default function Game() {
  const [webSocketManager] = useState(
    new WebSocketManager({
      webSocketUrl: process.env.NEXT_PUBLIC_WEBSOCKET_SERVER!,
    }),
  );

  const [gameManager] = useState(new GameManager({}));

  useEffect(() => {
    gameManager.createPlayerComponent();

    return () => {
      gameManager.destroy();
    };
  }, [gameManager]);

  return <h1> Hello World </h1>;
}
