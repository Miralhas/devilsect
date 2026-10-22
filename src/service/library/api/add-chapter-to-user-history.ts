import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Chapter } from "@/types/chapter";

const request = async (authState: AuthState, chapter: Chapter) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/library`;

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ chapterId: chapter.id, novelId: chapter.novelId }),
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const addChapterToUserHistory = withAuth(request);