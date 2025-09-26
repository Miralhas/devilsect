import { env } from "@/env";
import { LoginInput } from "@/lib/schemas/login";
import { ApiError } from "@/service/api-error";
import { ApiLoginResponse, ApiResponseError } from "@/types/api";

export const signin = async (data: LoginInput): Promise<ApiLoginResponse> => {
  const res = await fetch(env.APP_URL + "/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json() as ApiLoginResponse;
}