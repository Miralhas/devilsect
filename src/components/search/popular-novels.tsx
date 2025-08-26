'use client'

import { SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { useGetNovelSummaries } from "@/services/novels/client-queries";
import Link from "next/link";
import ClientNovelCard from "../novel-card/client-novel-card";
import SkeletonLoader from "./skeleton-loader";

const PopularNovels = () => {
  const novelsQuery = useGetNovelSummaries({ params: { size: 30, sort: SortKey.BAYESIAN_RANKING }, enabled: true });

  if (novelsQuery.isLoading) {
    return <SkeletonLoader size={30} className="grid-cols-4 md:grid-cols-10" />
  }

  return (
    <div className="space-y-4">
      <div className="py-2 border-b border-zinc-50/15">
        <h2 className="text-zinc-300 text-xl md:text-2xl tracking-tight font-medium">Popular Novels</h2>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-10 gap-4">
        {novelsQuery.data?.results.map((novel) => (
          <Link
            key={novel.id}
            className="group space-y-2 "
            href={`/novels/${novel.slug}`}>
            <ClientNovelCard novel={novel} size="sm" imageSizes="(max-width: 768px) 30vw, 10vw" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularNovels;
