'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { bookmarkAction, revalidateFetchTag } from "@/services/user-library/action";
import { Library } from "@/types/library";
import { BookmarkPlusIcon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type BookmarkButtonProps = { item: Library };

const BookmarkButtonIcon = ({ item: { novelTitle, novelSlug } }: BookmarkButtonProps) => {
  const [state, action, isPending] = useActionState(bookmarkAction, { success: undefined });

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
