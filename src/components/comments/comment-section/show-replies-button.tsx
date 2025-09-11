import { Button } from "@/components/ui/button";
import { ThreadedComment } from "@/types/threaded-comment";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

type ShowRepliesProps = {
  hasChildren: boolean;
  showChildren: boolean;
  handleShowChildren: () => void;
  comment: ThreadedComment;
  openChildren: () => void;
}

const ShowRepliesButton = ({ hasChildren, handleShowChildren, showChildren, comment, openChildren }: ShowRepliesProps) => {
  const commentRef = useRef<number>(comment.childComments.length);

  useEffect(() => {
    if (comment.childComments.length !== commentRef.current) {
      commentRef.current = comment.childComments.length;
      openChildren();
    }
  }, [comment.childComments, openChildren])


  return (
    <>
      {hasChildren && (
        <Button
          variant="link"
          size="none"
          className="text-xs md:text-[13px] text-accent flex items-center gap-1 cursor-pointer w-max hover:no-underline"
          onClick={handleShowChildren}
        >
          <motion.span
            className="cursor-pointer w-max inline-block font-light"
            animate={{ rotate: showChildren ? 90 : 0 }}
          >
            ▶
          </motion.span>
          {showChildren ? <span>Hide replies</span> : <span>Show {comment.childComments.length} replies</span>}
        </Button>
      )}
    </>
  )
}

export default ShowRepliesButton;
