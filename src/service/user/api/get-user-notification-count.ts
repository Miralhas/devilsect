import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";

const request = async (authState: AuthState) => {
  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/users/notifications/unread-count", {
    method: "GET",
    headers: { "Authorization": `Bearer ${authState.accessToken}` },
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }

  return await res.json() as { count: number };
}

export const getUserNotificationCount = withAuth(request);