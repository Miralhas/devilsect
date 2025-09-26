import { env } from "@/env";
import { SignupInput } from "@/lib/schemas/signup";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";

export const signup = async (data: SignupInput) => {
  const res = await fetch(env.APP_URL + "/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}