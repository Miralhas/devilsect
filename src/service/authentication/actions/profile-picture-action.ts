'use server'

import { ApiError } from "@/service/api-error";
import { SimpleState } from "@/types/action-state";
import { updateUserImage } from "../api/update-user-image";

const DEFAULT_EDIT_PROFILE_IMAGE = "Failed to Edit Profile. Try again later";

export const editProfilePictureAction = async (
  prevState: unknown, payload: { imageBlob: Blob, userId: number }
): Promise<SimpleState> => {
  try {
    await updateUserImage(payload.userId, payload.imageBlob);
    return { success: true, message: new Date().getTime().toString() };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, message: error.detail };
    }
    return { success: false, message: DEFAULT_EDIT_PROFILE_IMAGE };
  }
}