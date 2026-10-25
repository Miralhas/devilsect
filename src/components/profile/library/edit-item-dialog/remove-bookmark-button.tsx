import { Button } from "@/components/ui/button";
import { useBookmark } from "@/hooks/use-bookmark";
import { Library } from "@/types/library";
import { cn } from "@/utils/common-utils";
import { BookmarkMinus } from "lucide-react";

const RemoveBookmarkButton = ({ item }: { item: Library }) => {
  const { onBookmark, isPending } = useBookmark();
  const { libraryElementId: id, novelTitle: title } = item;

  const handleAction = () => {
    onBookmark({
      action: "REMOVE",
      props: { id, title },
    });
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

export default RemoveBookmarkButton;
