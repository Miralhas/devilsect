import NovelCard from "@/components/novel-card";
import { NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";

const ReleasesGrid = (res: PaginatedQuery<NovelSummary[]>) => {
  return (
    <div className="grid grid-cols-[repeat(3,minmax(80,115px))] md:grid-cols-[repeat(5,minmax(80,115px))] lg:grid-cols-[repeat(5,minmax(0,115px))] gap-4 justify-around">
      {res.results.map(novel => (
        <NovelCard {...novel} key={novel.id} />
      ))}
    </div>
  )
}

export default ReleasesGrid;
