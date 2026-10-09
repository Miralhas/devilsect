'use client'

import { Chapter } from "@/types/chapter";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

type Checkpoint = {
  id: string;
  position: number;
}

const useCheckpoint = (chapter: Chapter) => {
  const chapterRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useDebouncedCallback(() => {
    if (chapterRef.current) {
      const { y } = chapterRef.current.getBoundingClientRect();
      const position = window.innerHeight - (y + window.innerHeight / 2);
      const checkpoint: Checkpoint = { id: chapter.slug, position };
      localStorage.setItem('checkpoint', JSON.stringify(checkpoint));
    }
  }, 100);

  useEffect(() => {
    const checkpointString = localStorage.getItem('checkpoint');
    if (checkpointString) {
      const checkpoint = JSON.parse(checkpointString) as Checkpoint;
      if (checkpoint.id !== chapter.slug) return;
      window.scroll({ top: checkpoint.position, behavior: 'smooth' });
    }

    window.addEventListener('scroll', () => handleScroll(), false);
    return () => {
      window.removeEventListener('scroll', () => handleScroll(), false);
      handleScroll.cancel?.();
    }
  // eslint-disable-next-line
  }, []);

  return { chapterRef };
}

export default useCheckpoint;
