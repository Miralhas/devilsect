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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews"] });
    },
  });
}

export const useChapterCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ novelSlug, chapterSlug, commentInput }: { novelSlug: string; chapterSlug: string; commentInput: CommentInput; }) => {
      const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}`, {
        method: "POST",
        body: JSON.stringify(commentInput)
      });
      if (!res.ok) throw new Error("Failed to POST chapter comment!")
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chapter", "comments"] });
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews"] });
    }
  });
}

export const useDeleteChapterComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId, novelSlug, chapterSlug }: { commentId: number, novelSlug: string; chapterSlug: string }) => {
      const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}/action/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to DELETE novel review!")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chapter", "comments"] });
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews"] });
    }
  });
}

export const useUpdateChapterComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentInput, commentId, novelSlug, chapterSlug }: { commentInput: CommentInput, commentId: number, novelSlug: string; chapterSlug: string }) => {
      const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}/action/${commentId}`, {
        method: "PUT",
        body: JSON.stringify(commentInput)
      });
      if (!res.ok) {
        throw new Error("Failed to PUT novel review!")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chapter", "comments"] });
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

