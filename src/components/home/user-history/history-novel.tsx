import DynamicBlurImage from "@/components/dynamic-blur-image";
import BookCoverOverlay from "@/components/novel-card/book-cover-overlay";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { env } from "@/env";
import { Library } from "@/types/library";
import { cn } from "@/utils/common-utils";
import { HistoryIcon } from "lucide-react";

const HistoryNovel = ({ library }: { library: Library }) => {
  const {
    chapterNumber,
    novelSlug,
    novelTitle,
    totalChapters,

  } = library;

  const getProgressPercentage = (current: number, total: number) => {
    return Math.min((current / total) * 100, 100);
  };
  
  return (
    <>
      <div className="relative aspect-[2/3]  overflow-hidden rounded-r-md shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-md shadow-accent">
        <DynamicBlurImage
          src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/image`}
          alt={`${novelTitle} cover`}
          className="object-cover object-center w-full h-full transition-transform duration-500 ease-in-out opacity-70 group-hover:scale-105 text-transparent"
          sizes="(max-width: 768px) 30vw, 10vw"
          fill
          default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
        />
        <BookCoverOverlay />

        <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300">
          <div className="flex flex-col gap-1 xs:gap-0 xs:justify-evenly items-center w-full h-[65%] lg:h-[60%]">
            <div className="border border-accent bg-primary/60 p-2 md:p-3 rounded-full">
              <HistoryIcon className={cn("size-4 lg:size-7")} />
            </div>

            <div className={cn("text-sm text-center w-full px-2.5 text-[12px] md:px-4 md:text-sm")}>
              <p className="font-medium text-muted-foreground text-xs line-clamp-none sr-only xs:line-clamp-1 xs:not-sr-only w-full capitalize ">
                {novelTitle}
              </p>
              <p className={cn("text-red-800/90 font-semibold w-full overflow-hidden capitalize md:pb-8 text-xs lg:text-base")}>
                Chapter: {chapterNumber}
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute top-0 right-0 bg-red-950 border border-accent rounded-bl-lg font-bold whitespace-nowrap text-white text-xs px-[.3125rem] py-[.2125rem] overflow-hidden text-[8px] md:text-[10px] lg:text-[11px]"
        >
          {chapterNumber}/{totalChapters}{" "}{`(${getProgressPercentage(chapterNumber, totalChapters).toFixed(0)}%)`}
        </div>
      </div>

      <Tooltip delayDuration={300}>
        <TooltipTrigger className="text-start cursor-pointer">
          <h3
            className={cn("tracking-tight font-semibold leading-tight capitalize text-white transition-colors duration-300 text-xs md:text-sm line-clamp-1")}
          >
            {novelTitle}
          </h3>
          {/* <p className="text-xs">Chapter 1993</p> */}
        </TooltipTrigger>
        <TooltipContent className="capitalize text-center bg-secondary border border-zinc-50/10 text-zinc-200">
          {novelTitle}
        </TooltipContent>
      </Tooltip>
    </>
  )
}

export default HistoryNovel;
