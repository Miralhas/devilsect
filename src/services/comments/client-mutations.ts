import { CommentInput } from "@/types/threaded-comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useNovelReviewMutation = ({ novelSlug }: { novelSlug: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: CommentInput) => {
      const res = await fetch(`/api/comment/${novelSlug}`, {
        method: "POST",
        body: JSON.stringify(comment)
      });
      if (!res.ok) throw new Error("Failed to POST novel comment!")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["novel", "reviews", novelSlug] });
    }
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["chapter", "comments", chapterSlug] });
    }
  });
} 