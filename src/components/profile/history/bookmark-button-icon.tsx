'use client'

import { Button } from "@/components/ui/button";
import { useBookmark } from "@/hooks/use-bookmark";
import { Library } from "@/types/library";
import { cn } from "@/utils/common-utils";
import { BookmarkPlusIcon } from "lucide-react";

type BookmarkButtonProps = { item: Library };

const BookmarkButtonIcon = ({ item }: BookmarkButtonProps) => {
  const { isPending, onBookmark } = useBookmark();
  const { novelSlug: slug, novelTitle: title } = item;

  const handleAction = () => {
    onBookmark({
      action: "ADD",
      props: { slug, title },
    });
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
