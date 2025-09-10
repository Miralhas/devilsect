import { CommentParams } from "@/lib/schemas/comment-params-schema";
import { useQuery } from "@tanstack/react-query";
import { getChapterComments, getNovelReviews } from "./api";

export const useGetChapterComments = ({ chapterSlug, novelSlug }: { novelSlug: string, chapterSlug: string }) => useQuery({
  queryFn: () => getChapterComments({ chapterSlug, novelSlug }),
  queryKey: ["chapter", "comments", chapterSlug],
});

export const useGetNovelReviews = (props: CommentParams) => useQuery({
  queryFn: () => getNovelReviews(props),
  queryKey: ["novel", "reviews", props],
});