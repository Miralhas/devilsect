import DynamicBlurImage from "@/components/dynamic-blur-image";
import { Badge } from "@/components/ui/badge";
import { NovelSummary } from "@/types/novel";
import { statusMap } from "@/utils/api-utils";
import { formatMonthYear } from "@/utils/date-utils";
import { formatViews } from "@/utils/number-utils";
import { BookOpenText, CalendarIcon, EyeIcon, FlameIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { env } from "process";
import { checkIfNovelIsTrend, getOverallScore, getRankingLabel } from "./utils";

type Props = {
  novels: NovelSummary[];
}


const MobileGridTable = async ({ novels }: Props) => {
  return (
    <section className="md:hidden space-y-2.5">
      {novels.map((novel, index) => {
        return (
          <div key={novel.id}
            className="group bg-zinc-950/50 border border-white/10 rounded-lg cursor-pointer transition-all duration-200 shadow-sm group hover:shadow-accent/70 hover:text-accent ease-in-out hover:translate-x-1 hover:-translate-y-1"
          >
            <div className="px-4 py-2.5 flex items-start gap-4 relative">
              <div className="flex flex-col items-center gap-2">
                <div className="border size-8 border-accent/70 bg-primary/30 rounded-full grid place-items-center">
                  {getRankingLabel(index, "sm")}
                </div>

                <div className="aspect-[3/4] w-[44px] overflow-hidden relative rounded-r-sm">
                  <DynamicBlurImage
                    src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
                    alt={novel.title + " cover"}
                    className="object-fill  object-center align-middle duration-300 transition-transform ease-in-out group-hover:scale-110"
                    width={44}
                    height={0}
                    fill={false}
                    priority={index <= 4}
                    default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
                  />
                  <div className="absolute inset-0 rounded-r-sm book-cover" />
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="space-y-0.5 max-w-[80%]">
                  <Link
                    href={`/novels/${novel.slug}`}
                    className="font-medium transition-colors line-clamp-2 capitalize w-full text-sm leading-none"
                  >
                    {novel.title}
                  </Link>

                  <div className="text-xs text-[13px] text-muted-foreground">
                    <p className="line-clamp-1"><span className="text-muted-foreground font-light text-xs text-[11px]">by</span>{" "}{novel.author}</p>
                  </div>
                </div>


                <div className="grid grid-cols-[min-content_min-content] gap-x-2 items-center">
                  <Badge variant="cool"
                    className="text-zinc-200 w-full max-w-[70px] whitespace-nowrap flex items-center py-0.5 pb-1 leading-none text-[10px]">
                    {statusMap[novel.status]}
                  </Badge>
                  {checkIfNovelIsTrend(novel) && (
                    <div className="relative flex items-center justify-center">
                      <span className="inline-flex gap-0.5 items-center justify-center border border-accent/90 bg-primary/40 text-xs text-[10px] text-red-700 font-bold px-1.5 pb-0.25 rounded-sm italic">HOT</span>
                      <FlameIcon className="size-3.5 absolute -top-1.5 -right-1.5 text-amber-600" />
                    </div>

                  )}
                </div>

                <div className="grid grid-cols-[max-content_max-content] grid-rows-2 gap-x-3.5 gap-y-1">
                  <div className="col-span-1 grid-start-1 text-zinc-300/80 flex items-center gap-1">
                    <EyeIcon className="size-4" />
                    <span className="text-xs">{formatViews(novel.views)} <span className="text-muted-foreground font-light text-xs text-[11px] inline-block">Views</span></span>
                  </div>
                  <div className="col-span-1 grid-start-1 text-zinc-300/80 flex items-center gap-1">
                    <StarIcon className="size-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs">{novel.ratingValue?.toFixed(2) ?? 'N/A'}{" "}<span className="text-muted-foreground font-light text-xs text-[11px]">Rating</span></span>
                  </div>
                  <div className="col-span-1 row-start-2 text-zinc-300/80 flex items-center gap-1">
                    <BookOpenText className="size-3.5" />
                    <span className="text-xs mb-0.25">{novel.chaptersCount}{" "}<span className="text-muted-foreground font-light text-xs text-[11px]">Chapters</span></span>
                  </div>
                  <div className="col-span-1 row-start-2 text-zinc-300/80 flex items-center gap-1">
                    <CalendarIcon className="size-3.5" />
                    <span className="text-xs">{formatMonthYear(novel.createdAt)}</span>
                  </div>
                </div>

              </div>

              <div className="absolute top-2.5 right-2 flex flex-col gap-1 text-zinc-300/80">
                <span className="text-center text-[10px] leading-none">Score</span>
                <div className="rounded-sm bg-gradient-to-b text-sm from-accent/80 to-primary/60 border border-accent text-white grid place-items-center w-11 h-7 xs:w-13 xs:h-9">
                  {getOverallScore(novel)}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default MobileGridTable;
