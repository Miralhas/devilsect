'use server'

import { ResetPasswordTokenInput, resetPasswordTokenSchema } from "@/lib/schemas/reset-password";
import { AuthenticationFormState } from "@/types/action-state";
import { resetPassword } from "../api/reset-password";
import { ApiError } from "@/service/api-error";

const DEFAULT_RESET_PASSWORD_ERROR_MESSAGE = "Reset Password Error! Try again later";
const DEFAULT_INVALID_RESET_PASSWORD_TOKEN = "Invalid verification token";

export const resetPasswordAction = async (
  prevState: AuthenticationFormState, payload: ResetPasswordTokenInput
): Promise<AuthenticationFormState> => {
  const parsed = resetPasswordTokenSchema.safeParse(payload)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: AuthenticationFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    await resetPassword(parsed.data);
    return { success: true, fields: parsed.data };
  } catch (err) {
    if (err instanceof ApiError) {
      const errors: AuthenticationFormState["errors"] = { error: DEFAULT_RESET_PASSWORD_ERROR_MESSAGE, ...err.errors };
      if (err.status === 404) errors["error"] = [DEFAULT_INVALID_RESET_PASSWORD_TOKEN];
      return { errors, success: false, fields: parsed.data };
    }
    const errors: AuthenticationFormState["errors"] = { error: [DEFAULT_RESET_PASSWORD_ERROR_MESSAGE] }
    return { errors, success: false, fields: parsed.data };
  }
}