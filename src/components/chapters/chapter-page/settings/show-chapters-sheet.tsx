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
import { BookOpenText, Loader, Menu } from "lucide-react";
import Image from "next/image";
import ChapterAccordion from "./chapters-accordion";
import { useGetNovelChapterSummaries } from "@/services/chapters/client-queries";
import Link from "next/link";

const ShowChaptersSheet = ({ chapter }: { chapter: Chapter }) => {
  const { data, isLoading, isError } = useGetNovelChapterSummaries({ novelSlug: chapter.novelSlug, page: 0, size: 9999 });

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex gap-3 items-center cursor-pointer">
            <Menu className="text-muted-foreground size-7" />
            <p className="text-sm md:text-[15px] font-semibold tracking-tight leading-7 text-white line-clamp-1 w-full max-w-[100px] xs:max-w-[190px] md:max-w-[300px]">
              {chapter.title}
            </p>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="gap-0" aria-describedby="content">
          <SheetHeader className="grid grid-cols-4 mt-5 gap-3 pb-4 border-b mb-0">
            <div className="col-span-1 w-full relative aspect-[3/4] h-full">
              <Link href={"/novels/" + chapter.novelSlug}>
                <Image
                  src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${chapter.novelSlug}/image`}
                  blurDataURL={defaultBlur}
                  alt="novel cover"
                  className="inline-block object-cover rounded-md w-full h-full"
                  fill
                />
              </Link>
            </div>
            <div className="col-span-3 flex gap-1 flex-col">
              <SheetTitle className="capitalize text-sm md:text-base tracking-tight leading-6 font-semibold w-full line-clamp-2 md:line-clamp-3">
                <Link href={"/novels/" + chapter.novelSlug}>
                  {chapter.novelSlug.replaceAll("-", " ")}
                </Link>
              </SheetTitle>
              {!isLoading && !isError && <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpenText className="size-4" />
                <p className="text-[12px] mb-0.5">{data?.totalItems} Chapters</p>
              </div>}
            </div>
          </SheetHeader>
          {!isLoading && !isError ? <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
            <ChapterAccordion currentChapter={chapter} paginatedSumaries={data!} />
          </div> : <div className="w-full grid place-items-center min-h-[10vh]"><Loader className="size-7 animate-spin" /></div>}
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
