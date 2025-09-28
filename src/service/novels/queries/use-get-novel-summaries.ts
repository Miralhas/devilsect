import { NovelSummariesParams, SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getNovelSummaries } from "../api/get-novel-summaries";
import { novelKeys } from "./query-keys";

type NovelSummaryParams = { params: NovelSummariesParams; enabled?: boolean };

export const novelSummariesQueryOptions = ({ params, enabled = false }: NovelSummaryParams) => queryOptions({
  queryFn: () => getNovelSummaries(params),
  queryKey: novelKeys.getNovelSummaries(params),
  enabled: () => !!params.q || enabled,
});

export const useGetNovelSummaries = (params: NovelSummaryParams) => (
  useQuery(novelSummariesQueryOptions(params))
);

export const novelSummariesInitialParams: NovelSummariesParams = { size: 50, page: 0, sort: SortKey.BAYESIAN_RANKING };
export const novelListInitalParams: NovelSummariesParams = {
  genres: "",
  size: 18,
  q: "",
  page: 0,
  status: "",
  sort: SortKey.BAYESIAN_RANKING,
  chaptersRange: ""
};