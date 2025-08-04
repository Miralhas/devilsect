import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { getNovelSummariesPaginated } from "@/services/novels/server-queries";
import { Trophy } from "lucide-react";
import DesktopRanking from "./desktop-ranking";

const RankingSection = async () => {
  const bayesian = getNovelSummariesPaginated({ size: 10, sort: SortKey.BAYESIAN_RANKING });
  const views = getNovelSummariesPaginated({ size: 10, sort: SortKey.MOST_VIEWED });
  const trend = getNovelSummariesPaginated({ size: 10, sort: SortKey.MOST_RATED });

  const queries = await Promise.all([bayesian, trend, views, views]);

  return (
    <div className="space-y-6">
      <SectionHeader icon={Trophy} title="Ranking" viewMore={{ href: "/", title: "View More" }} />
      <DesktopRanking queries={queries} />
    </div>
  )
}

export default RankingSection;
