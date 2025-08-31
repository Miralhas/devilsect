'server-only'

import { env } from "@/env";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { decrypt, deleteSession } from "@/lib/sessions";
import { User, UserInfo } from "@/types/authentication";
import { cookies } from "next/headers";

export const getCurrentUser = async (): Promise<User | undefined> => {
  const cookieStore = await cookies();
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

// A shallow user is a user that didn't have it's cookie session verified by the stalkers api.   
export const getShallowUser = async (): Promise<User | undefined> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (!session) return undefined;

  return (await decrypt(session.value))?.user;
}


export const getCurrentUserInfo = async (): Promise<UserInfo | undefined> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  // return undefined if there is no current user
  if (!session) return undefined;

  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/users/info", {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` }
  });

  if (!res.ok) {
    await deleteSession();
    return undefined;
  }

  return await res.json() as UserInfo;
}