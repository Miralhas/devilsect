'use server'

import { ApiError } from "@/service/api-error";
import { SimpleState } from "@/types/action-state";
import { capitalize } from "@/utils/string-utils";
import { deleteNovelLibraryComplete } from "../api/delete-novel-library-complete";

const DEFAULT_ERROR_MESSAGE = "Failed to remove novel as completed! Try again later."

export const removeNovelLibraryCompleteAction = async (
  prevState: unknown, payload: { novelTitle: string, libraryId: number }
): Promise<SimpleState> => {
  try {
    await deleteNovelLibraryComplete(payload.libraryId);
  } catch (err) {
    if (err instanceof ApiError) {
      return { success: false, message: err.detail };
    }
    return { success: false, message: DEFAULT_ERROR_MESSAGE };
  }
  return { success: true, message: `Marked ${capitalize(payload.novelTitle)} as incomplete!` };
}