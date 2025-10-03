import DynamicBlurImage from "@/components/dynamic-blur-image";
import BookCoverOverlay from "@/components/novel-card/book-cover-overlay";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { env } from "@/env";
import { PaginatedQuery } from "@/types/pagination";
import { RecentlyAddedChapter } from "@/types/recently-added-chapters";
import { formatDate } from "@/utils/date-utils";
import { BookOpenText, TimerIcon } from "lucide-react";
import Link from "next/link";

const ChaptersGrid = ({ chapters }: { chapters: PaginatedQuery<RecentlyAddedChapter[]> }) => {

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3 md:gap-y-2">
        {chapters.results.map((chapter) => {
          return (
            <div className="group flex gap-2 relative items-center px-1 col-span-1 hover:bg-secondary/60 rounded-md" key={chapter.id}>
              <div className="h-[65px] min-w-[50px] overflow-hidden rounded-r-sm relative">
                <DynamicBlurImage
                  fill
                  sizes="(max-width: 768px) 33vw, 5vw"
                  alt={`${chapter.novelTitle} cover`}
                  className="object-cover w-full transition-transform group-hover:scale-105 duration-200 ease-in-out"
                  src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${chapter.novelSlug}/image`}
                  default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
                />
                <BookCoverOverlay />
              </div>
              <div className="space-y-0.5">
                <Tooltip delayDuration={300}>
                  <TooltipTrigger className="flex cursor-pointer text-start">
                    <Link
                      href={`/novels/${chapter.novelSlug}`}
                      className="transition-colors line-clamp-1 capitalize text-zinc-300/70 text-sm text-[13px] leading-4"
                    >
                      {chapter.novelTitle}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="capitalize text-center bg-secondary border border-zinc-50/10 text-zinc-200">
                    {chapter.novelTitle}
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={300}>
                  <TooltipTrigger className="flex cursor-pointer text-start">
                    <Link
                      href={`/novels/${chapter.novelSlug}/${chapter.slug}`}
                      className="text-sm text-[13px] line-clamp-1 w-full transition-colors text-zinc-200 font-semibold"
                    >
                      {chapter.title}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="capitalize text-center bg-secondary border border-zinc-50/10 text-zinc-200">
                    {chapter.title}
                  </TooltipContent>
                </Tooltip>
                <div className="flex flex-col text-muted-foreground text-xs">
                  <span className="text-muted-foreground text-xs">{chapter.author}</span>
                  <div className="flex items-center gap-1.5">
                    <p className="font-light inline-flex gap-1 items-center">
                      <BookOpenText className="size-3" />
                      <span>Ch. {chapter.chapterNumber}</span>
                    </p>
                    -
                    <p className="inline-flex gap-1 items-center">
                      <TimerIcon className="size-3" />
                      <span>{formatDate(chapter.createdAt)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ChaptersGrid;
