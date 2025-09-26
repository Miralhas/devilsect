import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";

export const updateUserImage = async (userId: number, imageBlob: Blob) => {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized: Missing or invalid session");

  const formData = new FormData();
  formData.append("file", imageBlob);

  const res = await fetch(`${env.APP_URL}/users/${userId}/image`, {
    headers: { "Authorization": `Bearer ${session.value}` },
    body: formData,
    method: "PUT"
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}