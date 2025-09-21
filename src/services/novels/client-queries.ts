import { env } from "@/env";
import { NovelSummariesParams, NovelSummariesParamsSchema, SortKey } from "@/lib/schemas/novel-summaries-params-schema";
import { PaginationSchema, PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { buildQueryString } from "@/lib/utils";
import { Genre, Metrics, Novel, NovelSummary, Tag } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import { Rating } from "@/types/rating";
import { queryOptions, useQuery } from "@tanstack/react-query";

type NovelSummaryParams = { params: NovelSummariesParams; enabled?: boolean };

const getNovelSummaries = async (params: NovelSummariesParams) => {
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

const getNovelGenres = async () => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/genres`;
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch genres: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Genre[]
}

const getNovelTags = async (params: PaginationSchemaParams) => {
  const parsed = PaginationSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/tags${queryString}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
  }

  return await res.json() as PaginatedQuery<Tag[]>
}

const getNovelMetrics = async (novelSlug: string) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/metric`;
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel metrics: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Metrics;
}

export const useGetUserRatingOnNovel = (params: { novelId: number, userId: number }) => useQuery({
  queryFn: async () => {
    const res = await fetch(`/api/user/ratings/${params.novelId}`)
    if (!res.ok) throw new Error("Failed to fetch user rating on novel");
    return await res.json() as Rating;
  },
  queryKey: ["rating", params],
  retry: 0,
  refetchOnWindowFocus: false
});

export const useGetNovelSummaries = ({ params, enabled = false }: NovelSummaryParams) => (
  useQuery(novelSummariesQueryOptions({ params, enabled }))
);

export const novelSummariesQueryOptions = ({ params, enabled = false }: NovelSummaryParams) => (
  queryOptions({
    queryFn: async () => getNovelSummaries(params),
    queryKey: ["novel", "list", params],
    enabled: () => !!params.q || enabled,
  })
);

export const novelSummariesInitialParams: NovelSummariesParams = { size: 50, page: 0, sort: SortKey.BAYESIAN_RANKING };

export const useGetGenres = () => useQuery({
  queryFn: getNovelGenres,
  queryKey: ["genre", "list"]
});

export const useGetTags = (params: PaginationSchemaParams) => useQuery({
  queryFn: () => getNovelTags(params),
  queryKey: ["tag", "list", params]
});

export const useGetNovelMetrics = (novel: Novel) => useQuery({
  queryFn: () => getNovelMetrics(novel.slug),
  queryKey: ["novel", "detail", "ratings", novel.id],
  initialData: novel.metrics,
});