'use client'

import Loading from "@/components/loading";
import { nuqsTagsParams } from "@/lib/schemas/tags-schema";
import { getTagsInitialParams, useGetTags } from "@/services/novels/client-queries";
import { HashIcon } from "lucide-react";
import Link from "next/link";
import { useQueryStates } from "nuqs";
import GenericPagination from "../generic-pagination";

const TagsContainer = () => {
  const [params, setParams] = useQueryStates(nuqsTagsParams);

  const query = useGetTags({
    ...getTagsInitialParams,
    firstLetter: params.letter,
    page: params.page
  });

  if (query.isLoading) {
    return <Loading />
  }

  const handlePage = (page: number) => {
    setParams({ ...params, page });
  }

  return (
    <>
      <div className="grid gap-y-6 gap-x-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 text-xs xs:text-sm lg:text-base">
        {query.data?.results.map(tag => (
          <Link href={`/tags/${tag.name.toLowerCase()}`} key={tag.id} className="capitalize group text-zinc-300/90 transition-all hover:text-zinc-200 duration-200 cursor-pointer ease-in hover:translate-x-1 hover:-translate-y-0.5 relative">
            <div className="flex items-center gap-1">
              <HashIcon className="size-3.5 shrink-0 sm:block group-hover:text-red-700/80" />
              <p className="line-clamp-1">
                {tag.name.toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {query.data && query.data.totalPages > 1 && (
        <GenericPagination query={query.data} handlePage={handlePage} className="mt-10" />
      )}
    </>
  )
}

export default TagsContainer;
