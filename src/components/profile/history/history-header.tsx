'use client'

import { BookmarkPlus, HistoryIcon } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

const HistoryHeader = () => {
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
      <div className="flex items-center gap-2 w-full mb-1">
        <div className="size-10 bg-primary/50 text-accent flex items-center justify-center border border-accent/70 rounded-md">
          <HistoryIcon className="size-6" />
        </div>
        <h2 className="text-xl md:text-3xl font-semibold">Reading History</h2>
      </div>
      <p className="text-sm text-muted-foreground ">
        View and return to the novels you’ve recently read.
      </p>
      <div className="w-full bg-secondary/40 mt-4 p-4 space-y-2 border">
        <p className="text-muted-foreground text-sm">
          <BookmarkPlus className="size-4 inline-block mr-1" fill="" />
          Quickly bookmark any novel from your reading history to save it in your library.
        </p>
      </div>
    </div>
  )
}

export default HistoryHeader;
