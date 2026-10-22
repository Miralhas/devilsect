import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";

type Params = {
  commentId: number;
  novelSlug: string;
  chapterSlug: string;
};

const request = async (authState: AuthState, params: Params) => {
  const { chapterSlug, commentId, novelSlug } = params;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/chapters/${chapterSlug}/reviews/${commentId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const deleteChapterComment = withAuth(request);