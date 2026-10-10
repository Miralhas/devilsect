'use client'

import { Chapter } from "@/types/chapter";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

type Checkpoint = {
  id: string;
  position: number;
}

const useCheckpoint = (chapter: Chapter) => {
  const { slug } = chapter

  const handleScroll = useDebouncedCallback(() => {
    const position = window.scrollY || window.pageYOffset;
    const checkpoint: Checkpoint = { id: slug, position };
    localStorage.setItem('checkpoint', JSON.stringify(checkpoint));
  }, 5_000);

  useEffect(() => {
    const checkpointString = localStorage.getItem('checkpoint');
    if (checkpointString) {
      const checkpoint = JSON.parse(checkpointString) as Checkpoint;
      if (checkpoint.id !== slug) return;
      const id = requestAnimationFrame(() => {
        window.scrollTo({ top: checkpoint.position, behavior: 'instant' });
      });
      return () => cancelAnimationFrame(id);
    }

  }, [slug]);

  useEffect(() => {
    const onScroll = () => handleScroll()
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      handleScroll.flush();
    }
  }, [handleScroll]);

}

export default useCheckpoint;
