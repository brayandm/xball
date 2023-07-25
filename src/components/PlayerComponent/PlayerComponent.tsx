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

  useEffect(() => {
    player.moveVector(keySet);

    const timeoutId = setTimeout(() => {
      setTouch(!touch);
    }, 1000 / 60);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [keySet, player, touch]);

  return <div ref={playerRef} className={styles.player}></div>;
}
