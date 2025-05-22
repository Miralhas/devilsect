'use server'

import { env } from '@/env';
import { LoginInput, loginSchema } from '@/lib/schemas/login';
import { SignupInput, signUpSchema } from '@/lib/schemas/signup';
import { createSession, deleteSession } from '@/lib/sessions';
import { ApiLoginResponse, ApiResponseError } from '@/types/api';
import { redirect } from 'next/navigation';

type AuthenticationFormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
}

const DEFAULT_LOGIN_ERROR_MESSAGE = "Login Error! Try again"
const DEFAULT_SIGNUP_ERROR_MESSAGE = "Signup Error! Try again"

export const loginAction = async (prevState: unknown, payload: LoginInput): Promise<AuthenticationFormState> => {
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: AuthenticationFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    const res = await fetch(env.APP_URL + "/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });

    if (!res.ok) {
      const data: ApiResponseError = await res.json();
      const errors: AuthenticationFormState["errors"] = { error: [data.detail ?? DEFAULT_LOGIN_ERROR_MESSAGE] };
      if (data?.errors?.password) errors["password"] = [data.errors?.password];
      if (data?.errors?.email) errors["email"] = [data.errors?.email];
      return {
        errors,
        success: false,
        fields: parsed.data,
      };
    }

    const data: ApiLoginResponse = await res.json();

    await createSession(data);
    
  } catch (err) {
    console.log(err)
    const errors: AuthenticationFormState["errors"] = { error: [DEFAULT_LOGIN_ERROR_MESSAGE] }
    return {
      errors,
      success: false,
      fields: parsed.data,
    };
  }

  redirect("/");
}

export const signupAction = async (prevState: AuthenticationFormState, payload: SignupInput): Promise<AuthenticationFormState> => {
  const parsed = signUpSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: AuthenticationFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    const res = await fetch(env.APP_URL + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });

    if (!res.ok) {
      const data: ApiResponseError = await res.json();
      const errors: AuthenticationFormState["errors"] = { error: [data.detail ?? DEFAULT_SIGNUP_ERROR_MESSAGE] };
      if (data?.errors?.email) errors["email"] = [data.errors?.email];
      if (data?.errors?.password) errors["password"] = [data.errors?.password];
      if (data?.errors?.username) errors["username"] = [data.errors?.username];
      return { errors, success: false, fields: parsed.data };
    }

    // Login action will try to redirect. Thats why it's needed to wrap inside a try catch block.
    try {
      await loginAction(undefined, { email: parsed.data.email, password: parsed.data.password } as LoginInput);
    // eslint-disable-next-line
    } catch (error) {
    }

  } catch (error) {
    console.log(error);
    const errors: AuthenticationFormState["errors"] = { error: [DEFAULT_SIGNUP_ERROR_MESSAGE] }
    return { errors, success: false, fields: parsed.data };
  }

  redirect("/");
}

export const logoutAction = async () => {
  await deleteSession();
}