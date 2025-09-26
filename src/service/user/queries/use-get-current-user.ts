import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCurrentUserClientSide } from "../api/get-current-user-client-side";
import { authKeys } from "./query-keys";

const currentUserQueryOptions = () => queryOptions({
  queryFn: getCurrentUserClientSide,
  queryKey: authKeys.all,
  retry: 1,
  refetchOnWindowFocus: false,
});

export const useCurrentUser = () => useQuery(currentUserQueryOptions());
