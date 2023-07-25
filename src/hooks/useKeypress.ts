import { Dispatch, SetStateAction, useEffect } from "react";

const useKeypress = (
  keySet: boolean[],
  setKeySet: Dispatch<SetStateAction<boolean[]>>,
) => {
  useEffect(() => {
    const keys = [
      ["ArrowUp", "w"],
      ["ArrowDown", "s"],
      ["ArrowLeft", "a"],
      ["ArrowRight", "d"],
    ];

    const eventListenerKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      for (let i = 0; i < keys.length; i++) {
        if (
          keySet[i] === false &&
          (e.key === keys[i][0] || e.key === keys[i][1])
        ) {
          setKeySet({
            ...keySet,
            [i]: true,
          });
        }
      }
    };

    const eventListenerKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      for (let i = 0; i < keys.length; i++) {
        if (
          keySet[i] === true &&
          (e.key === keys[i][0] || e.key === keys[i][1])
        ) {
          setKeySet({
            ...keySet,
            [i]: false,
          });
        }
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
