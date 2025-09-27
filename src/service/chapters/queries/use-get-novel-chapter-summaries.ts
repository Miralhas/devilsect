import { queryOptions, useQuery } from "@tanstack/react-query";
import { getNovelChapterSummaries } from "../api/get-novel-chapter-summaries";
import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";

type Params = PaginationSchemaParams & { novelSlug: string };

const novelChapterSummariesQueryOptions = ({ novelSlug, page, size }: Params) => queryOptions({
  queryFn: () => getNovelChapterSummaries(novelSlug, { page, size }),
  queryKey: ["novel", "chapters", { novelSlug, page, size }],
})

export const useGetNovelChapterSummaries = (params: Params) => useQuery(
  novelChapterSummariesQueryOptions(params)
);