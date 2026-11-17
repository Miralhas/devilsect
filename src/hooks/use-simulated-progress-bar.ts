'use client'

import { useEffect, useRef, useState } from "react";

type Params = {
  limit: number;
  speed?: number;
  state?: boolean;
}

const getElapsed = (startedAt: number) => (Date.now() - startedAt) / 1000;

const useSimulatedProgressBar = ({ limit, speed = 0.05, state = false }: Params) => {
  const startedAt = useRef<number>(Date.now());
  const [progress, setProgress] = useState<number>(0);
  const [start, setStart] = useState(state);

  useEffect(() => {
    if (!start) return;
    if (progress >= limit) return;

    const timer = setTimeout(() => {
      const elapsed = getElapsed(startedAt.current);
      const nextProgress = 100 * (1 - Math.exp(-speed * elapsed));

      setProgress(Math.min(nextProgress, limit));
    }, 100);

    return () => clearTimeout(timer);
  }, [progress, limit, speed, start]);

  const finish = () => setProgress(100);

  const onStart = () => {
    reset();
    setStart(true);
  }

  const onStop = () => setStart(false);
  
  const reset = () => {
    setProgress(0);
    startedAt.current = Date.now();
  }

  return {
    progress,
    finish,
    reset,
    onStart,
    onStop
  }
}

export default useSimulatedProgressBar