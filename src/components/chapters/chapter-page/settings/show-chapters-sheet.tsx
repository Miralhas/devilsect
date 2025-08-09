import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { env } from "@/env";
import defaultBlur from "@/lib/blur-data";
import { Chapter } from "@/types/chapter";
import { BookOpenText, Menu } from "lucide-react";
import Image from "next/image";
import ChapterAccordion from "./chapters-accordion";

const ShowChaptersSheet = ({ chapter }: { chapter: Chapter }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex gap-3 items-center cursor-pointer">
            <Menu className="text-muted-foreground size-6" />
            <p className="text-sm md:text-[15px] font-semibold tracking-tight leading-7 text-white line-clamp-1 w-full max-w-[100px] xs:max-w-[190px] md:max-w-[300px]">
              {chapter.title}
            </p>
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="grid grid-cols-4 mt-5 gap-3 pb-4 border-b">
            <div className="col-span-1 w-full relative aspect-[3/4]">
              <Image
                src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${chapter.novelSlug}/image`}
                blurDataURL={defaultBlur}
                alt="novel cover"
                className="inline-block object-cover rounded-md w-full h-full"
                fill
              />
            </div>
            <div className="col-span-3 flex gap-1 flex-col">
              <SheetTitle className="capitalize text-sm md:text-base tracking-tight leading-6 font-semibold w-full line-clamp-3">
                {/* {chapter.novelSlug.replaceAll("-", " ")} */}
                My Journey to Immortality Begins with Hunting
              </SheetTitle>
              <div className="hidden xs:flex items-center gap-2 text-muted-foreground">
                <BookOpenText className="size-4" />
                <p className="text-sm mb-1">300</p>
              </div>
            </div>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
            <ChapterAccordion />
          </div>
          <SheetFooter>
            <SheetClose asChild>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ShowChaptersSheet;
