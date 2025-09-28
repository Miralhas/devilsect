'use server'

import { ApiError } from "@/service/api-error";
import { SimpleState } from "@/types/action-state";
import { capitalize } from "@/utils/string-utils";
import { putNovelLibraryComplete } from "../api/put-novel-library-complete";

const DEFAULT_ERROR_MESSAGE = "Failed to set novel as complete! Try again later."

export const setNovelLibraryCompleteAction = async (
  prevState: unknown, payload: { novelSlug: string, novelTitle: string }
): Promise<SimpleState> => {
  try {
    await putNovelLibraryComplete(payload.novelSlug);
  } catch (err) {
    if (err instanceof ApiError) {
      return { success: false, message: err.detail };
    }
    return { success: false, message: DEFAULT_ERROR_MESSAGE };
  }
  return { success: true, message: `Marked ${capitalize(payload.novelTitle)} as complete!` };
}