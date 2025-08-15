'use client'

import { Button } from "@/components/ui/button";
import { bookmarkNovelAction } from "@/services/novels/actions";
import { Novel } from "@/types/novel";
import { BellIcon, CheckIcon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type BookmarkNovelProps = { novel: Novel; hasNovelOnHistory: boolean; isBookmarked: boolean; libraryId?: number };

const BookmarkNovel = ({ novel, hasNovelOnHistory, isBookmarked, libraryId }: BookmarkNovelProps) => {
  const [state, action, isPending] = useActionState(bookmarkNovelAction, { success: undefined });

  useEffect(() => {
    if (state.success === undefined) return;

    if (state.success) {
      toast.success(state.message, { position: "top-center" });
      return;
    }

    toast.error(state.message, { position: "top-center" });

  }, [state, novel.title])

  return (
    <>
      {hasNovelOnHistory && isBookmarked ? (
        <Button variant="pure" size="sm" className="transition-opacity ease-in-out duration-300 hover:opacity-80"
          onClick={() => startTransition(() => action({ novel, libraryId: libraryId!, type: "REMOVE" }))}
        >
          {isPending ? (
            <span className="animate-pulse">Removing bookmark...</span>
          ) : (
            <>
              <CheckIcon className="size-5" />
              <span>In Library</span>
            </>
          )}
        </Button >
      ) : (
        <Button variant="pure" size="sm" className="transition-opacity ease-in-out duration-300 hover:opacity-80"
          onClick={() => startTransition(() => action({ novel, type: "ADD" }))}
        >
          {isPending ? (
            <span className="animate-pulse">Bookmarking...</span>
          ) : (
            <>
              <BellIcon className="size-5" />
              <span>Add to Library</span>
            </>
          )}
        </Button>
      )}
    </>
  )
}

export default BookmarkNovel;
