import { isAdminCheck } from "@/lib/utils";
import { User } from "@/types/authentication";
import { ThreadedComment } from "@/types/threaded-comment";
import ActionsPopover from "./actions-popover";
import Reply from "./reply";
import Vote from "./vote";

const CommentFooter = ({ comment, currentUser }: { comment: ThreadedComment; currentUser?: User }) => {
  const isAuth = currentUser !== undefined;
  const isCommenter = isAuth && comment.commenter.id === currentUser?.id;
  const isAdmin = isAdminCheck(currentUser);

  return (
    <div className="flex items-center text-muted-foreground gap-5">
      <Vote comment={comment} user={currentUser}/>
      <div className="flex items-center gap-1.5">
        <Reply comment={comment} isAuthenticated={isAuth} />
      </div>
      {(isCommenter || isAdmin) && <ActionsPopover comment={comment} />}
    </div>
  )
}


export default CommentFooter;
