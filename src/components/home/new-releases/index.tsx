import { SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { getNovelSummariesPaginated } from "@/services/novels/server-queries";
import Link from "next/link";
import ReleasesCardHorizontal from "./releases-card-horizontal";
import ReleasesGrid from "./releases-grid";

const NewReleases = async () => {
  const res = await getNovelSummariesPaginated({ size: 12, sort: SortKey.NEWEST_RELEASES });

  return (
    <section className="w-full space-y-4">
      <div className="flex justify-between items-baseline">
        <p className="text-lg md:text-3xl font-semibold tracking-tight">New Releases</p>
        <Link href="/" className="text-sm md:text-base text-muted-foreground hover:text-zinc-200 transition-colors duration-200">All Releases</Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <ReleasesCardHorizontal {...res} />
        <ReleasesGrid {...res} />
      </div>
    </section >
  )
}

export default NewReleases;
