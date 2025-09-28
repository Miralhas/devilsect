'use client'

import { Button } from "@/components/ui/button";
import { setNovelBookmarkAction } from "@/service/library/actions/set-novel-bookmark-action";
import { libraryKeys } from "@/service/library/queries/query-keys";
import { Novel } from "@/types/novel";
import { useQueryClient } from "@tanstack/react-query";
import { BellIcon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

const BookmarkButton = ({ novel }: { novel: Novel }) => {
  const [state, action, isPending] = useActionState(setNovelBookmarkAction, { success: undefined });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.success === undefined) return;

    if (state.success) {
      toast.success(state.message, { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: libraryKeys.all })
      return;
    }

    toast.error(state.message, { position: "top-center" });

  }, [state, queryClient])

  const onBookmark = () => {
    startTransition(() => action({ novelSlug: novel.slug, novelTitle: novel.title }));
  }


  return (
    <Button
      size="sm"
      variant="pure"
      disabled={isPending}
      onClick={onBookmark}
      className="transition-opacity ease-in-out duration-300 hover:opacity-80"
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
  )
}

export default BookmarkButton;
