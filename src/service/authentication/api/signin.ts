import { env } from "@/env";
import { LoginInput } from "@/lib/schemas/login";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { LoginResponse } from "@/types/authentication";

export const signin = async (data: LoginInput): Promise<LoginResponse> => {
  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
  
  return await res.json() as LoginResponse;
}