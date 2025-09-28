import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCurrentUserClientSide } from "../api/get-current-user-client-side";
import { userKeys } from "./query-keys";

const currentUserQueryOptions = () => queryOptions({
  queryFn: getCurrentUserClientSide,
  queryKey: userKeys.all,
  retry: 1,
  refetchOnWindowFocus: false,
});

export const useCurrentUser = () => useQuery(currentUserQueryOptions());
