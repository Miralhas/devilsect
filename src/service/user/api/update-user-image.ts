import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
const request = async (authState: AuthState, userId: number, formData: FormData) => {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/users/${userId}/image`, {
    headers: { "Authorization": `Bearer ${authState.accessToken}` },
    body: formData,
    method: "PUT"
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}

export const updateUserImage = withAuth(request);