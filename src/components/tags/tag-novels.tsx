'use client'

import { mapSortKey, nuqsNovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { novelSummariesInitialParams, useGetNovelSummaries } from "@/service/novels/queries/use-get-novel-summaries";
import { Tag } from "@/types/novel";
import { BookIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { PropsWithChildren } from "react";
import GenericPagination from "../generic-pagination";
import SortGenreNovels from "../genres/sort-genre-novels";
import ClientNovelCard from "../novel-card/client-novel-card";
import SkeletonLoader from "../search/skeleton-loader";

const TagNovels = ({ tag }: { tag: Tag }) => {
  const router = useRouter();
  const [params, setParams] = useQueryStates(nuqsNovelSummariesParams);
  const query = useGetNovelSummaries({
    enabled: true,
    params: {
      ...novelSummariesInitialParams,
      page: params.page,
      size: 18,
      tags: tag.name,
      sort: mapSortKey(params.sort)
    }
  });

  if (query.isLoading) {
    return (
      <Layout>
        <SkeletonLoader />
      </Layout>
    )
  }

  if (query.isError) {
    router.push("/error");
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

  const handlePage = (page: number) => {
    setParams({ ...params, page });
  }

  return (
    <Layout>
      <section className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <div className="flex items-center justify-between col-span-full">
          <h2 className="md:text-xl lg:text-2xl font-bold capitalize">{tag.name} Tagged Novels</h2>
          <p className="text-sm md:text-base md:text-[15px] text-muted-foreground">{query.data?.totalItems} novels found</p>
        </div>
        {query.data?.results.map(novel => (
          <Link href={`/novels/${novel.slug}`} key={novel.id} className="relative group">
            <ClientNovelCard novel={novel} size="lg" />
          </Link>
        ))}
      </section>
      {query.data && query.data?.totalPages > 1 ? (
        <GenericPagination query={query.data!} handlePage={handlePage} className="mt-10" />
      ) : null}
    </Layout>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex items-center justify-end">
        <SortGenreNovels className="w-full md:max-w-[180px]" />
      </div>
      {children}
    </>
  )
}

export default TagNovels;
