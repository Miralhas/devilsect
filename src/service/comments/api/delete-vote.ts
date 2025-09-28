import { env } from "@/env";
import { getSession } from "@/lib/sessions";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const deleteVote = async (commentId: number) => {
  const session = (await getSession())?.value;
  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/comments/${commentId}/vote`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    const error = await res.json() as ApiResponseError;
    throw new ApiError(error);
  }
}