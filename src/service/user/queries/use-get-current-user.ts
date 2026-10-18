import { getAuthState } from "@/service/authentication/api/get-auth-state";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { userKeys } from "./query-keys";

const getAuthStateQueryOptions = () => queryOptions({
  queryFn: getAuthState,
  queryKey: userKeys.all,
  refetchOnWindowFocus: false,
  retry: 1,
});

export const useGetAuthState = () => useQuery(getAuthStateQueryOptions());