import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import { statusMap } from "@/utils/api-utils";
import { cn } from "@/utils/common-utils";
import { leadingZero } from "@/utils/number-utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { BookOpenText, StarIcon } from "lucide-react";
import Link from "next/link";
import ShowMoreButton from "./show-more-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getBlurData } from "@/lib/get-blur-data";

type DesktopRankingProps<T> = {
  queries: PaginatedQuery<T>[]
}

const rankingClassnames = (index: number) => {
  return cn("text-zinc-300/60", {
    "text-yellow-400/70": index === 0,
    "text-blue-300/70": index === 1,
    "text-amber-700/70": index === 2,
  })
}

const DesktopRanking = ({ queries }: DesktopRankingProps<NovelSummary[]>) => {
  const maxHeight = "max-h-[503px]";
  return (
    <div className="w-full">
      <div className="flex w-full">
        <ScrollArea className="w-32 min-h-0 flex-1 overflow-x-scroll overflow-y-hidden lg:overflow-hidden">
          <div
            id="ranking-grid"
            className={`w-full grid grid-cols-[repeat(4,minmax(280px,1fr))] grid-rows-[min-content_max-content] gap-x-5 gap-y-7 pb-1 ${maxHeight}`}
          >
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
                {query.results.map(async (novel, i) => {
                  const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`);
                  return (
                    <Link href={`/novels/${novel.slug}`} key={novel.id} className="flex gap-2 transition-all duration-200 shadow-sm shadow-accent/30 group hover:shadow-md hover:shadow-accent/80 hover:text-accent ease-in-out hover:translate-x-1 hover:-translate-y-1" >
                      <div className="aspect-[3/4] h-[75px] overflow-hidden rounded-sm relative group">
                        <DynamicBlurImage
                          src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
                          alt={novel.title + " cover"}
                          className="w-full h-auto object-cover object-center align-middle duration-300 transition-transform ease-in-out group-hover:scale-110"
                          sizes="(max-width: 768px) 25vw, 10vw"
                          default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
                          blurData={base64}
                        />
                      </div>
                      <div className="flex w-max text-sm font-medium tracking-tighter">
                        <p className={rankingClassnames(i)}>{leadingZero(i + 1, 2)}</p>
                      </div>
                      <div className="flex-1 gap-1.5 self-stretch flex flex-col">
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger className="text-start cursor-pointer">
                            <p className="font-bold line-clamp-1 text-sm text-[12px] md:text-[14px] overflow-hidden capitalize">
                              {novel.title}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent className="capitalize text-center bg-secondary border border-zinc-50/10 text-zinc-200">
                            {novel.title}
                          </TooltipContent>
                        </Tooltip>
                        <div className="flex gap-3 items-center text-muted-foreground">
                          <div className="text-xs font-bold flex gap-1 items-center">
                            <StarIcon className="size-3 text-yellow-500" fill="#D3AF37" />
                            <span className="text-xs text-[11px]">{novel.ratingValue ?? 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1  font-semibold">
                            <BookOpenText className="size-4" />
                            <p className="text-sm text-[12px] overflow-hidden line-clamp-1">{novel.chaptersCount} Chapters</p>
                          </div>
                        </div>
                        <p className="text-sm text-[12px] font-semibold text-muted-foreground">{statusMap[novel.status]}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <ShowMoreButton className={maxHeight} elementId="ranking-grid" />
    </div>
  )
}

export default DesktopRanking;
