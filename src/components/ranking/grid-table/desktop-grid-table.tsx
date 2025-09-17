import DynamicBlurImage from "@/components/dynamic-blur-image";
import { Badge } from "@/components/ui/badge";
import { env } from "@/env";
import { formatMonthYear, formatViews, statusMap } from "@/lib/utils";
import { NovelSummary } from "@/types/novel";
import { BookOpenText, CalendarIcon, EyeIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { checkIfNovelIsTrend, getOverallScore, getRankingLabel } from "./utils";

type Props = {
  novels: NovelSummary[];
}

const DesktopGridTable = ({ novels }: Props) => {
  return (
    <section className="hidden md:block space-y-2.5">
      {novels.map((novel, index) => {
        return (
          <div key={novel.id}
            className="group bg-zinc-950/50 border border-white/10 rounded-lg cursor-pointer transition-all duration-200 shadow-sm group hover:shadow-accent/70 hover:text-accent ease-in-out hover:translate-x-1 hover:-translate-y-1"
          >
            <div className="grid grid-cols-[minmax(0,70px)_minmax(0,70px)_minmax(0,1fr)_minmax(0,0.4fr)_minmax(0,0.5fr)_minmax(0,0.4fr)_minmax(0,0.5fr)_minmax(0,0.5fr)_minmax(0,0.5fr)] gap-4 auto-rows-[96px] items-center justify-center">

              <div className="border size-11 border-accent/70 bg-primary/30 rounded-full grid place-items-center ms-4 col-span-1">
                {getRankingLabel(index)}
              </div>

              <div className="w-full max-w-[48px] aspect-[3/4] overflow-hidden relative rounded-r-sm col-span-1">
                <DynamicBlurImage
                  src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
                  alt={novel.title + " cover"}
                  className="w-full h-auto object-fill object-center align-middle duration-300 transition-transform ease-in-out group-hover:scale-110"
                  sizes="(max-width: 768px) 20vw, 10vw"
                  fill
                  default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
                />
                <div className="absolute inset-0 rounded-r-sm book-cover" />
              </div>

              <div className="min-w-0 justify-self-start space-y-0.5 col-span-1">
                {checkIfNovelIsTrend(novel) && (
                  <span className="inline-block border border-accent/90 bg-primary/40 text-xs text-[10px] text-red-700 font-bold px-1.5 py-0.25 rounded-sm ">HOT</span>
                )}
                <Link
                  href={`/novels/${novel.slug}`}
                  className="font-medium capitalize hover:text-accent transition-colors line-clamp-2"
                >
                  {novel.title}
                </Link>
                <div className="text-xs text-[13px] text-muted-foreground hidden md:block">
                  <p className="line-clamp-2">{novel.author}</p>
                </div>
              </div>

              <div className="col-span-1 text-zinc-300/80 flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-1.5">
                <EyeIcon className="size-4 mb-0.25" />
                <span className="text-sm">{formatViews(novel.views)}</span>
              </div>

              <div className="col-span-1 text-zinc-300/80 flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-1.5">
                <CalendarIcon className="size-3.5" />
                <span className="text-sm whitespace-nowrap">{formatMonthYear(novel.createdAt)}</span>
              </div>

              <div className="col-span-1 text-zinc-300/80 flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-1.5">
                <StarIcon className="size-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-[13px]">{novel.ratingValue?.toFixed(2) ?? 'N/A'}</span>
              </div>

              <div className="col-span-1 text-zinc-300/80 flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-1.5">
                <BookOpenText className="size-3.5" />
                <span className="text-xs text-[13px] mb-0.25">{novel.chaptersCount}{" "}Ch</span>
              </div>

              <div className="col-span-1 flex items-center gap-1.5 whitespace-nowrap">
                <Badge variant="cool" className="text-zinc-200 w-full max-w-[80px] whitespace-nowrap flex items-center py-1.5 pb-[6.5px] leading-none text-[10px] xl:text-[11px]">{statusMap[novel.status]}</Badge>
              </div>

              <div className="col-span-1 text-zinc-300/80 flex items-center gap-1.5 lg:ms-3">
                <div className="rounded-sm bg-gradient-to-b from-accent/80 to-primary/60 border border-accent text-white grid place-items-center w-14 h-10">
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

export default DesktopGridTable;

