import { ChapterCommentParams } from "@/lib/schemas/search-params/comment-params-schema";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { getChapterComments } from "../api/get-chapter-comments";
import { commentKeys } from "./query-keys";

const getChapterCommentsQueryOptions = (params: ChapterCommentParams) => infiniteQueryOptions({
  queryFn: ({ pageParam }) => getChapterComments({ ...params, page: pageParam }),
  queryKey: commentKeys.getChapterComments(params),
  getNextPageParam: (lastPage) => lastPage.next,
  initialPageParam: 0,
});

export const useGetChapterComments = (params: ChapterCommentParams) => useInfiniteQuery(
  getChapterCommentsQueryOptions(params)
);
