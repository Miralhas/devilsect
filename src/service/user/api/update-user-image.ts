import { env } from "@/env";
import { getAccessToken } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";

export const updateUserImage = async (userId: number, formData: FormData) => {
  const session = await getAccessToken();
  if (!session) throw new Error("Unauthorized: Missing or invalid session");

  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/users/${userId}/image`, {
    headers: { "Authorization": `Bearer ${session.value}` },
    body: formData,
    method: "PUT"
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}