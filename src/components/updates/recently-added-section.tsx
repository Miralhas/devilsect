'use client'

import { latestInitialParams, useGetLatest } from "@/services/novels/client-queries";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { parseAsIndex, useQueryState } from "nuqs";
import ChaptersGrid from "../home/recently-added-chapters/chapters-grid";
import GenericPagination from "../generic-pagination";
import { BookOpenText } from "lucide-react";

const RecentlyAddedSection = () => {
  const router = useRouter();
  const [page, setPage] = useQueryState("page", parseAsIndex.withDefault(0).withOptions({ scroll: true }));
  const query = useGetLatest({ ...latestInitialParams, page });

  if (query.isLoading) {
    return <Loading />
  }

  if (query.isError) {
    router.push("/error");
  }

  if (!query.data?.results.length) {
    return (
      <div className="grid min-h-[40vh] place-items-center bg-secondary/10 border">
        <div className="text-center">
          <div className="size-18 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-6">
            <BookOpenText className="size-9 text-red-800" />
          </div>
          <p className="text-zinc-300 font-semibold text-lg md:text-xl">No results found</p>
        </div>
      </div>
    );
  }

  const handlePage = (page: number) => {
    setPage(page);
  }

  return (
    <>
      <div className="min-h-[60vh]">
        <ChaptersGrid chapters={query.data!} />
      </div>
      {query.data && query.data?.results.length > 0 && query.data?.totalPages > 1 && (
        <GenericPagination query={query.data} handlePage={handlePage} />
      )}
    </>
  )
}

export default RecentlyAddedSection;
