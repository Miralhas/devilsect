import { env } from "@/env";
import { NovelSummariesParams, NovelSummariesParamsSchema } from "@/lib/schemas/novel-summaries-params-schema";
import { buildQueryString } from "@/lib/utils";
import { EldersChoice, Novel, NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import { RecentlyAddedChapter } from "@/types/recently-added-chapters";

export const getNovelSummariesPaginated = async (params: NovelSummariesParams): Promise<PaginatedQuery<NovelSummary[]>> => {
  const parsed = NovelSummariesParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.APP_URL}/novels${queryString}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel summaries: ${res.status} ${res.statusText}`);
  }

  return await res.json() as PaginatedQuery<NovelSummary[]>;
}

export const getNovelBySlug = async (slug: string) => {
  const url = `${env.APP_URL}/novels/${slug}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Promise<Novel>;
}

export const getEldersChoice = async (): Promise<EldersChoice[]> => {
  const url = `${env.APP_URL}/elders-choice`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel summaries: ${res.status} ${res.statusText}`);
  }

  return await res.json() as EldersChoice[];
}

export const getRecentlyAddedChapters = async (): Promise<RecentlyAddedChapter[]> => {
  const url = `${env.APP_URL}/latest-chapters`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch novel summaries: ${res.status} ${res.statusText}`);
  }

  return await res.json() as RecentlyAddedChapter[]
}