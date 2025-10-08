import { Chapter } from "@/types/chapter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChapterToUserHistory } from "../api/add-chapter-to-user-history";
import { libraryKeys } from "../queries/query-keys";

export const useAddChapterToUserHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chapter: Chapter) => addChapterToUserHistory(chapter),
    onError: (error) => {
      console.log(`[useAddChapterToUserHistory] - Error when trying to add chapter to user history.': ${error}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...libraryKeys.all] })
    },
    retry: 2,
  })
}