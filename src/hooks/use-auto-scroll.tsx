'use client'

import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import { RefObject, useEffect, useRef } from "react";

const useAutoScroll = (divRef: RefObject<HTMLDivElement | null>) => {
  const {
    autoScroll: { active, pause, speed },
    autoScrollPause,
    onAutoScrollPauseChange
  } = useReaderSettingsContext();

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (active && !pause) {
      const intervalId = setInterval(() => {
        requestAnimationFrame(() => {
          window.scrollBy({ top: speed, behavior: "smooth" });
        });
      }, 16);

      return () => clearInterval(intervalId);
    }
  }, [active, pause, speed]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) autoScrollPause();
    }, { root: null, rootMargin: "0px", threshold: 1 });
  }, [autoScrollPause]);

  useEffect(() => {
    if (divRef.current) {
      observerRef.current?.observe(divRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [divRef]);

  return { onAutoScrollPauseChange, autoScrollPause };
};

export default useAutoScroll;
