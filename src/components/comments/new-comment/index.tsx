'use client'

import { CommentInput } from "@/types/threaded-comment";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import RichTextEditor from "../../rich-text-editor";
import AddCommentButton from "./add-comment-button";
import { useGlobalLoginContext } from "@/contexts/global-login-context";

type Props = {
  isAuthenticated: boolean;
  onSubmit: (commentInput: CommentInput) => void;
}

const NewComment = ({ isAuthenticated, onSubmit }: Props) => {
  const [showEditor, setShowEditor] = useState(false);
  const { handleOpen } = useGlobalLoginContext();

  const onChangeEditor = () => {
    if (!isAuthenticated) return handleOpen();
    setShowEditor(prev => !prev)
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          height: { duration: 0.1, ease: "easeInOut" },
          opacity: { duration: 0.1, ease: "easeInOut" },
          exit: { duration: 0.1, ease: "easeInOut" }
        }}
        key={showEditor ? "editor" : "button"}
      >
        {showEditor ? (
          <RichTextEditor onCancel={onChangeEditor} onSubmit={onSubmit} />
        ) : (
          <AddCommentButton onClick={onChangeEditor} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default NewComment;
