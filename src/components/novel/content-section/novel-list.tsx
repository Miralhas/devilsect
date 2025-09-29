'use client'

import GenericPagination from "@/components/generic-pagination";
import NovelCard from "@/components/novel-card";
import { mapSortKey, nuqsNovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { useGetNovelSummaries } from "@/service/novels/queries/use-get-novel-summaries";
import { motion } from "framer-motion";
import { BookIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import SkeletonLoader from "./skeleton-loder";

const MotionLink = motion.create(Link);

const NovelList = () => {
  const router = useRouter();
  const [params, setParams] = useQueryStates(nuqsNovelSummariesParams);

  const genres = params.genres.join(",");

  const query = useGetNovelSummaries({
    enabled: true,
    params: {
      genres,
      size: 18,
      q: params.q,
      page: params.page,
      status: params.status,
      sort: mapSortKey(params.sort),
      chaptersRange: params.chaptersRange,
    }
  });

  if (query.isLoading) {
    return <SkeletonLoader />
  }

  if (query.isError) {
    router.push("/error");
  }

  const handlePage = (page: number) => {
    setParams({ ...params, page });
  }

  if (!query.data?.results.length) {
    return (
      <div className="grid min-h-[40vh] place-items-center bg-secondary/20 border">
        <div className="text-center">
          <div className="size-18 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-6">
            <BookIcon className="size-9 text-red-800" />
          </div>
          <p className="text-zinc-300 font-semibold text-lg md:text-xl">No results found</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      layoutId="novel-list-container"
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-2xl font-bold">All Novels</h2>
        <p className="text-sm text-[13px] md:text-base md:text-[15px] text-muted-foreground">{query.data.totalItems} novels found</p>
      </div>
      <div className="relative grid grid-cols-3 md:grid-cols-6 gap-4 min-h-[50vh] items-start">
        {query.data?.results.map((novel) => (
          <MotionLink
            layout
            className="relative group col-span-1 space-y-1"
            key={novel.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            href={`/novels/${novel.slug}`}
          >
            <NovelCard key={novel.id} novelSummary={novel} size="lg" imageSizes="(max-width: 768px)30vw, 10vw" />
          </MotionLink>
        ))}
      </div>
      {query.data?.totalPages > 1 ? (
        <GenericPagination query={query.data!} handlePage={handlePage} className="mt-14" />
      ) : null}
    </motion.div>
  )
}

export default NovelList;
