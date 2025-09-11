import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CommentInput, ThreadedComment } from "@/types/threaded-comment";
import { Pencil } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  onSubmit: (commentInput: CommentInput) => void;
  currentComment: ThreadedComment;
}

const UpdateCommentModal = ({ onSubmit, open, setOpen, currentComment }: Props) => {
  const { message, isSpoiler } = currentComment
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="gap-2 items-center justify-start text-zinc-300/90 rounded-xs hover:opacity-80" variant="pure" size="none">
          <Pencil className="size-4" />
          <span className="text-xs">Edit Comment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-zinc-300/90">Edit</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <RichTextEditor onCancel={() => setOpen(false)} onSubmit={onSubmit} initialData={{ message, isSpoiler }} />
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCommentModal;
