import { env } from "@/env";
import { NovelSummariesParams, NovelSummariesParamsSchema } from "@/lib/schemas/novel-summaries-params-schema";
import { buildQueryString } from "@/lib/utils";
import { NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";

export const getNovelSummaries = async (params: NovelSummariesParams) => {
  const parsed = NovelSummariesParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels${queryString}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel summaries: ${res.status} ${res.statusText}`);
  }

  return await res.json() as PaginatedQuery<NovelSummary[]>;
}
