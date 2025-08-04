'use client'

import { useEffect, useRef, useState } from "react";

type ShowMoreButtonProps = {
  className: string;
}

const ShowMoreButton = ({ className }: ShowMoreButtonProps) => {
  const [showMore, setShowMore] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showMore) return;
    buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [showMore]);

  const toggle = () => {
    const grid = document.getElementById("ranking-grid");
    // check if the grid has the limiting height class (max-h-[503px]). If so, removes it.
    if (grid && grid.classList.contains(className) && !showMore) {
      grid.classList.remove(className)
      setShowMore(prev => !prev);
    }

    if (grid && !grid.classList.contains(className) && showMore) {
      grid.classList.add(className)
      setShowMore(prev => !prev);
    }
  }

  return (
    <div className="hidden md:flex w-full items-center justify-center mt-6">
      <button
        className="cursor-pointer uppercase font-extrabold text-base tracking-tighter text-[15px]"
        onClick={toggle}
        ref={buttonRef}
      >
        {!showMore ? "Show More" : "Show Less"}
      </button>
    </div>
  )
}

export default ShowMoreButton;
