import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Rating } from "@/types/rating";

const request = async (authState: AuthState, novelId: number) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/users/ratings/${novelId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }

  return await res.json() as Rating;
}

export const getUserRatingOnNovel = withAuth(request);