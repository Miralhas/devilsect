import { useQuery } from "@tanstack/react-query";
import { getChapterComments, getNovelReviews } from "./api";

export const useGetChapterComments = ({ chapterSlug, novelSlug }: { novelSlug: string, chapterSlug: string }) => useQuery({
  queryFn: () => getChapterComments({ chapterSlug, novelSlug }),
  queryKey: ["chapter", "comments", chapterSlug],
});

export const useGetNovelReviews = ({ novelSlug }: { novelSlug: string }) => useQuery({
  queryFn: () => getNovelReviews(novelSlug),
  queryKey: ["novel", "reviews", novelSlug],
});