import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsComplete } from "../api/mark-as-complete";
import { libraryKeys } from "../queries/query-keys";

export const useMarkAsComplete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsComplete,
    onSettled: () => queryClient.invalidateQueries({ queryKey: libraryKeys.all }),
  })
}