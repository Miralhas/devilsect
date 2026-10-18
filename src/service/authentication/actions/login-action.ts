'use server'

import { createSession, deleteSession } from "@/lib/sessions";
import { LoginResponse } from "@/types/authentication";

export const loginAction = async (data: LoginResponse) => {
  await createSession(data);
}

export const logoutAction = async () => {
  await deleteSession();
}