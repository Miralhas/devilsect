import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Megaphone } from "lucide-react";
import Link from "next/link";



const Announcements = () => {
  return (
    <section className="w-full lg:w-[35%]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Megaphone className="size-7" fill="" />
          <p className="text-2xl font-semibold tracking-tight">Announcements</p>
        </div>
        <Link href="/" className="text-muted-foreground font-medium">View all</Link>
      </div>
      {/* <div className="space-y-4 mt-6 flex items-center justify-center border rounded-xl bg-muted-foreground/5 h-50">
        <p className="text-[17px] font-semibold leading-[120%] tracking-[-0.02em] text-muted-foreground">No announcements...</p>
      </div> */}
      <Carousel className="grid">
        <CarouselContent className="h-60">
          {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="space-y-4 mt-6" key={index}>
            <Announcement />
            <Announcement />
          </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-full mt-auto gap-6 flex justify-center">
          <CarouselPrevious className="rounded-md size-7" variant="cool-secondary" />
          <CarouselDots className="w-auto" />
          <CarouselNext className="rounded-md size-7" variant="cool-secondary" />
        </div>
      </Carousel>
    </section>
  )
}

const Announcement = () => {
  return (
    <div className="w-full border h-[86px] rounded-xl bg-muted-foreground/5 px-4 py-3 flex gap-3 items-center">
      <img src="yin-yang.png" alt="" className="size-12" />
      <div className="w-full">
        <p className="text-[17px] font-semibold leading-[120%] tracking-[-0.02em] line-clamp-2">
          This is a place where everyone can become a God. Han Wu was a Divine Being
        </p>
        <p className="text-muted-foreground text-sm">14 days ago</p>
      </div>
    </div>
  )
}

export default Announcements;
