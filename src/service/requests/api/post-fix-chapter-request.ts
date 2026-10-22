import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";

type Args = {
  novelSlug: string;
  chapterSlug: string;
  errors: string[];
};

const request = async (authState: AuthState, args: Args) => {
  const { chapterSlug, errors, novelSlug } = args;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/requests/novels/${novelSlug}/${chapterSlug}`;

  const res = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ errors })
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const postFixChapterRequest = withAuth(request)