'use client'

import { SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { useGetNovelSummaries } from "@/services/novels/client-queries";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ClientNovelCard from "../novel-card/client-novel-card";
import GenericPagination from "../generic-pagination";
import SkeletonLoader from "./skeleton-loader";

const SearchContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const page = searchParams.get("page");
  const novelsQuery = useGetNovelSummaries({ params: { q: q ?? undefined, page: (Number(page) - 1), size: 18, sort: SortKey.BAYESIAN_RANKING } });

  if (novelsQuery.isLoading) {
    return <SkeletonLoader />
  }

  if (novelsQuery.isError) {
    router.push("/error");
  }

  if (!novelsQuery.data?.results.length) {
    return <Empty q={q} />
  }

  return (
    <>
      <section className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {novelsQuery.data?.results.map(novel => (
          <Link href={`/novels/${novel.slug}`} key={novel.id} className="relative group">
            <ClientNovelCard novel={novel} size="lg" />
          </Link>
        ))}
      </section>
      {novelsQuery.data.totalPages > 1 ? (
        <GenericPagination query={novelsQuery.data} />
      ) : null}
    </>
  )
}

const Empty = ({ q }: { q: string | null }) => {

  if (q) {
    return (
      <div className="grid place-items-center">
        <div className="text-center">
          <div className="size-18 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-6">
            <SearchIcon className="size-9 text-red-800" />
          </div>
          <p className="text-zinc-300 font-semibold text-lg md:text-xl">No results found for {`"${q}"`}</p>
          <p className="text-muted-foreground text-sm">Try Searching for something else</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid place-items-center">
      <div className="text-center">
        <div className="size-18 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-6">
          <SearchIcon className="size-9 text-red-800" />
        </div>
        <p className="text-zinc-300 font-semibold text-lg md:text-xl">Start typing to search</p>
        <p className="text-muted-foreground text-sm">Find your favorite books</p>
      </div>
    </div>
  )
}

export default SearchContent;
