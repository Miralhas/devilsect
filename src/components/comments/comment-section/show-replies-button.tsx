import { ThreadedComment } from "@/types/threaded-comment";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

type ShowRepliesProps = {
  hasChildren: boolean;
  showChildren: boolean;
  handleShowChildren: () => void;
  comment: ThreadedComment;
}

const ShowRepliesButton = ({ hasChildren, handleShowChildren, showChildren, comment }: ShowRepliesProps) => {
  return (
    <>
      {hasChildren && (
        <Button
          variant="link"
          size="none"
          className="mt-2 text-xs md:text-[13px] text-accent flex items-center gap-1 cursor-pointer w-max hover:no-underline"
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
