import { env } from "@/env";
import { ResetPasswordTokenInput } from "@/lib/schemas/reset-password";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";

export const resetPassword = async (data: ResetPasswordTokenInput) => {
  const res = await fetch(env.APP_URL + `/auth/reset-password/${data.token}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword: data.newPassword })
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}