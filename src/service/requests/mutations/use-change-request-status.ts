import { Action } from "@/types/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putRequestStatus } from "../api/put-request-status";
import { requestKeys } from "../queries/query-keys";

export const useChangeRequestStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ action, id }: { action: Action, id: number }) => putRequestStatus({ action, id }),
    onError: (error) => {
      console.error(`[useChangeRequestStatus] - Error when trying to change request status.': ${error}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: requestKeys.all });
    }
  })
}