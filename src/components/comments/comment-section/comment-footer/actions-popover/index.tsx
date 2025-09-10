
import ConfirmDeleteDialog from "@/components/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import useCommentActions from "@/hooks/use-comment-actions";
import { CommentInput, ThreadedComment } from "@/types/threaded-comment";
import { Ellipsis, TrashIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import UpdateCommentModal from "./update-comment-modal";

const ActionsPopover = ({ comment }: { comment: ThreadedComment }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { slug: novelSlug,  } = useParams<{ slug: string; chapterSlug: string }>();
  const { handleDeleteNovelReview, handleUpdateNovelReview } = useCommentActions();

  const handleDelete = () => {
    handleDeleteNovelReview({ commentId: comment.id, novelSlug });
  }

  const handleUpdate = (commentInput: CommentInput) => {
    handleUpdateNovelReview({ commentInput, commentId: comment.id, novelSlug });
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="hover:text-accent focus-visible:text-accent" variant="pure" size="none">
            <Ellipsis className="size-5 relative top-0.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="bg-background border-zinc-50/15 flex flex-col max-w-[150px] py-3 px-3 gap-2.5">
          <UpdateCommentModal currentComment={comment} onSubmit={handleUpdate} open={openEdit} setOpen={setOpenEdit} />
          <Separator />
          <Button
            className="gap-2 items-center justify-start text-zinc-300/90 rounded-xs hover:opacity-80"
            variant="pure"
            size="none"
            onClick={() => setOpenDelete(true)}
          >
            <TrashIcon className="size-4" />
            <span className="text-xs">Delete Comment</span>
          </Button>
        </PopoverContent>
      </Popover>
      <ConfirmDeleteDialog
        onSubmit={handleDelete}
        open={openDelete}
        setOpen={setOpenDelete}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone"
      />
    </>
  )
}

export default ActionsPopover;
