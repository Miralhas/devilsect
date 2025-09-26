import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { decrypt } from "@/lib/sessions";
import { User } from "@/types/authentication";
import { cookies } from "next/headers";

// A shallow user is a user that didn't have it's cookie session verified by the stalkers api.   
export const getShallowUser = async (): Promise<User | undefined> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (!session) return undefined;

  return (await decrypt(session.value))?.user;
}