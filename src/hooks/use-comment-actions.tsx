'use client'

import { useChapterCommentMutation } from "@/service/comments/mutations/use-chapter-comment-mutation";
import { useDeleteChapterComment } from "@/service/comments/mutations/use-delete-chapter-comment";
import { useDeleteNovelReview } from "@/service/comments/mutations/use-delete-novel-review";
import { useNovelReviewMutation } from "@/service/comments/mutations/use-novel-review-mutation";
import { useUpdateChapterComment } from "@/service/comments/mutations/use-update-chapter-comment";
import { useUpdateNovelReview } from "@/service/comments/mutations/use-update-novel-review";
import { CommentInput } from "@/types/threaded-comment";
import { toast } from "sonner";

const useCommentActions = () => {
  const novelReviewMutation = useNovelReviewMutation();
  const deleteNovelReviewMutation = useDeleteNovelReview();
  const updateNovelReview = useUpdateNovelReview();
  const chapterCommentMutation = useChapterCommentMutation();
  const updateChapterComment = useUpdateChapterComment();
  const deleteChapterComment = useDeleteChapterComment();

  const handleNewChapterComment = (props: { novelSlug: string; chapterSlug: string; commentInput: CommentInput; }) => {
    chapterCommentMutation.mutate(props, {
      onSuccess: () => { toast.success("Comment added successfully.") },
      onError: () => { toast.error("Failed to post your comment. Please try again later.") }
    });
  }

  const handleNewNovelReview = (props: { commentInput: CommentInput, novelSlug: string }) => {
    novelReviewMutation.mutate(props, {
      onSuccess: () => { toast.success("Review added successfully.") },
      onError: () => { toast.error("Failed to post your review. Please try again later.") }
    })
  }

  const handleDeleteNovelReview = (props: { commentId: number; novelSlug: string }) => {
    deleteNovelReviewMutation.mutate(props)
  }

  const handleUpdateNovelReview = (props: { commentInput: CommentInput, commentId: number, novelSlug: string }) => {
    updateNovelReview.mutate(props, {
      onSuccess: () => { toast.success("Review updated successfully!") },
      onError: () => { toast.error("Failed to update review. Try again later!") }
    })
  }

  const handleUpdateChapterComment = (props: { commentInput: CommentInput, commentId: number, novelSlug: string; chapterSlug: string }) => {
    updateChapterComment.mutate(props, {
      onSuccess: () => { toast.success("Comment updated successfully!") },
      onError: () => { toast.error("Failed to update comment. Try again later!") }
    })
  }

  const handleDeleteChapterComment = (props: { commentId: number, novelSlug: string; chapterSlug: string }) => {
    deleteChapterComment.mutate(props)
  }

  return {
    handleDeleteNovelReview,
    handleUpdateNovelReview,
    handleNewNovelReview,
    handleNewChapterComment,
    handleUpdateChapterComment,
    handleDeleteChapterComment
  };
}

export default useCommentActions;
