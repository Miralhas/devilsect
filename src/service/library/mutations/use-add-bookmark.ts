import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookmark } from "../api/add-bookmark";
import { libraryKeys } from "../queries/query-keys";

export const useAddBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBookmark,
    onSettled: () => queryClient.invalidateQueries({ queryKey: libraryKeys.all }),
  })
}