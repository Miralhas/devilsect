import { Chapter } from "@/types/chapter";
import { useMutation } from "@tanstack/react-query";

const UNAUTHORIZED_STATUS_CODE = 401;

export const useAddChapterToUserHistoryMutation = () => useMutation({
  mutationFn: async ({ chapter }: { chapter: Chapter }) => {
    const res = await fetch("/api/history", {
      method: 'PUT',
      body: JSON.stringify({ chapterId: chapter.id, novelId: chapter.novelId })
    });
    if (!res.ok && res.status != UNAUTHORIZED_STATUS_CODE) throw new Error("Failed to update user history");
  },
  onError: (error) => {
    console.log(`[useAddChapterToUserHistory] - Error when trying to add chapter to user history.': ${error}`);
  },
  retry: 2,
})