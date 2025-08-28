'use client'

import GenericPagination from "@/components/generic-pagination";
import { nuqsNovelSummariesParams, SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { useGetNovelSummaries } from "@/services/novels/client-queries";
import { motion } from "framer-motion";
import { BookIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import ClientNovelCard from "../../novel-card/client-novel-card";
import SkeletonLoader from "./skeleton-loder";

const NovelList = () => {
  const router = useRouter();
  const [params, setParams] = useQueryStates(nuqsNovelSummariesParams);

  const query = useGetNovelSummaries({ enabled: true, params: { q: params.q, page: params.page, size: 18, sort: SortKey.BAYESIAN_RANKING } });

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
      className="space-y-2"
    >
      <div className="relative grid grid-cols-3 md:grid-cols-6 gap-4 gap-y-6">
        {query.data?.results.map((novel) => (
          <motion.div
            layout
            className="relative group"
            key={novel.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ClientNovelCard key={novel.id} novel={novel} size="lg" />
          </motion.div>
        ))}
      </div>
      {query.data?.totalPages > 1 ? (
        <GenericPagination query={query.data!} handlePage={handlePage} />
      ) : null}
    </motion.div>
  )
}

export default NovelList;
