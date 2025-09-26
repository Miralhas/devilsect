'use server'

import { SignupInput, signUpSchema } from "@/lib/schemas/signup";
import { AuthenticationFormState } from "@/types/action-state";
import { redirect } from "next/navigation";
import { signup } from "../api/signup";
import { ApiError } from "@/service/api-error";
import { loginAction } from "./login-action";
import { LoginInput } from "@/lib/schemas/login";

const DEFAULT_SIGNUP_ERROR_MESSAGE = "Signup Error! Try again";

export const signupAction = async (
  prevState: AuthenticationFormState, payload: SignupInput
): Promise<AuthenticationFormState> => {
  const parsed = signUpSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: AuthenticationFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    await signup(parsed.data);
    // Login action will try to redirect. Thats why it's needed to wrap inside a try catch block.
    try {
      await loginAction(undefined, { email: parsed.data.email, password: parsed.data.password } as LoginInput);
      // eslint-disable-next-line
    } catch (error) {}
  } catch (err) {
    if (err instanceof ApiError) {
      const errors: AuthenticationFormState["errors"] = { error: err.detail, ...err.errors };
      return { errors, success: false, fields: parsed.data };
    };

    const errors: AuthenticationFormState["errors"] = { error: DEFAULT_SIGNUP_ERROR_MESSAGE }
    return { errors, success: false, fields: parsed.data };
  }

  redirect("/");
}