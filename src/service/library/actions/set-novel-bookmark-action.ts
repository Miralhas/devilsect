'use server'

import { ApiError } from "@/service/api-error";
import { SimpleState } from "@/types/action-state";
import { capitalize } from "@/utils/string-utils";
import { putNovelLibraryBookmark } from "../api/put-novel-library-bookmark";

const DEFAULT_ERROR_MESSAGE = "Failed to bookmark novel! Try again later."

export const setNovelBookmarkAction = async (
  prevState: unknown, payload: { novelTitle: string; novelSlug: string; }
): Promise<SimpleState> => {
  try {
    await putNovelLibraryBookmark(payload.novelSlug);
  } catch (err) {
    if (err instanceof ApiError) {
      return { success: false, message: err.detail };
    }
    return { success: false, message: DEFAULT_ERROR_MESSAGE };
  }

  return { success: true, message: `Saved ${capitalize(payload.novelTitle)} to bookmarks!` };
}