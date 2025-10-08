import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { LoaderIcon } from "lucide-react";
import NovelsCarousel from "../novels-carousel";

const Ongoing = async () => {
  const ongoing = await getNovelSummaries({ size: 12, sort: SortKey.BAYESIAN_RANKING, status: "ON_GOING" });
  return (
    <section className="w-full space-y-6">
      <SectionHeader
        icon={LoaderIcon}
        title="Ongoing Series"
        viewMore={{ href: "/novels?status=ON_GOING", title: "View More" }}
        titleClassName="text-lg"
      />
      <NovelsCarousel novels={ongoing.results} />
    </section>
  )
}

export default Ongoing;
