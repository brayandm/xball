"use client";

import GameManager from "@/lib/Game/GameManager";
import { useEffect, useState } from "react";

export default function Game() {
  const [gameManager] = useState(new GameManager({}));

  useEffect(() => {
    gameManager.createPlayerComponent();
  }, [gameManager]);

  return <h1> Hello World </h1>;
}
