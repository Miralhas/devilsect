import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Vote } from "@/types/threaded-comment";

const request = async (authState: AuthState, vote: Vote, commentId: number) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/comments/${commentId}/vote`;

  const res = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ voteType: vote.type })
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }
}

export const postVote = withAuth(request)