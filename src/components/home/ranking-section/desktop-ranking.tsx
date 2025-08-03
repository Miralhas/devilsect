import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { statusMap } from "@/lib/utils";
import { NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { BookOpenText, StarIcon } from "lucide-react";
import Link from "next/link";
import ShowMoreButton from "./show-more-button";

type DesktopRankingProps<T> = {
  queries: PaginatedQuery<T>[]
}

const DesktopRanking = ({ queries }: DesktopRankingProps<NovelSummary[]>) => {
  return (
    <div className="w-full">
      <div className="flex w-full">
        <ScrollArea className="w-32 min-h-0 flex-1 overflow-x-scroll overflow-y-hidden lg:overflow-hidden">
          <div className="w-full grid grid-cols-[repeat(4,minmax(280px,1fr))] grid-rows-[min-content_max-content] gap-x-5 gap-y-7 max-h-[503px] pb-1" id="ranking-grid">
            <div className="col-span-1 row-start-1 relative w-full">
              <div className="max-w-max border border-accent px-3 lg:px-6 py-1.5 bg-primary">
                <h1 className="text-lg font-semibold tracking-tight">Most Acclaimed</h1>
              </div>
            </div>
            <div className="col-span-1 row-start-1 relative w-full">
              <div className="max-w-max border border-accent px-3 lg:px-6 py-1.5 bg-primary">
                <h1 className="text-lg font-semibold tracking-tight">New Trends</h1>
              </div>
            </div>
            <div className="col-span-1 row-start-1 relative w-full">
              <div className="max-w-max border border-accent px-3 lg:px-6 py-1.5 bg-primary">
                <h1 className="text-lg font-semibold tracking-tight">Most Read</h1>
              </div>
            </div>
            <div className="col-span-1 row-start-1 relative w-full">
              <div className="max-w-max border border-accent px-3 lg:px-6 py-1.5 bg-primary">
                <h1 className="text-lg font-semibold tracking-tight">Best Rated</h1>
              </div>
            </div>
            {queries.map((query, i) => (
              <div className="col-span-1 h-full flex flex-col gap-3" key={i}>
                {query.results.map((novel, i) => (
                  <Link href="/" key={i} className="flex gap-2.5 transition-all duration-200 shadow-sm shadow-accent/30 group hover:shadow-md hover:shadow-accent/80 hover:text-accent ease-in-out hover:translate-x-1 hover:-translate-y-1" >
                    <div className="aspect-[3/4] h-[75px] overflow-hidden rounded-sm relative group">
                      <DynamicBlurImage
                        src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
                        alt={novel.title + " cover"}
                        className="w-full h-auto object-cover object-center align-middle duration-300 transition-transform ease-in-out group-hover:scale-110"
                        height={75}
                        width={62.5}
                        fill={false}
                      />
                    </div>
                    <div className="flex-1 gap-1.5 self-stretch flex flex-col">
                      <p className="font-bold line-clamp-1 text-sm text-[12px] md:text-[14px] overflow-hidden capitalize">{novel.title}</p>
                      <div className="flex gap-3 items-center text-muted-foreground">
                        <div className="text-xs font-bold flex gap-1 items-center">
                          <StarIcon className="size-3 text-yellow-500" fill="#D3AF37" />
                          <span className="text-xs text-[11px]">{novel.ratingValue ?? '4.74'}</span>
                        </div>
                        <div className="flex items-center gap-1  font-semibold">
                          <BookOpenText className="size-4" />
                          <p className="text-sm text-[12px] overflow-hidden line-clamp-1">{novel.chaptersCount} Chapters</p>
                        </div>
                      </div>
                      <p className="text-sm text-[12px] font-semibold text-muted-foreground">{statusMap[novel.status]}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <ShowMoreButton />
    </div>
  )
}

export default DesktopRanking;
