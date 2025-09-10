'use client'

import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import useCommentActions from "@/hooks/use-comment-actions";
import { CommentInput, ThreadedComment } from "@/types/threaded-comment";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MessageCircleMore } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const Reply = ({ comment }: { comment: ThreadedComment }) => {
  const [open, setOpen] = useState(false);
  const { slug: novelSlug,  } = useParams<{ slug: string; chapterSlug: string }>();
  const { handleNewNovelReview } = useCommentActions();

  const onSubmit = (commentInput: CommentInput) => {
    onNovelReplySubmit(commentInput);
  }

  const onNovelReplySubmit = (commentInput: CommentInput) => {
    handleNewNovelReview({ commentInput: ({ ...commentInput, parentCommentId: comment.id }), novelSlug });
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="hover:text-accent focus-visible:text-accent" variant="pure" size="none">
          <MessageCircleMore className="size-4" strokeWidth={2.5} />
          <span className="text-xs text-[13px]">Reply</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-zinc-300/90">Write a Reply</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <RichTextEditor onCancel={() => setOpen(false)} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}

export default Reply;
