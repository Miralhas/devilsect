import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { StarIcon } from "lucide-react";
import NovelsCarousel from "../novels-carousel";

const BestRated = async () => {
  const bestRated = await getNovelSummaries({ size: 12, sort: SortKey.MOST_RATED });

  return (
    <section className="w-full space-y-6">
      <SectionHeader icon={StarIcon} title="Best Rated" viewMore={{ href: "/novels?sort=rating", title: "View More" }} />
      <NovelsCarousel novels={bestRated.results} />
    </section>
  )
}

export default BestRated;
