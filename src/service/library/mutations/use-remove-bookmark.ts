import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBookmark } from "../api/remove-bookmark";
import { libraryKeys } from "../queries/query-keys";

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeBookmark,
    onSettled: () => queryClient.invalidateQueries({ queryKey: libraryKeys.all }),
  })
}