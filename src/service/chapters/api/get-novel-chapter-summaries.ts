import { env } from "@/env";
import { PaginationSchema, PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { ChapterSummary } from "@/types/chapter";
import { PaginatedQuery } from "@/types/pagination";
import { buildQueryString } from "@/utils/string-utils";

export const getNovelChapterSummaries = async (
  novelSlug: string, params: PaginationSchemaParams
): Promise<PaginatedQuery<ChapterSummary[]>> => {
  const parsed = PaginationSchema.parse(params);
  const queryString = buildQueryString(parsed);
  
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/chapters${queryString}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("failed to fetch novel chapters");
  }

  return await res.json() as Promise<PaginatedQuery<ChapterSummary[]>>;
}