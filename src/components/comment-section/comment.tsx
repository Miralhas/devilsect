'use client'

import { cn } from "@/lib/utils";
import { ThreadedComment } from "@/types/threaded-comment";
import { motion } from "motion/react";
import { useState } from "react";
import CommentBody from "./comment-body";
import CommentReplies from "./comment-replies";
import ShowRepliesButton from "./show-replies-button";
import CommentHeader from "./comment-header";

const Comment = ({ comment, depth = 0 }: { comment: ThreadedComment, depth?: number }) => {
  const isRoot = depth <= 0;
  const hasChildren = comment.childComments && comment.childComments.length > 0;
  const [showChildren, setShowChildren] = useState(() => isRoot && hasChildren);

  const handleShowChildren = () => {
    if (hasChildren) setShowChildren(prev => !prev);
  };

  return (
    <motion.div className={cn("space-y-2 md:space-y-3", !isRoot && "pl-3 ml-1.5 md:pl-6 md:ml-4 border-l border-zinc-50/5")}>
      <div className="bg-zinc-950/70 border border-white/10 rounded-lg min-h-[80px] relative p-3 md:p-5 space-y-3">
        <CommentHeader comment={comment} />
        <CommentBody comment={comment} />
        <ShowRepliesButton
          comment={comment}
          handleShowChildren={handleShowChildren}
          hasChildren={hasChildren}
          showChildren={showChildren}
        />
      </div>
      <CommentReplies comment={comment} depth={depth} showChildren={showChildren} />
    </motion.div>
  )
}

export default Comment;
