import { cn } from "@/lib/utils"
import { NovelSummary } from "@/types/novel"
import { differenceInMonths } from "date-fns"
import { CrownIcon, MedalIcon, TrophyIcon } from "lucide-react"


export const getRankingLabel = (index: number, size?: "sm" | "lg") => {
  switch (index) {
    case 0: return <CrownIcon className={cn("size-5 text-yellow-400", size === "sm" && "size-4")} />
    case 1: return <TrophyIcon className={cn("size-5 text-slate-300", size === "sm" && "size-4")} />
    case 2: return <MedalIcon className={cn("size-5 text-amber-700", size === "sm" && "size-4")} />
    default: return <span className={cn("text-lg me-0.25 text-zinc-300", size === "sm" && "text-base")}>{index + 1}</span>
  }
}

export const checkIfNovelIsTrend = (novel: NovelSummary): boolean => {
  // If the novel was created this month and is on the ranking. Then is a trend. 
  const createdAt = new Date(novel.createdAt);
  const now = Date.now();
  return differenceInMonths(now, createdAt) < 1;
}

export const getOverallScore = (novel: NovelSummary) => {
  return Math.round(novel.bayesianScore * 20)
}