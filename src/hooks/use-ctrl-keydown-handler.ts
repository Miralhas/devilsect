'use client'

import { useEffect } from "react";

type HookProps = {
  callback: () => void;
  key: string;
}

function useCrtlKeyDownHandler({ callback, key }: HookProps) {
  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey && e.key === key) {
        e.preventDefault();
        callback();
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    }

  }, [callback, key]);
}

export default useCrtlKeyDownHandler;
