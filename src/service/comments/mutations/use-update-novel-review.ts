import { NOVEL_REVIEWS_PAGE_SIZE } from "@/components/novel/novel-detail/novel-reviews";
import { useCommentsContext } from "@/contexts/comments-context";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNovelReview } from "../api/update-novel-review";
import { reviewKeys } from "../queries/query-keys";

export const useUpdateNovelReview = () => {
  const queryClient = useQueryClient();
  const { sort, user } = useCommentsContext();
  return useMutation({
    mutationFn: updateNovelReview,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
    onMutate: async ({ commentId, commentInput, novelSlug }) => {
      const queryKey = reviewKeys.getNovelReviews({ novelSlug, size: NOVEL_REVIEWS_PAGE_SIZE, sort })
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