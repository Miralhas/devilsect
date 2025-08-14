import { getUserLibrary } from "@/services/novels/server-queries";
import { Novel } from "@/types/novel";
import { BellIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

type StartReadingButtonProps = {
  novel: Novel;
}

const StartReadingButton = async ({ novel }: StartReadingButtonProps) => {
  const paginatedUserLibrary = await getUserLibrary({ novelSlug: novel.slug });
  const hasNovelOnHistory = !!paginatedUserLibrary && paginatedUserLibrary?.totalItems > 0;
  const isBookmarked = hasNovelOnHistory && paginatedUserLibrary.results[0].bookmarked;
  return (
    <div className="gap-2 flex flex-col w-full lg:max-w-[335px]">
      {hasNovelOnHistory && isBookmarked ? (
        <Button variant="pure" size="sm" className="transition-opacity ease-in-out duration-300 hover:opacity-80">
          <CheckIcon className="size-5" />
          <span>In Library</span>
        </Button>
      ) : (
        <Button variant="pure" size="sm" className="transition-opacity ease-in-out duration-300 hover:opacity-80">
          <BellIcon className="size-5" />
          <span>Add to Library</span>
        </Button>
      )}
      <Button variant="pure" asChild className="transition-opacity ease-in-out duration-300 hover:opacity-80 bg-gradient-to-r from-accent to-primary/60 text-lg h-[60px] text-white font-bold capitalize tracking-tighter">
        {hasNovelOnHistory && paginatedUserLibrary.results[0].chapterNumber ? (
          <Link href={`/novels/${novel.slug}/${paginatedUserLibrary?.results[0].chapterSlug}`}>
            Read Chapter {''}
            {paginatedUserLibrary?.results[0].chapterNumber}
          </Link>
        ) : (
          <Link href={`/novels/${novel.slug}/${novel.firstChapter.slug}`}>Start Reading</Link>
        )}
      </Button>
    </div>
  )
}

export default StartReadingButton;
