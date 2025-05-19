'use server'

import { LoginInput, loginSchema } from '@/lib/schemas/login';

type LoginFormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
}

export const loginAction = async (prevState: LoginFormState, payload: LoginInput): Promise<LoginFormState> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: Required<LoginFormState["fields"]> = {...payload};

    return { success: false, fields, errors };
  }

  if (parsed.data.email === "e@e.com") {
    return {
      success: false,
      errors: { error: ["The credentials provided are not recognized. Please check your username and password and try again"] },
      fields: parsed.data,
    };
  }

  return { success: true };
}