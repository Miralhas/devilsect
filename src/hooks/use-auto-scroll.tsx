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
  const requestIdRef = useRef<number>(undefined);
  const lastTimeRef = useRef<number>(null);

  if (pause && requestIdRef.current) {
    cancelAnimationFrame(requestIdRef.current)
    requestIdRef.current = undefined;
    lastTimeRef.current = null;
  }

  useEffect(() => {
    if (active && !pause) {
      const step = (time: number) => {
        if (lastTimeRef.current != null) {
          const delta = time - lastTimeRef.current;
          const distance = speed * delta;
          // const delta = time - lastTimeRef.current;
          window.scrollBy({ top: distance, behavior: "auto" });
        }
        lastTimeRef.current = time;
        requestIdRef.current = requestAnimationFrame(step);
      }
      requestIdRef.current = requestAnimationFrame(step);
    }

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
        requestIdRef.current = undefined;
      }
      lastTimeRef.current = null;
    };
  }, [active, pause, speed]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { autoScrollPause() };
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


// 'use client'
// import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
// import { RefObject, useEffect, useRef } from "react";

// const useAutoScroll = (divRef: RefObject<HTMLDivElement | null>) => {
//   const {
//     autoScroll: { active, pause, speed }, // speed = px per second
//     autoScrollPause,
//     onAutoScrollPauseChange
//   } = useReaderSettingsContext();

//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const requestIdRef = useRef<number>(undefined);
//   const lastTimeRef = useRef<number>(undefined);

//   useEffect(() => {
//     if (active && !pause) {
//       const step = (timestamp: number) => {
//         if (lastTimeRef.current != null) {
//           const delta = (timestamp - lastTimeRef.current) / 1000; // seconds since last frame
//           const distance = speed * delta; // px to scroll this frame
//           window.scrollBy({ top: distance, behavior: "auto" });
//         }
//         lastTimeRef.current = timestamp;
//         requestIdRef.current = requestAnimationFrame(step);
//       };
//       requestIdRef.current = requestAnimationFrame(step);
//     }

// return () => {
//   if (requestIdRef.current) {
//     cancelAnimationFrame(requestIdRef.current);
//     requestIdRef.current = undefined;
//   }
//   lastTimeRef.current = undefined;
// };
//   }, [active, pause, speed]);

//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) autoScrollPause();
//     }, { root: null, rootMargin: "0px", threshold: 1 });
//   }, [autoScrollPause]);

//   useEffect(() => {
//     if (divRef.current) {
//       observerRef.current?.observe(divRef.current);
//     }
//     return () => {
//       observerRef.current?.disconnect();
//     };
//   }, [divRef]);

//   return { onAutoScrollPauseChange, autoScrollPause };
// };

// export default useAutoScroll;
