'use client'

import { useEffect, useRef, useState } from "react";

type Params = {
  limit: number;
  speed?: number;
  state?: boolean;
}

const getElapsed = (startedAt: number) => (Date.now() - startedAt) / 1000;

const useSimulatedProgressBar = ({ limit: defaultLimit, speed = 0.05, state = false }: Params) => {
  const startedAt = useRef<number>(Date.now());
  const [progress, setProgress] = useState<number>(0);
  const [delay, setDelay] = useState<number>(100);
  const [start, setStart] = useState(state);
  const [finish, setFinish] = useState(false);
  const [limit, setLimit] = useState(defaultLimit);

  useEffect(() => {
    if (!start) return;
    if (progress >= limit) return;

    const timer = setTimeout(() => {
      const elapsed = getElapsed(startedAt.current);
      const nextProgress = finish ? progress + 1 : 100 * (1 - Math.exp(-speed * elapsed));

      setProgress(Math.min(nextProgress, limit));
    }, delay);

    return () => clearTimeout(timer);
  }, [progress, limit, speed, start, delay]);

  const onFinish = () => {
    setFinish(true);
    setDelay(10);
    setLimit(100);
  };

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
    onFinish,
    reset,
    onStart,
    onStop
  }
}

export default useSimulatedProgressBar