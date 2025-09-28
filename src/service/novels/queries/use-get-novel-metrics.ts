import { Novel } from "@/types/novel";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getNovelMetrics } from "../api/get-novel-metrics";
import { novelKeys } from "./query-keys";

const getNovelMetricQueryOptions = (novel: Novel) => queryOptions({
  queryFn: () => getNovelMetrics(novel.slug),
  queryKey: novelKeys.getNovelMetrics(novel.id),
  initialData: novel.metrics,
})

export const useGetNovelMetrics = (novel: Novel) => useQuery(getNovelMetricQueryOptions(novel));