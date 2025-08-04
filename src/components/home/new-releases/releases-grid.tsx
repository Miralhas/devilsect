import NovelCard from "@/components/novel-card";
import { NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";

const ReleasesGrid = (res: PaginatedQuery<NovelSummary[]>) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-around">
      {res.results.slice(4).map(novel => (
        <NovelCard {...novel} key={novel.id} />
      ))}
    </div>
  )
}

export default ReleasesGrid;
