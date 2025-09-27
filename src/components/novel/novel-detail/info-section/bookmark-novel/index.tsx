'use client'

import { Novel } from "@/types/novel";
import BookmarkButton from "./bookmark-button";
import RemoveBookmarkButton from "./remove-bookmark-button";

type BookmarkNovelProps = {
  novel: Novel;
  hasNovelOnHistory: boolean;
  isBookmarked: boolean;
  libraryId?: number
};

const BookmarkNovel = ({ novel, hasNovelOnHistory, isBookmarked, libraryId }: BookmarkNovelProps) => {

  if (hasNovelOnHistory && isBookmarked && libraryId) {
    return (
      <RemoveBookmarkButton libraryId={libraryId} novelTitle={novel.title} />
    )
  }

  return (
    <BookmarkButton novel={novel} />
  )
}

export default BookmarkNovel;
