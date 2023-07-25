"use client";

import styles from "./PlayerComponent.module.css";
import useKeypress from "@/hooks/useKeypress";
import { useEffect, useRef, useState } from "react";
import Player from "@/lib/Player";

type PlayerData = {
  id: string;
  x: number;
  y: number;
  isMe: boolean;
};

export default function PlayerComponent() {
  const playerRef = useRef<HTMLDivElement>(null);

  const [player] = useState(new Player(playerRef));

  const [keySet, setKeySet] = useState([false, false, false, false]);

  useKeypress(keySet, setKeySet);

  const [touch, setTouch] = useState(false);

  const [ws, setWs] = useState<WebSocket>();

  const [loadingConnection, setLoadingConnection] = useState(true);

  const [players, setPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    setWs(ws);

    ws.onopen = () => {
      console.log("connected");
      setLoadingConnection(false);
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data) as PlayerData[];
      setPlayers(data);
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

  const playerComponents = players.map((newPlayer) => {
    return newPlayer.isMe ? (
      <div
        ref={playerRef}
        key={0}
        className={styles.player}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          transform: `translate(${player.x}px, ${player.y}px)`,
        }}
      ></div>
    ) : (
      <div
        key={newPlayer.id}
        className={styles.player}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          transform: `translate(${newPlayer.x}px, ${newPlayer.y}px)`,
        }}
      ></div>
    );
  });

  return playerComponents;
}
