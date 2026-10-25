import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";

const request = async (authState: AuthState, notificationId: number) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/notifications/recipients/${notificationId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    const error: ApiResponseError = await res.json();
    throw new ApiError(error);
  }
}

export const removeUserFromRecipients = withAuth(request);