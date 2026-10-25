'use client'

import { Button } from "@/components/ui/button";
import { useGlobalLoginContext } from "@/contexts/global-login-context";
import { useBookmark } from "@/hooks/use-bookmark";
import { Library } from "@/types/library";
import { Novel } from "@/types/novel";
import { BellIcon, CheckIcon } from "lucide-react";

type BookmarkNovelProps = {
  novel: Novel;
  library?: Library;
};

const BookmarkNovel = ({ novel, library }: BookmarkNovelProps) => {
  const { isPending, onBookmark } = useBookmark();
  const { currentUser, handleOpen } = useGlobalLoginContext();

  const handleClick = () => {
    if (!currentUser) return handleOpen();

    if (library?.bookmarked) {
      onBookmark({
        action: "REMOVE",
        props: { id: library.libraryElementId, title: library.novelTitle },
      });
    } else {
      onBookmark({
        action: "ADD",
        props: { ...novel },
      });
    }
  };

  const isBookmarked = !!library?.bookmarked;
  const Icon = isBookmarked ? CheckIcon : BellIcon;
  const idleLabel = isBookmarked ? "In Library" : "Add to Library";
  const pendingLabel = isBookmarked ? "Removing bookmark..." : "Bookmarking...";

  return (
    <Button
      size="sm"
      variant="pure"
      disabled={isPending}
      onClick={handleClick}
      className="transition-opacity duration-300 ease-in-out hover:opacity-80"
    >
      {isPending ? (
        <span className="animate-pulse">{pendingLabel}</span>
      ) : (
        <>
          <Icon className="size-5" />
          <span>{idleLabel}</span>
        </>
      )}
    </Button>
  );
};

export default BookmarkNovel;