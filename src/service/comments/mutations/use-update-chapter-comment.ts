import { CHAPTER_COMMENTS_PAGE_SIZE } from "@/components/chapters/chapter-comments";
import { useCommentsContext } from "@/contexts/comments-context";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChapterComment } from "../api/update-chapter-comment";
import { commentKeys } from "../queries/query-keys";

export const useUpdateChapterComment = () => {
  const queryClient = useQueryClient();
  const { sort, user } = useCommentsContext();
  return useMutation({
    mutationFn: updateChapterComment,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
    onMutate: async ({ chapterSlug, commentId, commentInput, novelSlug }) => {
      const queryKey = commentKeys.getChapterComments({ chapterSlug, novelSlug, size: CHAPTER_COMMENTS_PAGE_SIZE, sort });
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData(queryKey, (prevData: InfiniteData<PaginatedQuery<ThreadedComment[]>, unknown>) => {
        try {
          if (!prevData) return undefined;
          if (!user) return undefined;

          const prevDataResults = prevData.pages[0].results;
          const newResults = prevDataResults.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, message: commentInput.message };
            }
            return comment;
          })
          return { ...prevData, pages: [{ ...prevData.pages[0], results: newResults }] };
        } catch (error) {
          console.log(error);
        }
      });
    }
  });
}
