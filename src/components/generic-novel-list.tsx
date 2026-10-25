'use client'

import { NovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { useGetNovelSummaries } from "@/service/novels/queries/use-get-novel-summaries";
import { BookIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import GenericPagination from "./generic-pagination";
import NovelCard from "./novel-card";
import NovelsSort from "./novels-sort";
import SkeletonLoader from "./search/skeleton-loader";

type Props = {
  params: NovelSummariesParams;
  enabled?: boolean;
  handlePage: (page: number) => void;
  title: string;
  filter?: boolean;
}

const GenericNovelList = ({ params, handlePage, title, enabled = true, filter = true }: Props) => {
  const router = useRouter();

  const query = useGetNovelSummaries({
    enabled,
    params,
  });

  if (query.isLoading) {
    return (
      <Layout filter={filter}>
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

  return (
    <Layout filter={filter}>
      <section className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <div className="flex items-center justify-between col-span-full">
          <h2 className="text-xl md:text-2xl font-bold capitalize">{title}</h2>
          <p className="text-base text-[15px] text-muted-foreground">{query.data?.totalItems} novels found</p>
        </div>
        {query.data?.results.map(novel => (
          <Link href={`/novels/${novel.slug}`} key={novel.id} className="relative group space-y-1">
            <NovelCard novelSummary={novel} size="lg" />
          </Link>
        ))}
      </section>
      {query.data && query.data?.totalPages > 1 ? (
        <GenericPagination query={query.data!} handlePage={handlePage} className="mt-10" />
      ) : null}
    </Layout>
  )
}

const Layout = ({ children, filter }: PropsWithChildren<{ filter: boolean }>) => {
  return (
    <>
      {filter && (
        <div className="flex items-center justify-end">
          <NovelsSort className="w-full md:max-w-[180px]" />
        </div>
      )}
      {children}
    </>
  )
}

export default GenericNovelList;
