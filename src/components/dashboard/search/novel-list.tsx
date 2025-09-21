'use client'

import Loading from "@/components/loading";
import { SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { useGetNovelSummaries } from "@/services/novels/client-queries";
import NovelItem from "./novel-item";
import { SearchIcon } from "lucide-react";
import { Label } from "@/components/ui/label";


const NovelList = ({ title }: { title: string }) => {
  const query = useGetNovelSummaries({ params: { q: title, size: 18, sort: SortKey.NEWEST_RELEASES } });

  if (query.isLoading) {
    return <Loading className="min-h-[30vh]" />
  }

  if (query.isError) {
    return (
      <div className="flex items-center justify-center min-h-[30vh]">
        <p>Error...</p>
      </div>
    )
  }

  if (!query.data?.results.length) {
    return <Empty q={title} />
  }

  return (
    <>
      <Label className="text-muted-foreground text-xs font-medium">Novels</Label>
      <div className="flex flex-col gap-2.5 h-[250px] overflow-auto">
        {query.data?.results.map(novel => (
          <NovelItem key={novel.id} novel={novel} />
        ))}
      </div>
    </>
  )
}

const Empty = ({ q }: { q: string | null }) => {

  if (q) {
    return (
      <div className="grid place-items-center min-h-[30vh]">
        <div className="text-center">
          <div className="size-12 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-3.5">
            <SearchIcon className="size-5 text-red-800" />
          </div>
          <p className="text-zinc-300 font-semibold text-lg">No results found for {`"${q}"`}</p>
          <p className="text-muted-foreground text-sm">Try Searching for something else</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid place-items-center min-h-[30vh]">
      <div className="text-center">
        <div className="size-12 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-3.5">
          <SearchIcon className="size-5 text-red-800" />
        </div>
        <p className="text-zinc-300 font-semibold text-lg">Start typing to search</p>
        <p className="text-muted-foreground text-sm">Find your favorite books</p>
      </div>
    </div>
  )
}

export default NovelList;
