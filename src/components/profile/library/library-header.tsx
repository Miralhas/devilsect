'use client'

import { FlagIcon, Star } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

const LibraryHeader = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const id = setTimeout(() => {
      if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 250);

    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={divRef}>
      <h2 className="text-xl md:text-3xl font-semibold">Your Library</h2>
      <p className="text-sm text-muted-foreground ">
        Your personal collection of novels.
      </p>
      <div className="w-full bg-secondary/40 mt-2 p-4 space-y-2 border">
        <p className="text-muted-foreground text-sm">
          <Star className="size-3.5 inline-block mr-1" fill="#9f9fa9" />
          Bookmark your favorite novels.
        </p>
        <p className="text-muted-foreground text-sm">
          <FlagIcon className="size-3.5 inline-block mr-1" fill="#9f9fa9" />
          Mark a novel as Complete once you’ve finished reading.
        </p>
      </div>
    </div>
  )
}

export default LibraryHeader;
