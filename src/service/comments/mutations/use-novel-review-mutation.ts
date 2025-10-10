import { NOVEL_REVIEWS_PAGE_SIZE } from "@/components/novel/novel-detail/novel-reviews";
import { useCommentsContext } from "@/contexts/comments-context";
import { SortKey } from "@/lib/schemas/search-params/comment-params-schema";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { postNovelReview } from "../api/post-novel-review";
import { reviewKeys } from "../queries/query-keys";

export const useNovelReviewMutation = () => {
  const queryClient = useQueryClient();
  const { sort, handleSort, user } = useCommentsContext();
  return useMutation({
    mutationFn: postNovelReview,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
    onMutate: async ({ commentInput, novelSlug }) => {
      const queryKey = reviewKeys.getNovelReviews({ novelSlug, size: NOVEL_REVIEWS_PAGE_SIZE, sort })
      await queryClient.cancelQueries({ queryKey });

      handleSort(SortKey.NEWEST);

      queryClient.setQueryData(queryKey, (prevData: InfiniteData<PaginatedQuery<ThreadedComment[]>, unknown>) => {
        try {
          if (!prevData) return undefined;
          if (!user) return undefined;

          const prevDataResults = prevData.pages[0].results;

          const newComment: ThreadedComment = {
            id: Math.random(),
            childComments: [],
            voters: [],
            createdAt: new Date().toISOString(),
            parentId: commentInput.parentCommentId,
            message: commentInput.message,
            isSpoiler: commentInput.isSpoiler,
            type: "NOVEL_REVIEW",
            updatedAt: new Date().toISOString(),
            voteCount: 0,
            commenter: user,
          }

          if (commentInput.parentCommentId !== null) {
            const newResults = prevDataResults.map(r => {
              if (r.id === commentInput.parentCommentId) {
                return {
                  ...r,
                  childComments: [...r.childComments, newComment]
                };
              }
              return r;
            })
            return { ...prevData, pages: [{ ...prevData.pages[0], results: newResults }] };
          } else {
            const newResults = [newComment, ...prevDataResults];
            return { ...prevData, pages: [{ ...prevData.pages[0], results: newResults }] };
          }

        } catch (error) {
          console.log(error);
        }
      });
    }
  });
}