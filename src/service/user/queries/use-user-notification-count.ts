import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { getUserNotificationCount } from "../api/get-user-notification-count";
import { userKeys } from "./query-keys";

const userNotificationCountQueryOptions = () => queryOptions({
  queryFn: getUserNotificationCount,
  queryKey: userKeys.notificationCount(),
  placeholderData: keepPreviousData,
});

export const useUserNotificationCount = () => useQuery(userNotificationCountQueryOptions());