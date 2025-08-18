import { env } from "@/env";
import { formatDate } from "@/lib/utils";
import { Library } from "@/types/library";
import Link from "next/link";
import DynamicBlurImage from "../dynamic-blur-image";
import BookCoverOverlay from "../novel-card/book-cover-overlay";

interface LibraryGridProps {
  library: Library[];
}

const HistoryGrid = ({ library }: LibraryGridProps) => {
  const getProgressPercentage = (current: number, total: number) => {
    return Math.min((current / total) * 100, 100);
  };

  // Empty state
  if (!library.length) {
    return (
      <div className="flex flex-col items-center justify-center pb-4 md:pb-10 text-center">
        <div className="w-14 md:w-16 h-14 md:h-16 bg-secondary border rounded-full flex items-center justify-center mb-2 md:mb-4">
          📚
        </div>
        <h3 className="text-lg font-medium mb-1 md:mb-2">
          No books in your library
        </h3>
        <p className="text-sm md:text-base text-muted-foreground max-w-xs md:max-w-sm">
          Start reading some novels to build your personal library and track your progress.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table Header */}
      <div className="hidden md:grid md:grid-cols-[50px_0.5fr_0.5fr_0.25fr_0.2fr] gap-3 pb-3 mb-4 border-b border-zinc-200/20 dark:border-zinc-700/30">
        <div className="col-span-1">
        </div>
        <div className="text-xs font-medium uppercase tracking-wide">
          Title
        </div>
        <div className="text-xs font-medium uppercase tracking-wide">
          Chapter
        </div>
        <div className="text-xs font-medium uppercase tracking-wide">
          Progress
        </div>
        <div className="text-xs font-medium uppercase tracking-wide text-right">
          Last Read
        </div>
      </div>

      {/* Table Rows */}
      <div className="space-y-0">
        {library.map((item) => {
          const progressPercent = getProgressPercentage(item.chapterNumber, item.totalChapters);

          return (
            <div
              key={item.libraryElementId}
              className="group hover:bg-secondary/70 rounded-lg transition-all duration-200 py-3 border-b"
            >
              {/* Mobile Layout */}
              <div className="flex gap-3 md:hidden">
                <div className="flex-shrink-0">
                  <div className="w-12 h-16 overflow-hidden rounded-r-sm relative">
                    <DynamicBlurImage
                      unoptimized
                      alt={`${item.novelTitle} cover`}
                      className="w-full h-full object-fill"
                      src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${item.novelSlug}/image`}
                    />
                    <BookCoverOverlay />
                  </div>
                </div>
                <div className="flex-1 min-w-0 ">
                  <Link
                    href={`/novels/${item.novelSlug}`}
                    className="block font-medium transition-colors line-clamp-2 capitalize"
                  >
                    {item.novelTitle}
                  </Link>
                  <Link
                    href={`/novels/${item.novelSlug}/${item.chapterSlug}`}
                    className="block text-sm transition-colors line-clamp-1 text-zinc-300/80 capitalize mb-1"
                  >
                    {item.chapterTitle}
                  </Link>
                  <div className="flex text-muted-foreground justify-between text-xs flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="">{item.chapterNumber}/{item.totalChapters}</span>
                      <div className="w-16 h-1 bg-muted-foreground/20 rounded-full overflow-hidden mt-0.5">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs">
                        {progressPercent.toFixed(1)}%
                      </span>
                    </div>
                    <span>{formatDate(item.lastReadAt)}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-[40px_0.5fr_0.5fr_0.25fr_0.2fr] gap-3 items-center">
                <div className="w-[40px] h-[50px] overflow-hidden rounded-r-sm relative">
                  <DynamicBlurImage
                    unoptimized
                    alt={`${item.novelTitle} cover`}
                    className="w-full h-full object-fill"
                    src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${item.novelSlug}/image`}
                  />
                  <BookCoverOverlay />
                </div>

                <div className="col-span-1">
                  <Link
                    href={`/novels/${item.novelSlug}`}
                    className="font-medium capitalize hover:text-accent transition-colors line-clamp-2 max-w-[90%] w-full"
                  >
                    {item.novelTitle}
                  </Link>
                </div>

                <div className="col-span-1">
                  <Link
                    href={`/novels/${item.novelSlug}/${item.chapterSlug}`}
                    className="text-sm hover:text-accent transition-colors line-clamp-2 max-w-[90%] w-full"
                  >
                    {item.chapterTitle}
                  </Link>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs whitespace-nowrap">
                      {item.chapterNumber}/{item.totalChapters}
                    </span>
                    <div className="text-xs">
                      {progressPercent.toFixed(1)}%
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground text-right">
                  {formatDate(item.lastReadAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryGrid;