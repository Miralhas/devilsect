'use client'

import { cn } from "@/lib/utils";
import { User } from "@/types/authentication";
import { ThreadedComment } from "@/types/threaded-comment";
import { motion } from "motion/react";
import { useState } from "react";
import CommentBody from "./comment-body";
import CommentFooter from "./comment-footer";
import CommentHeader from "./comment-header";
import CommentReplies from "./comment-replies";
import ShowRepliesButton from "./show-replies-button";

const Comment = ({ comment, currentUser, depth = 0 }: { comment: ThreadedComment, depth?: number; currentUser?: User }) => {
  const isRoot = depth <= 0;
  const hasChildren = comment.childComments && comment.childComments.length > 0;
  const [showChildren, setShowChildren] = useState(isRoot && hasChildren);

  const handleShowChildren = () => {
    if (hasChildren) setShowChildren(prev => !prev);
  };

  const openChildren = () => { if (hasChildren) setShowChildren(true) };

  return (
    <motion.div className={cn("space-y-2 md:space-y-3", !isRoot && "pl-3 ml-1.5 md:pl-6 md:ml-4 border-l border-zinc-50/5")}>
      <div className="bg-zinc-950/50 border border-white/10 rounded-lg min-h-[80px] relative p-3 md:p-5 space-y-5">
        <CommentHeader commenter={comment.commenter} createdAt={comment.createdAt} />
        <CommentBody comment={comment} />
        <div className="space-y-3">
          <CommentFooter comment={comment} currentUser={currentUser} />
          <ShowRepliesButton
            comment={comment}
            handleShowChildren={handleShowChildren}
            hasChildren={hasChildren}
            showChildren={showChildren}
            openChildren={openChildren}
          />
        </div>
      </div>
      <CommentReplies comment={comment} depth={depth} showChildren={showChildren} currentUser={currentUser} />
    </motion.div>
  )
}

export default Comment;
