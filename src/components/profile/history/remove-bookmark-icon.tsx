import { Button } from "@/components/ui/button";
import { removeNovelBookmarkAction } from "@/service/library/actions/remove-novel-bookmark-action";
import { revalidateFetchTag } from "@/service/library/actions/revalidate-fetch-tag";
import { Library } from "@/types/library";
import { cn } from "@/utils/common-utils";
import { BookmarkMinus } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type RemoveBookmarkButtonProps = { item: Library };

const RemoveBookmarkButtonIcon = ({ item: { novelTitle, libraryElementId } }: RemoveBookmarkButtonProps) => {
  const [state, action, isPending] = useActionState(removeNovelBookmarkAction, { success: undefined });

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
    startTransition(() => action({ novelTitle, libraryId: libraryElementId }));
  }
  return (
    <Button
      variant="pure"
      size="icon"
      className={cn("text-red-800/75", isPending ?? "animate-pulse")}
      disabled={isPending}
      onClick={handleAction}
    >
      <BookmarkMinus className="size-5" />
    </Button>
  )
}

export default RemoveBookmarkButtonIcon;
