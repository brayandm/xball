"use client";

import styles from "./PlayerComponent.module.css";
import useKeypress from "@/hooks/useKeypress";
import { useEffect, useRef, useState } from "react";
import Player from "@/lib/Player";

export default function PlayerComponent() {
  const playerRef = useRef<HTMLDivElement>(null);

  const [player] = useState(new Player(playerRef));

  const [keySet, setKeySet] = useState([false, false, false, false]);

  useKeypress(keySet, setKeySet);

  const [touch, setTouch] = useState(false);

  const [ws, setWs] = useState<WebSocket>();

  const [loadingConnection, setLoadingConnection] = useState(true);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    setWs(ws);

    ws.onopen = () => {
      console.log("connected");
      setLoadingConnection(false);
    };
  }, []);

  useEffect(() => {
    player.moveVector(keySet);

    if (!loadingConnection) {
      ws?.send(JSON.stringify({ x: player.x, y: player.y }));
    }

    const timeoutId = setTimeout(() => {
      setTouch(!touch);
    }, 1000 / 60);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [keySet, player, touch, ws, loadingConnection]);

  return <div ref={playerRef} className={styles.player}></div>;
}
