'use client'

import { useState } from "react";
import RichTextEditor from "./rich-text-editor";
import AddCommentButton from "./add-comment-button";
import { AnimatePresence, motion } from "motion/react";

const CommentEditor = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [showEditor, setShowEditor] = useState(false);
  
  const onChangeEditor = () => {
    if (!isAuthenticated) return;
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
          <RichTextEditor cancel={onChangeEditor} />
        ) : (
          <AddCommentButton onClick={onChangeEditor} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default CommentEditor;
