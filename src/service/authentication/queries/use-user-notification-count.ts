import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { authKeys } from "./query-keys";
import { getUserNotificationCount } from "../api/get-user-notification-count";

const userNotificationCountQueryOptions = () => queryOptions({
  queryFn: getUserNotificationCount,
  queryKey: authKeys.notificationCount(),
  placeholderData: keepPreviousData,
});

export const useUserNotificationCount = () => useQuery(userNotificationCountQueryOptions());