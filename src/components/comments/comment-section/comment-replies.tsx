import { ThreadedComment } from "@/types/threaded-comment";
import { AnimatePresence, motion } from "motion/react";
import Comment from "./comment";
import { User } from "@/types/authentication";

type Props = {
  depth: number;
  showChildren: boolean;
  comment: ThreadedComment;
  currentUser?: User
};

const CommentReplies = ({ comment, depth, showChildren, currentUser }: Props) => {
  return (
    <AnimatePresence initial={false}>
      {showChildren && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.2, ease: "easeInOut" },
            opacity: { duration: 0.1, ease: "easeInOut" },
            exit: { duration: 0, ease: "easeOut" }
          }}
          style={{ overflow: "hidden" }}
        >
          <div className="space-y-2 md:space-y-3">
            {comment.childComments.map((c) => (
              <Comment key={c.id} comment={c} depth={depth + 1} currentUser={currentUser} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommentReplies;
