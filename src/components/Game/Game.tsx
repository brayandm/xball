"use client";

import GameManager from "@/lib/Game/GameManager";
import WebSocketManager from "@/lib/WebSocketManager";
import EventManager from "@/lib/EventManager";
import { useEffect, useState } from "react";

export default function Game() {
  const [webSocketManager] = useState(
    new WebSocketManager({
      webSocketUrl: process.env.NEXT_PUBLIC_WEBSOCKET_SERVER!,
    }),
  );

  const [gameManager] = useState(new GameManager({}));

  const [eventManager] = useState(
    new EventManager(gameManager, webSocketManager),
  );

  useEffect(() => {
    eventManager.start();
  }, [eventManager]);

  return <></>;
}
