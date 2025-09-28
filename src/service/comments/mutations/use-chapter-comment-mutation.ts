import { CHAPTER_COMMENTS_PAGE_SIZE } from "@/components/chapters/chapter-comments";
import { useCommentsContext } from "@/contexts/comments-context";
import { SortKey } from "@/lib/schemas/search-params/comment-params-schema";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { postChapterComment } from "../api/post-chapter-comment";
import { commentKeys } from "../queries/query-keys";

export const useChapterCommentMutation = () => {
  const queryClient = useQueryClient();
  const { sort, handleSort, user } = useCommentsContext();
  return useMutation({
    mutationFn: postChapterComment,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
    onMutate: async ({ chapterSlug, commentInput, novelSlug }) => {
      const queryKey = commentKeys.getChapterComments({ chapterSlug, novelSlug, size: CHAPTER_COMMENTS_PAGE_SIZE, sort });
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
            type: "CHAPTER_REVIEW",
            updatedAt: new Date().toISOString(),
            voteCount: 0,
            commenter: user,
          }
          const newResults = [newComment, ...prevDataResults];
          return { ...prevData, pages: [{ ...prevData.pages[0], results: newResults }] };
        } catch (error) {
          console.log(error);
        }
      });
    }
  });
}