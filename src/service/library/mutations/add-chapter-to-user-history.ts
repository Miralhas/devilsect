import { Chapter } from "@/types/chapter";
import { useMutation } from "@tanstack/react-query";
import { addChapterToUserHistory } from "../api/add-chapter-to-user-history";

export const useAddChapterToUserHistory = () => useMutation({
  mutationFn: (chapter: Chapter) => addChapterToUserHistory(chapter),
  onError: (error) => {
    console.log(`[useAddChapterToUserHistory] - Error when trying to add chapter to user history.': ${error}`);
  },
  retry: 2,
})