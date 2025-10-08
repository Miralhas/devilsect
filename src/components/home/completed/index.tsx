import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { BookCheckIcon } from "lucide-react";
import NovelsCarousel from "../novels-carousel";

const Completed = async () => {
  const completed = await getNovelSummaries({ size: 12, sort: SortKey.BAYESIAN_RANKING, status: "COMPLETED" });
  return (
    <section className="w-full space-y-6">
      <SectionHeader
        icon={BookCheckIcon}
        title="Completed Series"
        viewMore={{ href: "/novels?status=COMPLETED", title: "View More" }}
        titleClassName="text-lg"
      />
      <NovelsCarousel novels={completed.results} />
    </section>
  )
}

export default Completed;
