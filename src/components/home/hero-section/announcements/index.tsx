'use client'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { arrayChunker } from "@/lib/utils";
import { Announcement as AnnouncementType } from "@/types/announcement";
import { Megaphone } from "lucide-react";
import Link from "next/link";

const ANNOUNCEMENTS: AnnouncementType[] = [
  {
    title: "New Moderator",
    date: "5 days ago"
  },
  {
    title: "Under Maintenance",
    date: "14 days ago"
  },
  {
    title: "Welcome!",
    date: "18 days ago"
  }
]

const CAROUSEL_CHUNK = 2;
const CAROUSEL_MOBILE_CHUNK = 1;
const Announcements = () => {
  const isMobile = useIsMobile();

  const chunkedAnnouncements = arrayChunker(ANNOUNCEMENTS, isMobile ? CAROUSEL_MOBILE_CHUNK : CAROUSEL_CHUNK);

  return (
    <section className="w-full lg:w-[35%]">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Megaphone className="size-5 md:size-7" fill="" />
          <p className="text-lg sm:text-2xl font-semibold tracking-tight">Announcements</p>
        </div>
        <Link href="/" className="text-sm md:text-base text-muted-foreground hover:text-zinc-200 transition-colors duration-200">View all</Link>
      </div>
      {chunkedAnnouncements.length > 0 ? (
        <Carousel className="grid">
          <CarouselContent className="h-auto lg:h-60">
            {chunkedAnnouncements.map((items, index) => (
              <CarouselItem className="space-y-4 mt-6" key={index}>
                {items.map(({ date, title }, i) => (
                  <Announcement date={date} title={title} key={i} />
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="w-full mt-3 lg:mt-auto gap-6 flex justify-center">
            <CarouselPrevious className="rounded-md size-7" variant="cool-secondary" />
            <CarouselDots className="w-auto" />
            <CarouselNext className="rounded-md size-7" variant="cool-secondary" />
          </div>
        </Carousel>
      ) : (
        <div className="space-y-4 mt-6 mb-10 flex items-center justify-center border rounded-xl bg-muted-foreground/5 h-50">
          <p className="text-[17px] font-semibold leading-[120%] tracking-[-0.02em] text-muted-foreground">No announcements...</p>
        </div>
      )}
    </section>
  )
}

const Announcement = ({ date, title }: AnnouncementType) => {
  return (
    <Link href="/" className="w-full h-[86px] rounded-xl px-4 py-3 flex gap-3 items-center border hover:border-accent/60 hover:bg-primary/10 bg-muted-foreground/5 transition-colors duration-200 ease-in-out">
      <img src="yin-yang.png" alt="" className="size-12" />
      <div className="w-full">
        <p className="text-[17px] font-semibold leading-[120%] tracking-[-0.02em] line-clamp-2">
          {title}
        </p>
        <p className="text-muted-foreground text-sm">{date}</p>
      </div>
    </Link>
  )
}

export default Announcements;
