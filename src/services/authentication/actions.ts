'use server'

import { env } from '@/env';
import { LoginInput, loginSchema } from '@/lib/schemas/login';
import { createSession, deleteSession } from '@/lib/sessions';
import { ApiLoginResponse, ApiResponseError } from '@/types/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type LoginFormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
}

const DEFAULT_LOGIN_ERROR_MESSAGE = "Login Error! Try again."

export const loginAction = async (prevState: unknown, payload: LoginInput): Promise<LoginFormState> => {
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: Required<LoginFormState["fields"]> = { ...payload };
    return { success: false, fields, errors };
  }

  const res = await fetch(env.APP_URL + "/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    return {
      success: false,
      errors: { error: [data.detail ?? DEFAULT_LOGIN_ERROR_MESSAGE] },
      fields: parsed.data,
    };
  }

  const data: ApiLoginResponse = await res.json();

  await createSession(data);

  revalidatePath("/");
  redirect("/");
}

export const logoutAction = async () => {
  await deleteSession();
}