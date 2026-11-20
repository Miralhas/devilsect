import { getCurrentUser } from "@/lib/sessions";
import { DynamicProfileData, UserInfo } from "@/types/authentication";
import { getCurrentUserInfo } from "./get-current-user-info";
import { getCurrentUserInfoReadOnly } from "./get-current-user-info-read-only";

export const getDynamicProfile = async (username?: string): Promise<DynamicProfileData | undefined> => {
  const currentUser = await getCurrentUser();

  if (username) {
    const user = await getCurrentUserInfoReadOnly(username);
    if (!user) return undefined;
    return currentUser?.id === user.id
      ? { readOnly: false, user: user as UserInfo }
      : { readOnly: true, user };
  }

  const user = await getCurrentUserInfo();
  return user ? { readOnly: false, user } : undefined;
};