import { env } from "@/env";
import { SendResetPasswordInput } from "@/lib/schemas/reset-password";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";

export const forgotPassword = async (data: SendResetPasswordInput) => {
  const res = await fetch(env.APP_URL + "/auth/forgot-password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}