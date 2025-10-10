'use server'

import { ApiError } from "@/service/api-error";
import { SimpleState } from "@/types/action-state";
import { removeUserFromRecipients } from "../api/remove-user-from-reicipents";
import { revalidatePath } from "next/cache";

const DEFAULT_NOTIFICATION_ERROR_MESSAGE = "Failed to remove notification.";

export const deleteNotificationAction = async (prevState: unknown, payload: number): Promise<SimpleState> => {
  try {
    await removeUserFromRecipients(payload);
    revalidatePath("/profile/inbox")
    return { message: "Notification removed!", success: true };
  } catch (err) {
    if (err instanceof ApiError) {
      return { message: err.detail, success: true };
    }
    return { message: DEFAULT_NOTIFICATION_ERROR_MESSAGE, success: true };
  }
}