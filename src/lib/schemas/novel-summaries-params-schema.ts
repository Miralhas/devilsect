import { createSerializer, parseAsIndex, parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs/server';
import { z } from "zod";

export enum SortKey {
  MOST_VIEWED = "views,id,desc",
  NEWEST_RELEASES = "createdAt,id,desc",
  BAYESIAN_RANKING = "bayesianScore,id,desc",
  MOST_RATED = "ratingValue,id,desc"
}

export const sortKeyParams = ["most-viewed", 'newest', 'popular', 'rating'] as const

export const allowedValues = {
  status: ["COMPLETED", "ON_GOING", ""],
  sort: [SortKey.BAYESIAN_RANKING, SortKey.MOST_RATED, SortKey.MOST_VIEWED, SortKey.NEWEST_RELEASES]
} as const

export const NovelSummariesParamsSchema = z.object({
  q: z.string().catch("").optional(),
  size: z.number().gt(0).catch(10).optional(),
  tags: z.string().catch("").optional(),
  genres: z.string().catch("").optional(),
  author: z.string().catch("").optional(),
  status: z.enum(allowedValues.status).catch("").optional(),
  sort: z.enum(allowedValues.sort).catch(SortKey.BAYESIAN_RANKING).optional(),
  page: z.number().gte(0).catch(0).optional(),
});

export const nuqsNovelSummariesParams = {
  q: parseAsString.withDefault("").withOptions({ shallow: true, clearOnDefault: true, history: "push" }),
  page: parseAsIndex.withDefault(0).withOptions({ shallow: true, clearOnDefault: true, history: "push", scroll: true}),
  size: parseAsInteger.withDefault(18).withOptions({ shallow: true, clearOnDefault: true, history: "push"}),
  genres: parseAsString.withDefault("").withOptions({ shallow: true, clearOnDefault: true, history: "push"}),
  status: parseAsStringLiteral(allowedValues.status).withDefault("").withOptions({ shallow: true, clearOnDefault: true, history: "push"}),
  sort: parseAsStringLiteral(sortKeyParams).withDefault('popular').withOptions({ shallow: true, clearOnDefault: true, history: "push"}),
}

export type NovelSummariesParams = z.infer<typeof NovelSummariesParamsSchema>;
export const novelsSerializer = createSerializer({ ...nuqsNovelSummariesParams });