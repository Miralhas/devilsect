import { CommentParams } from "@/lib/schemas/comment-params-schema";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getChapterComments, getNovelReviews } from "./api";

export const useGetChapterComments = ({ chapterSlug, novelSlug }: { novelSlug: string, chapterSlug: string }) => useQuery({
  queryFn: () => getChapterComments({ chapterSlug, novelSlug }),
  queryKey: ["chapter", "comments", chapterSlug],
});

export const useGetNovelReviews = (props: CommentParams) => useInfiniteQuery({
  queryFn: ({ pageParam }) => getNovelReviews({ ...props, page: pageParam }),
  getNextPageParam: (lastPage) => lastPage.next,
  queryKey: ["novel", "reviews", props],
  initialPageParam: 0,
});