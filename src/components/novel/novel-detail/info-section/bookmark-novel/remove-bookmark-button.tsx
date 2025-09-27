'use client'

import { Button } from "@/components/ui/button";
import { removeNovelBookmarkAction } from "@/service/library/actions/remove-novel-bookmark-action";
import { useQueryClient } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

const RemoveBookmarkButton = ({ libraryId, novelTitle }: { libraryId: number; novelTitle: string }) => {
  const [state, action, isPending] = useActionState(removeNovelBookmarkAction, { success: undefined });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.success === undefined) return;

    if (state.success) {
      toast.success(state.message, { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["library"] })
      return;
    }

    toast.error(state.message, { position: "top-center" });

  }, [state, queryClient])

  const onRemoveBookmark = () => {
    startTransition(() => action({ libraryId, novelTitle }));
  }


  return (
    <Button
      size="sm"
      variant="pure"
      disabled={isPending}
      onClick={onRemoveBookmark}
      className="transition-opacity ease-in-out duration-300 hover:opacity-80"
    >
      {isPending ? (
        <span className="animate-pulse">Removing bookmark...</span>
      ) : (
        <>
          <CheckIcon className="size-5" />
          <span>In Library</span>
        </>
      )}
    </Button>
  )
}

export default RemoveBookmarkButton;
