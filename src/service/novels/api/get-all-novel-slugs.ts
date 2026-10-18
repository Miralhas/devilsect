import { env } from "@/env";
import { NovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { PaginatedQuery } from "@/types/pagination";
import { buildQueryString } from "@/utils/string-utils";

type Params = Pick<NovelSummariesParams, "sort" | "size">;

export const getAllNovelSlugs = async (query: Params = {}): Promise<PaginatedQuery<string[]>> => {
  const queryString = buildQueryString(query);
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/slugs${queryString}`;

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel slugs info: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Promise<PaginatedQuery<string[]>>;
}