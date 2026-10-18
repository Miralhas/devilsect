import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { LoginResponse } from "@/types/authentication";

export const refreshTokenRequest = async (token: string): Promise<LoginResponse> => {
  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: token }),
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json() as LoginResponse;
}