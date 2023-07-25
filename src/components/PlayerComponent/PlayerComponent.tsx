"use client";

import styles from "./PlayerComponent.module.css";
import useKeypress from "@/hooks/useKeypress";
import { useRef } from "react";
import Player from "@/lib/Player";

export default function PlayerComponent() {
  const playerRef = useRef<HTMLDivElement>(null);

  const player = new Player(playerRef);

  useKeypress((key: string) => {
    if (key === "w") {
      player.moveUp();
    }

    if (key === "s") {
      player.moveDown();
    }

    if (key === "a") {
      player.moveLeft();
    }

    if (key === "d") {
      player.moveRight();
    }
  });

  return <div ref={playerRef} className={styles.player}></div>;
}
