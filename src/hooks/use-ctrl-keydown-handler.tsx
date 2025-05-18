'use client'

import { RefObject, useEffect } from "react";

type HookProps<T> = {
  elementRef: T;
  key: string;
}

function useCrtlKeyDownHandler<T extends RefObject<HTMLElement | null>>({ elementRef, key }: HookProps<T>) {
  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey && e.key === key) {
        e.preventDefault();
        if (elementRef.current) elementRef.current.click();
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    }

  }, [elementRef, key]);
}

export default useCrtlKeyDownHandler;
