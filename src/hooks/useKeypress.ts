import { Dispatch, SetStateAction, useEffect } from "react";

const useKeypress = (
  keySet: boolean[],
  setKeySet: Dispatch<SetStateAction<boolean[]>>,
) => {
  useEffect(() => {
    const eventListenerKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") {
        setKeySet({
          ...keySet,
          0: true,
        });
      }

      if (e.key === "ArrowDown" || e.key === "s") {
        setKeySet({
          ...keySet,
          1: true,
        });
      }

      if (e.key === "ArrowLeft" || e.key === "a") {
        setKeySet({
          ...keySet,
          2: true,
        });
      }

      if (e.key === "ArrowRight" || e.key === "d") {
        setKeySet({
          ...keySet,
          3: true,
        });
      }
    };

    const eventListenerKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") {
        setKeySet({
          ...keySet,
          0: false,
        });
      }

      if (e.key === "ArrowDown" || e.key === "s") {
        setKeySet({
          ...keySet,
          1: false,
        });
      }

      if (e.key === "ArrowLeft" || e.key === "a") {
        setKeySet({
          ...keySet,
          2: false,
        });
      }

      if (e.key === "ArrowRight" || e.key === "d") {
        setKeySet({
          ...keySet,
          3: false,
        });
      }
    };

    window.addEventListener("keydown", eventListenerKeyDown);
    window.addEventListener("keyup", eventListenerKeyUp);

    return () => {
      window.removeEventListener("keydown", eventListenerKeyDown);
      window.removeEventListener("keyup", eventListenerKeyUp);
    };
  }, [keySet, setKeySet]);
};

export default useKeypress;
