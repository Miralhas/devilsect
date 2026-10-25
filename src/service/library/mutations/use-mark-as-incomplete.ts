import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsIncomplete } from "../api/mark-as-incomplete";
import { libraryKeys } from "../queries/query-keys";

export const useMarkAsIncomplete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsIncomplete,
    onSettled: () => queryClient.invalidateQueries({ queryKey: libraryKeys.all }),
  })
}