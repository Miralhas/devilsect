import { CommentInput, Vote } from "@/types/threaded-comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useNovelReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentInput, novelSlug }: { commentInput: CommentInput; novelSlug: string }) => {
      const res = await fetch(`/api/comment/${novelSlug}`, {
        method: "POST",
        body: JSON.stringify(commentInput)
      });
      if (!res.ok) {
        throw new Error("Failed to POST novel review!")
      }
    },
    onSuccess: async (_, { novelSlug }) => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews", novelSlug] });
    },
  });
}

export const useChapterCommentMutation = ({ novelSlug, chapterSlug }: { novelSlug: string; chapterSlug: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: CommentInput) => {
      const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}`, {
        method: "POST",
        body: JSON.stringify(comment)
      });
      if (!res.ok) throw new Error("Failed to POST chapter comment!")
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chapter", "comments", chapterSlug] });
    }
  });
}

export const useDeleteNovelReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId, novelSlug }: { commentId: number; novelSlug: string }) => {
      const res = await fetch(`/api/comment/${novelSlug}/action/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to DELETE novel review!")
      }
    },
    onSuccess: async (_, { novelSlug }) => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews", novelSlug] });
    }
  });
}

export const useUpdateNovelReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentInput, commentId, novelSlug }: { commentInput: CommentInput, commentId: number, novelSlug: string }) => {
      const res = await fetch(`/api/comment/${novelSlug}/action/${commentId}`, {
        method: "PUT",
        body: JSON.stringify(commentInput)
      });
      if (!res.ok) {
        throw new Error("Failed to PUT novel review!")
      }
    },
    onSuccess: async (_, { novelSlug }) => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews", novelSlug] });
    }
  });
}

export const useVoteMutation = (commentId: number) => {
  return useMutation({
    mutationFn: async (vote: Vote) => {
      const res = await fetch(`/api/comment/vote/${commentId}`, {
        method: "POST",
        body: JSON.stringify(vote)
      });
      if (!res.ok) {
        throw new Error("Failed to PUT novel review!")
      }
    },
  })
}

