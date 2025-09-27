'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { revalidateFetchTag } from "@/service/library/actions/revalidate-fetch-tag";
import { setNovelBookmarkAction } from "@/service/library/actions/set-novel-bookmark-action";
import { Library } from "@/types/library";
import { BookmarkPlusIcon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type BookmarkButtonProps = { item: Library };

const BookmarkButtonIcon = ({ item: { novelTitle, novelSlug } }: BookmarkButtonProps) => {
  const [state, action, isPending] = useActionState(setNovelBookmarkAction, { success: undefined });

  useEffect(() => {
    if (state.success === undefined) return;

    if (state.success) {
      toast.success(state.message, { position: "top-center" });
      revalidateFetchTag();
      return;
    }

    toast.error(state.message, { position: "top-center" });

  }, [state]);

  const handleAction = () => {
    startTransition(() => action({ novelTitle, novelSlug }));
  }
  return (
    <Button
      variant="pure"
      size="icon"
      className={cn("text-green-800", isPending ?? "animate-pulse")}
      disabled={isPending}
      onClick={handleAction}
    >
      <BookmarkPlusIcon className="size-5" />
    </Button>
  )
}


export default BookmarkButtonIcon;
