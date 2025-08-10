import { useQuery } from "@tanstack/react-query";
import { getNovelChapterSummaries } from "./server-queries";

export const useGetNovelChapterSummaries = ({ novelSlug, page, size }: { novelSlug: string, page: number, size: number }) => useQuery({
  queryFn: () => getNovelChapterSummaries(novelSlug, page, size),
  queryKey: ["novel", "chapters", { novelSlug, page, size }],

})