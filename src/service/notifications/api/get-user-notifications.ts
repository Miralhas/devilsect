import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { NotificationUnion } from "@/types/notification";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const getUserNotifications = async (): Promise<NotificationUnion[]> => {
  const session = await getSession();

  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/users/notifications", {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user notifications");
  }

  return await res.json() as NotificationUnion[];
};