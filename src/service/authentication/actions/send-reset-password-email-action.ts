'use server'

import { sendResetPasswordEmailSchema, SendResetPasswordInput } from "@/lib/schemas/reset-password";
import { ApiError } from "@/service/api-error";
import { AuthenticationFormState } from "@/types/action-state";
import { forgotPassword } from "../api/forgot-password";

const DEFAULT_RESET_PASSWORD_ERROR_MESSAGE = "Reset Password Error! Try again later";

export const sendResetPasswordEmailAction = async (
  prevState: AuthenticationFormState, payload: SendResetPasswordInput
): Promise<AuthenticationFormState> => {
  const parsed = sendResetPasswordEmailSchema.safeParse(payload)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: AuthenticationFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    await forgotPassword(parsed.data);
    return { success: true, fields: parsed.data };
  } catch (err) {
    if (err instanceof ApiError) {
      const errors: AuthenticationFormState["errors"] = { error: err.detail, ...err.errors };
      return { errors, success: false, fields: parsed.data };
    };

    const errors: AuthenticationFormState["errors"] = { error: [DEFAULT_RESET_PASSWORD_ERROR_MESSAGE] }
    return { errors, success: false, fields: parsed.data };
  }
}