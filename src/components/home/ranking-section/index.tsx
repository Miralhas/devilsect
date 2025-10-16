import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { Trophy } from "lucide-react";
import DesktopRanking from "./desktop-ranking";
import { arrayShuffler } from "@/utils/array-utils";

const RankingSection = async () => {
  const bayesianP = getNovelSummaries({ size: 10, sort: SortKey.BAYESIAN_RANKING });
  const viewsP = getNovelSummaries({ size: 10, sort: SortKey.MOST_VIEWED });
  const newTrendsP = getNovelSummaries({ size: 10, sort: SortKey.NEWEST_RELEASES });
  const ratedP = getNovelSummaries({ size: 10, sort: SortKey.MOST_RATED });

  const [bayesian, newTrends, views, rated] = await Promise.all([bayesianP, newTrendsP, viewsP, ratedP]);

  arrayShuffler(views.results);

  newTrends.results = newTrends.results.sort((a, b) => {
    return b.bayesianScore - a.bayesianScore
  });

  return (
    <section className="space-y-6">
      <SectionHeader icon={Trophy} title="Ranking" viewMore={{ href: "/ranking", title: "View More" }} />
      <DesktopRanking queries={[bayesian, newTrends, views, rated]} />
    </section>
  )
}

export default RankingSection;