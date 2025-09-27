'use server'

import { capitalize } from "@/lib/utils";
import { ApiError } from "@/service/api-error";
import { SimpleState } from "@/types/action-state";
import { deleteNovelLibraryBookmark } from "../api/delete-novel-library-bookmark";

const DEFAULT_ERROR_MESSAGE = "Failed to bookmark novel! Try again later.";

export const removeNovelBookmarkAction = async (
  prevState: unknown, payload: { novelTitle: string, libraryId: number }
): Promise<SimpleState> => {
  try {
    await deleteNovelLibraryBookmark(payload.libraryId);
  } catch (err) {
    if (err instanceof ApiError) {
      return { success: false, message: err.detail };
    }
    return { success: false, message: DEFAULT_ERROR_MESSAGE };
  }
  return { success: true, message: `Removed ${capitalize(payload.novelTitle)} from bookmarks!` };
}
