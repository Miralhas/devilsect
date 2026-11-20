import { env } from "@/env";
import { deleteSession } from "@/lib/sessions";
import { UserInfo, UserInfoReadOnly } from "@/types/authentication";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const getCurrentUserInfoReadOnly = async (username: string): Promise<UserInfoReadOnly | undefined> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);

  if (!session) return undefined;

  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + `/users/${username}/info`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` }
  });

  if (!res.ok) {
    notFound();
  }

  return await res.json() as UserInfo;
};