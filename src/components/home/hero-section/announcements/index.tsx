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
import { arrayChuncker } from "@/lib/utils";
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

const CAROUSEL_CHUNCK = 2;
const CAROUSEL_MOBILE_CHUNCK = 1;
const Announcements = () => {
  const isMobile = useIsMobile();
  
  const chunckedAnnouncements = arrayChuncker(ANNOUNCEMENTS, isMobile ? CAROUSEL_MOBILE_CHUNCK : CAROUSEL_CHUNCK);

  return (
    <section className="w-full lg:w-[35%]">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Megaphone className="size-5 md:size-7" fill="" />
          <p className="text-lg sm:text-2xl font-semibold tracking-tight">Announcements</p>
        </div>
        <Link href="/" className="text-sm sm:text-base text-muted-foreground font-medium">View all</Link>
      </div>
      {chunckedAnnouncements.length > 0 ? (
        <Carousel className="grid">
          <CarouselContent className="h-auto lg:h-60">
            {chunckedAnnouncements.map((items, index) => (
              <CarouselItem className="space-y-4 mt-6" key={index}>
                {items.map(({ date, title }, i) => (
                  <Announcement key={i} date={date} title={title} />
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
    <div className="w-full border h-[86px] rounded-xl bg-muted-foreground/5 px-4 py-3 flex gap-3 items-center">
      <img src="yin-yang.png" alt="" className="size-12" />
      <div className="w-full">
        <p className="text-[17px] font-semibold leading-[120%] tracking-[-0.02em] line-clamp-2">
          {title}
        </p>
        <p className="text-muted-foreground text-sm">{date}</p>
      </div>
    </div>
  )
}

export default Announcements;
