import { User } from "@/types/authentication";
import { ThreadedComment } from "@/types/threaded-comment";
import { Ellipsis, LucideThumbsDown, LucideThumbsUp } from "lucide-react";
import Reply from "./reply";

const CommentFooter = ({ comment, currentUser }: { comment: ThreadedComment; currentUser?: User }) => {
  const isAuth = currentUser !== undefined;

  return (
    <div className="flex items-center text-muted-foreground gap-5">
      <div className="flex items-center gap-2">
        <LucideThumbsUp className="size-4" />
        <span className="text-xs font-semibold">{comment.voteCount}</span>
        <LucideThumbsDown className="size-4 relative top-0.25" />
      </div>
      <div className="flex items-center gap-1.5">
        <Reply comment={comment} />
      </div>
      {isAuth && <Ellipsis className="size-5 relative top-0.5" />}
    </div>
  )
}


export default CommentFooter;
