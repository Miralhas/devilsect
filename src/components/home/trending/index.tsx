import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { TrendingUpIcon } from "lucide-react";
import NovelsCarousel from "../novels-carousel";

const Trending = async () => {
  const trending = await getNovelSummaries({ size: 12, sort: SortKey.BAYESIAN_RANKING, page: 1 });

  return (
    <section className="w-full space-y-6">
      <SectionHeader icon={TrendingUpIcon} title="Trending" viewMore={{ href: "/novels", title: "View More" }} />
      <NovelsCarousel novels={trending.results} />
    </section>
  )
}

export default Trending;
