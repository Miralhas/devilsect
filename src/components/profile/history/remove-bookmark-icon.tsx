import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteBookmarkAction, revalidateFetchTag } from "@/services/user-library/action";
import { Library } from "@/types/library";
import { BookmarkMinus } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type RemoveBookmarkButtonProps = { item: Library };

const RemoveBookmarkButtonIcon = ({ item: { novelTitle, libraryElementId } }: RemoveBookmarkButtonProps) => {
  const [state, action, isPending] = useActionState(deleteBookmarkAction, { success: undefined });

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
