import { Button } from "@/components/ui/button";
import { useBookmark } from "@/hooks/use-bookmark";
import { Library } from "@/types/library";
import { cn } from "@/utils/common-utils";
import { BookmarkMinus } from "lucide-react";

type RemoveBookmarkButtonProps = { item: Library };

const RemoveBookmarkButtonIcon = ({ item }: RemoveBookmarkButtonProps) => {
  const { isPending, onBookmark } = useBookmark();
  const { libraryElementId: id, novelTitle: title } = item;

  const handleAction = () => {
    onBookmark({
      action: "REMOVE",
      props: { id, title }
    })
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
