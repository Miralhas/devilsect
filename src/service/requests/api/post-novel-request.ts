import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";

const request = async (authState: AuthState, novelTitle: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/requests/novels`;

  const res = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ novelTitle })
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const postNovelRequest = withAuth(request);