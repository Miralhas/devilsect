import { statusMap } from "@/lib/utils";
import { NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import { BookOpenText, StarIcon } from "lucide-react";
import Link from "next/link";
import CardImage from "./card-image";

const ReleasesCardHorizontal = async (res: PaginatedQuery<NovelSummary[]>) => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-3.5 h-full">
        {res.results.slice(0, 4).map((novel, index) => (
          <Link href={`/novels/${novel.slug}`} key={index}>
            <div className="group w-full p-2 px-3 border hover:border-accent/60 hover:bg-primary/10 rounded-xl bg-muted-foreground/5 flex gap-3 items-center transition-all duration-300 ease-in-out hover:translate-x-1 hover:-translate-y-1 hover:text-accent">
              <div className="aspect-[3/4] h-[75px] overflow-hidden rounded-lg relative">
                <CardImage novelSummary={novel} />
                <div className="absolute inset-0 rounded-r-5 book-cover" />
              </div>
              <div className="flex-1 gap-1.5 self-stretch flex flex-col py-1">
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
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default ReleasesCardHorizontal;
