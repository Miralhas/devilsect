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
import { useChapterCommentMutation, useNovelReviewMutation } from "@/services/comments/client-mutations";
import { CommentInput, ThreadedComment } from "@/types/threaded-comment";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MessageCircleMore } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Reply = ({ comment }: { comment: ThreadedComment }) => {
  const [open, setOpen] = useState(false);
  const { slug: novelSlug, chapterSlug } = useParams<{ slug: string; chapterSlug: string }>();
  const novelReviewMutation = useNovelReviewMutation({ novelSlug });
  const chapterReviewMutation = useChapterCommentMutation({ novelSlug, chapterSlug });

  const onSubmit = (commentInput: CommentInput) => {
    if (chapterSlug) {
      onChapterCommentSubmit(commentInput);
      return;
    }
    onNovelReviewSubmit(commentInput);
  }

  const onChapterCommentSubmit = (commentInput: CommentInput) => {
    chapterReviewMutation.mutate({ ...commentInput, parentCommentId: comment.id }, {
      onSuccess: () => {
        toast.success("Reply posted!")
      }
    })
  }

  const onNovelReviewSubmit = (commentInput: CommentInput) => {
    novelReviewMutation.mutate({ ...commentInput, parentCommentId: comment.id }, {
      onSuccess: () => {
        toast.success("Reply posted!")
      }
    })
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
