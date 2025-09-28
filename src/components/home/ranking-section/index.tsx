import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { Trophy } from "lucide-react";
import DesktopRanking from "./desktop-ranking";

const RankingSection = async () => {
  const bayesian = getNovelSummaries({ size: 10, sort: SortKey.BAYESIAN_RANKING });
  const views = getNovelSummaries({ size: 10, sort: SortKey.MOST_VIEWED });
  const trend = getNovelSummaries({ size: 10, sort: SortKey.MOST_RATED });

  const queries = await Promise.all([bayesian, trend, views, views]);

  return (
    <section className="space-y-6">
      <SectionHeader icon={Trophy} title="Ranking" viewMore={{ href: "/", title: "View More" }} />
      <DesktopRanking queries={queries} />
    </section>
  )
}

export default RankingSection;
