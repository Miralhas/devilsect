import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { getUserNotificationCount } from "../api/get-user-notification-count";
import { authKeys } from "./query-keys";

const userNotificationCountQueryOptions = () => queryOptions({
  queryFn: getUserNotificationCount,
  queryKey: authKeys.notificationCount(),
  placeholderData: keepPreviousData,
});

export const useUserNotificationCount = () => useQuery(userNotificationCountQueryOptions());