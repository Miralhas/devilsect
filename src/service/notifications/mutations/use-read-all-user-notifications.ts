import { userKeys } from "@/service/user/queries/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readAllUserNotifications } from "../api/read-all-user-notifications";

export const useReadAllUserNotifications = () => {
  const client = useQueryClient();
  
  return useMutation({
    mutationFn: readAllUserNotifications,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: userKeys.notificationCount() })
    }
  })
}