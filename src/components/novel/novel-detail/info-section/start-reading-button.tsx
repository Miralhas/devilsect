'use client'

import { Button } from "@/components/ui/button";
import { useCurrentUserQuery } from "@/services/authentication/client-queries";
import { useGetUserNovelOnLibrary } from "@/services/novels/client-queries";
import { Novel } from "@/types/novel";
import Link from "next/link";
import BookmarkNovel from "./bookmark-novel";
import StartReadingButtonLoading from "./start-reading-button-loading";

type StartReadingButtonProps = {
  novel: Novel;
}


const StartReadingButton = ({ novel }: StartReadingButtonProps) => {
  const { data: user, isLoading: userLoading } = useCurrentUserQuery();
  const { data: paginatedUserLibrary, isLoading: libraryLoading } = useGetUserNovelOnLibrary(novel.slug);

  if (libraryLoading) {
    return <StartReadingButtonLoading />
  }

  if (userLoading) {
    return <StartReadingButtonLoading />
  }

  const hasNovelOnHistory = !!paginatedUserLibrary && paginatedUserLibrary?.totalItems > 0;
  const isBookmarked = hasNovelOnHistory && paginatedUserLibrary.results[0].bookmarked;
  const libraryId = paginatedUserLibrary?.results[0]?.libraryElementId;

  return (
    <div className="gap-2 flex flex-col w-full lg:max-w-[335px]">
      {user && (
        <BookmarkNovel hasNovelOnHistory={hasNovelOnHistory} isBookmarked={isBookmarked} novel={novel} libraryId={libraryId} />
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
