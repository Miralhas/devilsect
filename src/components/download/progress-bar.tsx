'use client'

import { cn } from "@/utils/common-utils";

const ProgressBar = ({ progress = 0 }: { progress?: number }) => {
  const finished = progress === 100;
  return (
    <div className={cn("w-full flex overflow-hidden h-4 rounded-lg border border-accent bg-primary/80", !finished && "animate-pulse")}>
      <div className="bg-red-800 w-full border" style={{ maxWidth: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar;
