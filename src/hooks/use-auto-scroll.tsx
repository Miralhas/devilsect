'use client'
import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import { RefObject, useEffect } from "react";

const useAutoScroll = (divRef: RefObject<HTMLDivElement | null>) => {
  const { autoScroll: { active, pause, speed }, autoScrollPause, onAutoScrollPauseChange } = useReaderSettingsContext();

  useEffect(() => {
    if (active && !pause && divRef.current) {
      const scrollHeight = divRef.current.scrollHeight;
      const intervalId = setInterval(() => {
        window.scrollBy({ top: speed, behavior: "smooth" });
        if (window.scrollY >= scrollHeight) autoScrollPause();
      }, 10);
      return () => clearInterval(intervalId);
    }

  }, [active, divRef, autoScrollPause, speed, pause]);

  return { onAutoScrollPauseChange, autoScrollPause };
}

export default useAutoScroll;
