import { RecentlyAddedChapter } from "@/types/recently-added-chapters";
import GridHeader from "./grid-header";
import DynamicBlurImage from "../dynamic-blur-image";
import { env } from "@/env";
import BookCoverOverlay from "../novel-card/book-cover-overlay";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

const UpdatesGrid = ({ recent }: { recent: RecentlyAddedChapter[] }) => {
  return (
    <>
      <GridHeader />
      <div className="space-y-0 border-t md:border-none">
        {recent.map((item) => {

          return (
            <div
              key={item.id}
              className="group hover:bg-secondary rounded-lg transition-all duration-200 py-1.5 md:py-3 border-b"
            >
              {/* Mobile Layout */}
              <div className="flex gap-2 md:hidden relative items-center px-1">
                <div className="w-8 h-10 overflow-hidden rounded-r-sm relative">
                  <DynamicBlurImage
                    fill
                    sizes="(max-width: 768px) 33vw, 5vw"
                    alt={`${item.novelTitle} cover`}
                    className="w-full h-full object-fill"
                    unoptimized={false}
                    src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${item.novelSlug}/image`}
                    default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
                  />
                  <BookCoverOverlay />
                </div>
                <div className="w-full space-y-0.5">
                  <Link
                    href={`/novels/${item.novelSlug}`}
                    className="font-medium transition-colors line-clamp-1 capitalize text-sm leading-4"
                  >
                    {item.novelTitle}
                  </Link>

                  <Link
                    href={`/novels/${item.novelSlug}/${item.slug}`}
                    className="text-sm text-[13px] transition-colors line-clamp-1 text-zinc-300/80 capitalize font-medium"
                  >
                    {item.title}
                  </Link>
                  <div className="flex text-muted-foreground justify-between text-xs flex-wrap">
                    <span>{item.author}</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-[45px_0.3fr_0.5fr_0.2fr_0.1fr]">
                <div className="w-[30px] h-[40px] overflow-hidden rounded-r-sm relative">
                  <DynamicBlurImage
                    fill
                    sizes="(max-width: 768px) 10vw, 5vw"
                    alt={`${item.novelTitle} cover`}
                    className="w-full h-full object-fill"
                    unoptimized={false}
                    default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
                    src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${item.novelSlug}/image`}
                  />
                  <BookCoverOverlay />
                </div>

                <div className="min-w-0 justify-self-start">
                  <Link
                    href={`/novels/${item.novelSlug}`}
                    className="font-medium capitalize hover:text-accent transition-colors line-clamp-2"
                  >
                    {item.novelTitle}
                  </Link>
                </div>

                <div className="min-w-0 justify-self-start">
                  <Link
                    href={`/novels/${item.novelSlug}/${item.slug}`}
                    className="text-sm hover:text-accent transition-colors font-medium text-zinc-300"
                  >
                    {item.title}
                  </Link>
                </div>

                <div className="text-sm text-muted-foreground ">
                  <span className="text-sm whitespace-nowrap">
                    {item.author}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground justify-self-end pe-3 whitespace-nowrap">
                  {formatDate(item.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default UpdatesGrid;
