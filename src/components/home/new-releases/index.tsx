import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { Clock } from "lucide-react";
import ReleasesCardHorizontal from "./releases-card-horizontal";
import ReleasesGrid from "./releases-grid";

const NewReleases = async () => {
  const res = await getNovelSummaries({ size: 14, sort: SortKey.NEWEST_RELEASES });

  return (
    <section className="w-full space-y-6">
      <SectionHeader icon={Clock} title="New Releases" />
      <div className="flex flex-col lg:flex-row gap-6">
        <ReleasesCardHorizontal {...res} />
        <ReleasesGrid {...res} />
      </div>
    </section >
  )
}

export default NewReleases;
