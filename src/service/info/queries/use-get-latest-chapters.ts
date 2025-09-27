import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getLatestChapters } from "../api/get-latest-chapters";
import { infoKeys } from "./query-keys";

export const getLatestQueryOptions = (params: PaginationSchemaParams) => queryOptions({
  queryFn: () => getLatestChapters(params),
  queryKey: infoKeys.latestChapters(params)
})

export const useGetLatest = (params: PaginationSchemaParams) => useQuery(getLatestQueryOptions(params));
export const latestInitialParams: PaginationSchemaParams = { page: 0, size: 96 };