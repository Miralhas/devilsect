import { RequestParams } from "@/lib/schemas/search-params/request-params";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllRequests } from "../api/get-all-requests";
import { requestKeys } from "./query-keys";

export const getAllRequestsQueryOptions = (params: RequestParams) => queryOptions({
  queryFn: () => getAllRequests(params),
  queryKey: requestKeys.getRequests(params),
});

export const useGetAllRequests = (params: RequestParams) => useQuery(getAllRequestsQueryOptions(params));