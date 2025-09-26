'use server'

import { LoginInput, loginSchema } from "@/lib/schemas/login";
import { AuthenticationFormState } from "@/types/action-state";
import { redirect } from "next/navigation";
import { signin } from "../api/signin";
import { ApiError } from "@/service/api-error";
import { createSession } from "@/lib/sessions";

const DEFAULT_LOGIN_ERROR_MESSAGE = "Login Error! Try again";

export const loginAction = async (
  prevState: unknown, payload: LoginInput & { redirectUri?: string }
): Promise<AuthenticationFormState> => {
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: AuthenticationFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    const responseData = await signin(parsed.data);
    await createSession(responseData);
  } catch (err) {
    if (err instanceof ApiError) {
      const errors: AuthenticationFormState["errors"] = { error: err.detail, ...err.errors };
      return { errors, success: false, fields: parsed.data };
    };

    const errors: AuthenticationFormState["errors"] = { error: DEFAULT_LOGIN_ERROR_MESSAGE }
    return { errors, success: false, fields: parsed.data };
  }

  redirect(payload.redirectUri ?? "/");
}