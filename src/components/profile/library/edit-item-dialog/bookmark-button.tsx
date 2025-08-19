import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteBookmarkAction, revalidateFetchTag } from "@/services/user-library/action";
import { Library } from "@/types/library";
import { BookmarkMinus } from "lucide-react";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type BookmarkButtonProps = { setOpen: Dispatch<SetStateAction<boolean>>, item: Library };

const BookmarkButton = ({ setOpen, item: { novelTitle, libraryElementId } }: BookmarkButtonProps) => {
  const [state, action, isPending] = useActionState(deleteBookmarkAction, { success: undefined });

  useEffect(() => {
    if (state.success === undefined) return;

    if (state.success) {
      toast.success(state.message, { position: "top-center" });
      setOpen(false);
      revalidateFetchTag();
      return;
    }

    toast.error(state.message, { position: "top-center" });

  }, [state, setOpen]);

  const handleAction = () => {
    startTransition(() => action({ novelTitle, libraryId: libraryElementId }));
  }
  return (
    <Button
      variant="cool-secondary"
      className={cn("hover:bg-zinc-900 border border-white/20 text-zinc-300/80  transition-colors duration-300 ease-in-out h-11",
        isPending ?? "animate-pulse"
      )}
      disabled={isPending}
      onClick={handleAction}
    >
      <BookmarkMinus className="size-5" />
      Remove Bookmark
    </Button>
  )
}

export default BookmarkButton;
