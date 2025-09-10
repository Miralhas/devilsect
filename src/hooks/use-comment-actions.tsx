'use client'

import { useDeleteNovelReview, useNovelReviewMutation, useUpdateNovelReview } from "@/services/comments/client-mutations";
import { CommentInput } from "@/types/threaded-comment";
import { toast } from "sonner";

const useCommentActions = () => {
  const novelReviewMutation = useNovelReviewMutation();
  const deleteNovelReviewMutation = useDeleteNovelReview();
  const updateNovelReview = useUpdateNovelReview();

  const handleNewNovelReview = ({ commentInput, novelSlug }: { commentInput: CommentInput, novelSlug: string }) => {
    novelReviewMutation.mutate({ commentInput, novelSlug }, {
      onSuccess: () => { toast.success("Review added successfully.") },
      onError: () => { toast.error("Failed to post your review. Please try again later.") }
    })
  }

  const handleDeleteNovelReview = ({ commentId, novelSlug }: { commentId: number; novelSlug: string }) => {
    deleteNovelReviewMutation.mutate({ commentId, novelSlug }, {
      onSuccess: () => { toast.success("Comment deleted successfully!") },
      onError: () => { toast.error("Failed to delete comment. Try again later!") }
    })
  }

  const handleUpdateNovelReview = ({ commentInput, commentId, novelSlug }: { commentInput: CommentInput, commentId: number, novelSlug: string }) => {
    updateNovelReview.mutate({ commentInput, commentId, novelSlug }, {
      onSuccess: () => { toast.success("Comment updated successfully!") },
      onError: () => { toast.error("Failed to update comment. Try again later!") }
    })
  }

  return { handleDeleteNovelReview, handleUpdateNovelReview, handleNewNovelReview };
}

export default useCommentActions;
