'server-only'

import { env } from "@/env";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { deleteSession, getSesstion } from "@/lib/sessions";
import { User } from "@/types/authentication";
import { cookies } from "next/headers";
import { logoutAction } from "./actions";

export const getCurrentUser = async (): Promise<User | undefined> => {
  const cookieStore = await cookies();
  await new Promise(resolve => setTimeout(resolve, 2000));
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  // return undefined if there is no current user
  if (!session) return undefined;

  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/users/validate", {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` }
  });

  if (!res.ok) {
    await deleteSession();
    return undefined;
  }

  return await res.json() as User;
}

export const getUserNotificationsCount = async () => {
  const session = await getSesstion();

  if (!session) {
    await logoutAction();
    return;
  };

  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/users/notifications/unread-count", {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` }
  });

  if (!res.ok) {
    await logoutAction();
    return;
  }

  const data = await res.json();
}