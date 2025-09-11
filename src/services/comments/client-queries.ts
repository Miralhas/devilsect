import { ChapterCommentParams, NovelReviewParams } from "@/lib/schemas/comment-params-schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getChapterComments, getNovelReviews } from "./api";

export const useGetChapterComments = (props: ChapterCommentParams) => useInfiniteQuery({
  queryFn: ({ pageParam }) => getChapterComments({ ...props, page: pageParam }),
  queryKey: ["chapter", "comments", props],
  getNextPageParam: (lastPage) => lastPage.next,
  initialPageParam: 0,
});

export const useGetNovelReviews = (props: NovelReviewParams) => useInfiniteQuery({
  queryFn: ({ pageParam }) => getNovelReviews({ ...props, page: pageParam }),
  getNextPageParam: (lastPage) => lastPage.next,
  queryKey: ["novel", "reviews", props],
  initialPageParam: 0,
});