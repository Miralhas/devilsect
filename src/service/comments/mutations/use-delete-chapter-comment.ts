import { CHAPTER_COMMENTS_PAGE_SIZE } from "@/components/chapters/chapter-comments";
import { useCommentsContext } from "@/contexts/comments-context";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteChapterComment } from "../api/delete-chapter-comment";
import { commentKeys } from "../queries/query-keys";

export const useDeleteChapterComment = () => {
  const queryClient = useQueryClient();
  const { sort, user } = useCommentsContext();
  return useMutation({
    mutationFn: deleteChapterComment,
    onSuccess: () => { toast.success("Comment deleted successfully!") },
    onError: () => { toast.error("Failed to delete comment. Try again later!") },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
    onMutate: async ({ chapterSlug, commentId, novelSlug }) => {
      const queryKey = commentKeys.getChapterComments({ chapterSlug, novelSlug, size: CHAPTER_COMMENTS_PAGE_SIZE, sort })
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData(queryKey, (prevData: InfiniteData<PaginatedQuery<ThreadedComment[]>, unknown>) => {
        try {
          if (!prevData) return undefined;
          if (!user) return undefined;

          const prevDataResults = prevData.pages[0].results;
          const newResults = prevDataResults.filter(comment => comment.id !== commentId);
          return { ...prevData, pages: [{ ...prevData.pages[0], results: newResults }] };
        } catch (error) {
          console.log(error);
        }
      });
    }
  });
}