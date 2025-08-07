'use client'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { arrayChunker, formatDate } from "@/lib/utils";
import { RecentlyAddedChapter } from "@/types/recently-added-chapters";
import ChapterImage from "./chapter-image";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

const DESKTOP_CHUNK_SIZE = 10;
const MOBILE_CHUNK_SIZE = 5;

const ChaptersCarousel = ({ chapters }: { chapters: RecentlyAddedChapter[] }) => {
  const isMobile = useIsMobile();
  const chunkedChapters = arrayChunker(chapters, isMobile ? MOBILE_CHUNK_SIZE : DESKTOP_CHUNK_SIZE);
  return (
    <Carousel className="grid gap-3" opts={{ slidesToScroll: 1, align: "start" }}>
      <CarouselContent className="mr-0.5">
        {chunkedChapters.map((chunk, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="w-full flex flex-col gap-1">
              {chunk.map(chapter => (
                <div key={chapter.id} className="w-full border-b border-primary/40 pb-2 pt-1 flex gap-2 transition-all duration-300 group hover:-translate-y-1">
                  <ChapterImage {...chapter} />
                  <div className="w-full md:grid md:grid-cols-[0.5fr_0.5fr_0.3fr] md:gap-3 capitalize tracking-tight font-semibold duration-300 transition-colors group-hover:text-accent">
                    <div className="col-span-1 md:flex md:flex-col">
                      <Link href="/" className="text-sm text-[15.2px] text-ellipsis whitespace-break-spaces line-clamp-1 md:line-clamp-2 w-fit text-white group-hover:text-inherit">
                        {chapter.novelTitle}
                      </Link>
                      <div className="text-sm text-[13px] font-normal text-muted-foreground mt-1 hidden md:block">
                        <p className="line-clamp-2">{chapter.author}</p>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Link href="/" className="text-sm text-ellipsis font-normal whitespace-break-spaces line-clamp-1 lg:line-clamp-2 w-fit">
                        {chapter.title}
                      </Link>
                    </div>
                    <div className="col-span-1 text-sm text-[13px] md:justify-self-end md:pe-2 font-medium text-muted-foreground/70"><p>{formatDate(chapter.createdAt)}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full gap-6 flex justify-center">
        <CarouselPrevious className="rounded-md size-7" variant="cool-secondary" />
        <CarouselDots className="w-auto" />
        <CarouselNext className="rounded-md size-7" variant="cool-secondary" />
      </div>
    </Carousel>
  )
}

export default ChaptersCarousel;
