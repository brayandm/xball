"use client";

import GameManager from "@/lib/Game/GameManager";
import WebSocketManager from "@/lib/WebSocketManager";
import EventManager from "@/lib/EventManager";
import MapComponent from "@/lib/Game/MapComponent";
import { useEffect, useState } from "react";

export default function Game() {
  const [webSocketManager] = useState(
    new WebSocketManager({
      webSocketUrl: process.env.NEXT_PUBLIC_WEBSOCKET_SERVER!,
    }),
  );

  const [mapComponent] = useState(
    new MapComponent({
      width: Number(process.env.NEXT_PUBLIC_MAP_WIDTH!),
      height: Number(process.env.NEXT_PUBLIC_MAP_HEIGHT!),
      viewX: 0,
      viewY: 0,
    }),
  );

  const [gameManager] = useState(
    new GameManager({ mapComponent: mapComponent }),
  );

  const [eventManager] = useState(
    new EventManager(
      gameManager,
      webSocketManager,
      Number(process.env.NEXT_PUBLIC_SEND_POSITION_INTERVAL!),
    ),
  );

  useEffect(() => {
    eventManager.start();
  }, [eventManager]);

  return <></>;
}
