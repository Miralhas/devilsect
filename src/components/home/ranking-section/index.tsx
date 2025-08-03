import { SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { getNovelSummariesPaginated } from "@/services/novels/server-queries";
import Link from "next/link";
import DesktopRanking from "./desktop-ranking";

const RankingSection = async () => {
  const bayesian = getNovelSummariesPaginated({ size: 10, sort: SortKey.BAYESIAN_RANKING });
  const views = getNovelSummariesPaginated({ size: 10, sort: SortKey.MOST_VIEWED });
  const trend = getNovelSummariesPaginated({ size: 10, sort: SortKey.MOST_RATED });

  const queries = await Promise.all([bayesian, trend, views, views]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-baseline border-b pb-3">
        <p className="text-lg md:text-3xl font-semibold tracking-tight">Ranking</p>
        <Link href="/" className="text-sm md:text-base text-muted-foreground hover:text-zinc-200 transition-colors duration-200">View More</Link>
      </div>
      <DesktopRanking queries={queries} />
    </div>
  )
}

export default RankingSection;
