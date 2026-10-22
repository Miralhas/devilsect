import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";

const request = async (authState: AuthState) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/notifications/recipients/read`

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const readAllUserNotifications = withAuth(request);