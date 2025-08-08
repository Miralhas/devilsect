import NovelCard from "@/components/novel-card";
import { NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import Link from "next/link";

const ReleasesGrid = (res: PaginatedQuery<NovelSummary[]>) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-around">
      {res.results.slice(4).map(novel => (
        <Link href={`/novels/${novel.slug}`} className="group space-y-2 [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block max-w-[115px]" key={novel.id} >
          <NovelCard novelSummary={novel} />
        </Link>
      ))}
    </div>
  )
}

export default ReleasesGrid;
