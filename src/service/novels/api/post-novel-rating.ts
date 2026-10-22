import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Novel } from "@/types/novel";

type Args = {
  novel: Novel;
  ratingValue: number;
};

const request = async (authState: AuthState, args: Args) => {
  const { novel, ratingValue } = args;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/metrics/${novel.slug}/rating`;

  const res = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ ratingValue })
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const postNovelRating = withAuth(request);