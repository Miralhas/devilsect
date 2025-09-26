import { queryOptions, useQuery } from "@tanstack/react-query";
import { authKeys } from "./query-keys";
import { getCurrentUserClientSide } from "../api/get-current-user-client-side";

const currentUserQueryOptions = () => queryOptions({
  queryFn: getCurrentUserClientSide,
  queryKey: authKeys.all,
  retry: 1,
  refetchOnWindowFocus: false,
});

export const useCurrentUser = () => useQuery(currentUserQueryOptions());
