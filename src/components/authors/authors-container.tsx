'use client'

import Loading from "@/components/loading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { initialAuthorsParams, mapSortKey, nuqsAuthorsParams } from "@/lib/schemas/search-params/author-params-schema";
import { useGetAuthors } from "@/service/info/queries/use-get-all-authors";
import { UserRoundPen } from "lucide-react";
import Link from "next/link";
import { useQueryStates } from "nuqs";
import GenericPagination from "../generic-pagination";

const AuthorsContainer = () => {
  const [params, setParams] = useQueryStates(nuqsAuthorsParams);
  const query = useGetAuthors({ ...initialAuthorsParams, page: params.page, sort: mapSortKey(params.sort), q: params.q });

  if (query.isLoading) {
    return <Loading />
  }

  const handlePage = (page: number) => {
    setParams({ ...params, page });
  }

  return (
    <>
      <div className="grid gap-y-6.5 gap-x-16 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-base md:text-base px-4.5">
        {query.data?.results.map(author => (
          <Link href={`/authors/${author.name.toLowerCase()}`} key={author.name} className=" capitalize group text-zinc-300/90 transition-all hover:text-zinc-200 duration-200 cursor-pointer ease-in hover:translate-x-1 hover:-translate-y-0.5 relative">
            <div className="flex items-center gap-2">
              <UserRoundPen className="size-4 text-muted-foreground shrink-0 sm:block group-hover:text-red-700/80" />
              <Tooltip delayDuration={300}>
                <TooltipTrigger className="text-start line-clamp-1 capitalize cursor-pointer">
                  {author.name.toLowerCase()}
                </TooltipTrigger>
                <TooltipContent className="capitalize text-center bg-secondary border border-zinc-50/10 text-zinc-200">
                  {author.name.toLowerCase()}
                </TooltipContent>
              </Tooltip>
              <span className="text-sm text-muted-foreground capitalize">({author.novelsCount})</span>
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

export default AuthorsContainer;
