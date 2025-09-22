import { CHAPTER_COMMENTS_PAGE_SIZE } from "@/components/chapters/chapter-comments";
import { NOVEL_REVIEWS_PAGE_SIZE } from "@/components/novel/novel-detail/novel-reviews";
import { useCommentsContext } from "@/contexts/comments-context";
import { SortKey } from "@/lib/schemas/comment-params-schema";
import { PaginatedQuery } from "@/types/pagination";
import { CommentInput, ThreadedComment, Vote } from "@/types/threaded-comment";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useNovelReviewMutation = () => {
  const queryClient = useQueryClient();
  const { sort, handleSort, user } = useCommentsContext();
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
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews"] });
    },
    onMutate: async ({ commentInput, novelSlug }) => {
      const queryKey = ['novel', 'reviews', { novelSlug, size: NOVEL_REVIEWS_PAGE_SIZE, sort }]
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
          const newResults = [newComment, ...prevDataResults];
          return { ...prevData, pages: [{ ...prevData.pages[0], results: newResults }] };
        } catch (error) {
          console.log(error);
        }
      });
    }
  });
}

export const useChapterCommentMutation = () => {
  const queryClient = useQueryClient();
  const { sort, handleSort, user } = useCommentsContext();
  return useMutation({
    mutationFn: async ({ novelSlug, chapterSlug, commentInput }: { novelSlug: string; chapterSlug: string; commentInput: CommentInput; }) => {
      const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}`, {
        method: "POST",
        body: JSON.stringify(commentInput)
      });
      if (!res.ok) throw new Error("Failed to POST chapter comment!")
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chapter", "comments"] });
    },
    onMutate: async ({ chapterSlug, commentInput, novelSlug }) => {
      const queryKey = ['chapter', 'comments', { chapterSlug, novelSlug, size: CHAPTER_COMMENTS_PAGE_SIZE, sort }];
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

export const useDeleteNovelReview = () => {
  const queryClient = useQueryClient();
  const { sort, user } = useCommentsContext();
  return useMutation({
    mutationFn: async ({ commentId, novelSlug }: { commentId: number; novelSlug: string }) => {
      const res = await fetch(`/api/comment/${novelSlug}/action/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to DELETE novel review!")
      }
    },
    onSuccess: () => { toast.success("Review deleted successfully!") },
    onError: () => { toast.error("Failed to delete review. Try again later!") },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews"] });
    },
    onMutate: async ({ commentId, novelSlug }) => {
      const queryKey = ['novel', 'reviews', { novelSlug, size: NOVEL_REVIEWS_PAGE_SIZE, sort }]
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

export const useDeleteChapterComment = () => {
  const queryClient = useQueryClient();
  const { sort, user } = useCommentsContext();
  return useMutation({
    mutationFn: async ({ commentId, novelSlug, chapterSlug }: { commentId: number, novelSlug: string; chapterSlug: string }) => {
      const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}/action/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to DELETE novel review!")
      }
    },
    onSuccess: () => { toast.success("Comment deleted successfully!") },
    onError: () => { toast.error("Failed to delete comment. Try again later!") },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chapter", "comments"] });
    },
    onMutate: async ({ chapterSlug, commentId, novelSlug }) => {
      const queryKey = ['chapter', 'comments', { chapterSlug, novelSlug, size: CHAPTER_COMMENTS_PAGE_SIZE, sort }];
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

export const useUpdateNovelReview = () => {
  const queryClient = useQueryClient();
  const { sort, user } = useCommentsContext();
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
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["novel", "reviews"] });
    },
    onMutate: async ({ commentId, commentInput, novelSlug }) => {
      const queryKey = ['novel', 'reviews', { novelSlug, size: NOVEL_REVIEWS_PAGE_SIZE, sort }]
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

export const useUpdateChapterComment = () => {
  const queryClient = useQueryClient();
  const { sort, user } = useCommentsContext();
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
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chapter", "comments"] });
    },
    onMutate: async ({ chapterSlug, commentId, commentInput, novelSlug }) => {
      const queryKey = ['chapter', 'comments', { chapterSlug, novelSlug, size: CHAPTER_COMMENTS_PAGE_SIZE, sort }];
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

