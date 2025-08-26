'use client'

import { env } from "@/env";
import { useIsMobile } from "@/hooks/use-mobile";
import { SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { cn } from "@/lib/utils";
import { useGetNovelSummaries } from "@/services/novels/client-queries";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DynamicBlurImage from "../dynamic-blur-image";
import BookCoverOverlay from "../novel-card/book-cover-overlay";
import HoverOverlay from "../novel-card/hover-overlay";
import InfoOverlay from "../novel-card/info-overlay";
import SkeletonLoader from "./skeleton-loader";
import { SearchIcon } from "lucide-react";

const SearchContent = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const page = searchParams.get("page");
  const novelsQuery = useGetNovelSummaries({ q: q ?? undefined, page: Number(page), size: 18, sort: SortKey.BAYESIAN_RANKING });

  useEffect(() => {
    if (q) {
      novelsQuery.refetch();
    }
  }, [page, q, novelsQuery]);

  if (novelsQuery.isLoading) {
    return <SkeletonLoader />
  }

  if (novelsQuery.isError) {
    router.push("/error");
  }

  if (!novelsQuery.data?.totalItems) {
    return <Empty q={q} />
  }

  return (
    <section className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {novelsQuery.data?.results.map(novel => (
        <Link href={`/novels/${novel.slug}`} key={novel.id} className="relative group">
          <div className="relative aspect-[2/3] overflow-hidden rounded-r-md shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-md shadow-accent">
            <DynamicBlurImage
              src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
              alt={`${novel.title} cover`}
              className="object-cover object-center w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 opacity-90"
              sizes={"(max-width: 768px) 30vw, 10vw"}
              fill
            />
            <BookCoverOverlay />
            <HoverOverlay info={{ author: novel.author, title: novel.title }} size="lg" />
            <InfoOverlay ratingValue={novel.ratingValue} status={novel.status} />
          </div>

          <p className={cn("font-semibold text-ellipsis whitespace-nowrap max-w-full text-[12px] md:text-[13px] overflow-hidden capitalize group-hover:opacity-50 transition-opacity duration-300", { "text-[13px] md:text-[14px]": !isMobile })}>
            {novel.title}
          </p>
        </Link>
      ))}
    </section>
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
