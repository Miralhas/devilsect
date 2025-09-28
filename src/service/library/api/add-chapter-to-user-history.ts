import { Chapter } from "@/types/chapter";

const UNAUTHORIZED_STATUS_CODE = 401;

export const addChapterToUserHistory = async (chapter: Chapter) => {
  const res = await fetch("/api/history", {
    method: 'PUT',
    body: JSON.stringify({ chapterId: chapter.id, novelId: chapter.novelId })
  });
  
  if (!res.ok && res.status != UNAUTHORIZED_STATUS_CODE) {
    throw new Error("Failed to update user history")
  }
}