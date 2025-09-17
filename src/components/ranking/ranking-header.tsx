import BlurCenter from "@/components/ui/blur-center";
import { Trophy } from "lucide-react";

const RankingHeader = () => {
  return (
    <>
      <BlurCenter opacity="low" />
      <div className="rounded-lg flex flex-col relative w-full gap-6 border bg-secondary/10 border-zinc-50/10 p-7">
        <BlurCenter opacity="medium" className="absolute" />
        <div className="flex items-center gap-2">
          <div className="rounded-sm flex justify-center items-center size-14 bg-accent/30 border border-accent">
            <Trophy className="size-8 text-red-500/50" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="inline-flex items-center gap-2 text-2xl md:text-4xl md:text-[33px] font-bold tracking-wide bg-gradient-to-r from-red-500/70 via-accent to-primary bg-clip-text text-transparent">
              Ranking
            </h1>
            <p className="text-muted-foreground text-base text-[15px]">Novel Leaderboard</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RankingHeader;
