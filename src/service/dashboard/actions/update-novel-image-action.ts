'use server'

import { ApiError } from "@/service/api-error";
import { SimpleState } from "@/types/action-state";
import { Novel } from "@/types/novel";
import { updateNovelImage } from "../api/update-novel-image";

const DEFAULT_EDIT_NOVEL_IMAGE_MESSAGE = "Failed to Edit Novel Image. Try again later";

export const updateNovelImageAction = async (
  novel: Novel, prevState: unknown, payload: { formData: FormData }
): Promise<SimpleState> => {
  try {
    await updateNovelImage(novel, payload.formData)
  } catch (err) {
    if (err instanceof ApiError) {
      return { success: false, message: err.detail };
    }
    return { success: false, message: DEFAULT_EDIT_NOVEL_IMAGE_MESSAGE };
  }
  return { success: true, message: "Success!" };
}
