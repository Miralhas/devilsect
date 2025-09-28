import { env } from "@/env";
import { deleteSession } from "@/lib/sessions";
import { UserInfo } from "@/types/authentication";
import { SESSION_COOKIE_NAME } from "@/utils/constants";
import { cookies } from "next/headers";

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
};