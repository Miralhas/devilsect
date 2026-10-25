import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { AuthState } from "@/types/authentication";

const request = async (authState: AuthState, libraryId: number) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/library/bookmark/${libraryId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data: ApiError = await res.json();
    throw new ApiError(data);
  }
}

export const removeBookmark = withAuth(request);