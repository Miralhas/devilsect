'use client'

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type ShowMoreProps = {
  maxLines?: number;
  className?: string;
}

const ShowMore = ({ children, className, maxLines = 4 }: PropsWithChildren<ShowMoreProps>) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setNeedsTruncation(contentRef.current.scrollHeight > contentRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [showFullText])

  const toggleShowMore = () => {
    setShowFullText(prev => !prev);
  };

  return (
    <div className={className}>
      <div className="space-y-3 space-x-2.5" ref={contentRef}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: showFullText ? 'unset' : maxLines,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {children}
      </div>
      {needsTruncation && (
        <div className="w-full grid pe-4" ref={buttonRef}>
          <button
            onClick={toggleShowMore}
            className="bg-linear-to-r from-primary to-primary/60 inline-flex items-center transition-all ease-in-out duration-200 hover:bg-primary/80 px-2 py-1 rounded-md cursor-pointer uppercase font-extrabold tracking-tighter text-[11px] w-fit ms-auto gap-0.5"
          >
            {showFullText ? 'Show Less' : 'Show More'}
            <ChevronUp className={cn("size-4 mt-0.25", { "rotate-180": !showFullText })} strokeWidth={4} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ShowMore;
