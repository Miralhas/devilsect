import { inferParserType, parseAsArrayOf, parseAsIndex, parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs/server';
import { z } from "zod";
import { zodPagination } from './pagination-schema';

export enum SortKey {
  MOST_VIEWED = "views,id,desc",
  NEWEST_RELEASES = "createdAt,id,desc",
  BAYESIAN_RANKING = "bayesianScore,id,desc",
  MOST_RATED = "ratingValue,id,desc"
}

export const sortKeyParams = ["views", 'newest', 'popularity', 'rating'] as const

export const mapSortKey = (value: string): SortKey => {
  switch (value) {
    case 'views': return SortKey.MOST_VIEWED;
    case "newest": return SortKey.NEWEST_RELEASES;
    case "rating": return SortKey.MOST_RATED;
    default: return SortKey.BAYESIAN_RANKING
  }
}

export const allowedValues = {
  status: ["COMPLETED", "ON_GOING", ""],
  sort: [SortKey.BAYESIAN_RANKING, SortKey.MOST_RATED, SortKey.MOST_VIEWED, SortKey.NEWEST_RELEASES],
  chaptersRange: ["", "1:500", "500:1000", "1000:2000", "2000:3000", "3000:100000"],
} as const

export const NovelSummariesParamsSchema = z.object({
  q: z.string().catch("").optional(),
  tags: z.string().catch("").optional(),
  genres: z.string().catch("").optional(),
  author: z.string().catch("").optional(),
  chaptersRange: z.enum(allowedValues.chaptersRange).catch("").optional(),
  status: z.enum(allowedValues.status).catch("").optional(),
  sort: z.enum(allowedValues.sort).catch(SortKey.BAYESIAN_RANKING).optional(),
  ...zodPagination
});

export const nuqsNovelSummariesParams = {
  q: parseAsString.withDefault("").withOptions({ clearOnDefault: true, }),
  page: parseAsIndex.withDefault(0).withOptions({ clearOnDefault: true, history: "push", scroll: true }),
  size: parseAsInteger.withDefault(18).withOptions({ clearOnDefault: true, }),
  genres: parseAsArrayOf(parseAsString).withDefault([]).withOptions({ clearOnDefault: true, }),
  status: parseAsStringLiteral(allowedValues.status).withDefault("").withOptions({ clearOnDefault: true, }),
  chaptersRange: parseAsStringLiteral(allowedValues.chaptersRange).withDefault("").withOptions({ clearOnDefault: true, }),
  sort: parseAsStringLiteral(sortKeyParams).withDefault('popularity').withOptions({ clearOnDefault: true, }),
}

export type NovelSummariesParams = z.infer<typeof NovelSummariesParamsSchema>;
export type NovelSearchParams = inferParserType<typeof nuqsNovelSummariesParams>;