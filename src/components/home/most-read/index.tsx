import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { EyeIcon } from "lucide-react";
import NovelsCarousel from "../novels-carousel";

const MostRead = async () => {
  const mostRead = await getNovelSummaries({ size: 12, sort: SortKey.MOST_VIEWED });

  return (
    <section className="w-full space-y-6">
      <SectionHeader icon={EyeIcon} title="Most Read" viewMore={{ href: "/novels?sort=views", title: "View More" }} />
      <NovelsCarousel novels={mostRead.results} />
    </section>
  )
}

export default MostRead;
