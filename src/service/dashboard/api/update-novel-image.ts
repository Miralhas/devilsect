import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { Novel } from "@/types/novel";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const updateNovelImage = async (novel:Novel,imageBlob: Blob) => {
  const session = await getSession();
  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const formData = new FormData();
  formData.append("file", imageBlob);

  const res = await fetch(`${env.APP_URL}/novels/${novel.slug}/image`, {
    headers: { "Authorization": `Bearer ${session.value}` },
    body: formData,
    method: "PUT"
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }
}