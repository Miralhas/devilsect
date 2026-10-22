import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { CommentInput } from "@/types/threaded-comment";

type Params = {
  novelSlug: string;
  chapterSlug: string;
  commentInput: CommentInput;
};

const request = async (authState: AuthState, params: Params) => {
  const { chapterSlug, commentInput, novelSlug } = params;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/chapters/${chapterSlug}/reviews`;

  const res = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(commentInput)
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const postChapterComment = withAuth(request)