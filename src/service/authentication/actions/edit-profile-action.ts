'use server'

import { EditProfileInput, editProfileSchema } from "@/lib/schemas/edit-profile-schema";
import { AuthenticationFormState } from "@/types/action-state";
import { revalidatePath } from "next/cache";
import { updateUser } from "../api/update-user";
import { ApiError } from "@/service/api-error";

const DEFAULT_EDIT_PROFILE_MESSAGE = "Failed to Edit Profile. Try again later";

export const editProfileAction = async (
  prevState: AuthenticationFormState, payload: EditProfileInput
): Promise<AuthenticationFormState> => {
  const parsed = editProfileSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error?.flatten().fieldErrors;
    const fields: AuthenticationFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    await updateUser(parsed.data);
  } catch (err) {
    if (err instanceof ApiError) {
      const errors: AuthenticationFormState["errors"] = { error: err.detail, ...err.errors };
      return { errors, success: false, fields: parsed.data };
    }
    const errors: AuthenticationFormState["errors"] = { error: [DEFAULT_EDIT_PROFILE_MESSAGE] }
    return { errors, success: false, fields: parsed.data };
  }

  revalidatePath("/profile")
  return { success: true, fields: parsed.data };
}