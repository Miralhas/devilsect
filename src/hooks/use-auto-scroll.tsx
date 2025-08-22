'use client'
import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import { RefObject, useEffect } from "react";

type AutoScrollReturn = () => void

const useAutoScroll = (divRef: RefObject<HTMLDivElement | null>): AutoScrollReturn => {
  const { autoScroll: { active, pause, speed }, onAutoScrollActiveChange, onAutoScrollPause } = useReaderSettingsContext();

  useEffect(() => {
    if (active && !pause && divRef.current) {
      const scrollHeight = divRef.current.scrollHeight;
      const intervalId = setInterval(() => {
        window.scrollBy({ top: speed, behavior: "smooth" });
        if (window.scrollY >= (scrollHeight - 500)) onAutoScrollActiveChange();
      }, 10);
      return () => clearInterval(intervalId);
    }

  }, [active, divRef, onAutoScrollActiveChange, speed, pause]);

  return onAutoScrollPause;
}

export default useAutoScroll;
