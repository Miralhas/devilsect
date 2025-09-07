import { ThreadedComment } from "@/types/threaded-comment";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const CommentBody = ({ comment }: { comment: ThreadedComment; }) => {
  const [spoiler, setSpoiler] = useState(comment.isSpoiler);

  const handleSpoiler = () => setSpoiler(prev => !prev);

  return (
    <div className="relative">
      {spoiler && (
        <span className="absolute inset-0 w-full z-10 grid place-items-center text-muted-foreground h-full">
          <Button
            variant="extra-cool-secondary"
            size="none"
            className="px-3 py-1 text-xs rounded-lg"
            onClick={handleSpoiler}
          >
            Reveal Spoiler
          </Button>
        </span>
      )}
      <div className={cn("blur-none text-sm md:text-base text-zinc-300", spoiler && "blur-sm bg-secondary/60")}>
        {comment.message}
      </div>
    </div>
  )
}

export default CommentBody;
