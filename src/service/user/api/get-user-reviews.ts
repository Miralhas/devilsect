import { env } from "@/env";
import { INVALID_SESSION_MESSAGE } from "@/lib/constants";
import { CommentParams, CommentParamsSchema } from "@/lib/schemas/comment-params-schema";
import { buildQueryString } from "@/lib/utils";
import { PaginatedQuery } from "@/types/pagination";
import { UserReview } from "@/types/threaded-comment";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getUserReviews = async (params: CommentParams, session?: RequestCookie): Promise<PaginatedQuery<UserReview[]>> => {
  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const parsed = CommentParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/users/reviews${queryString}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, { headers: myHeaders });

  if (!res.ok) {
    throw new Error("Failed to fetch user reviews")
  };

  return await res.json() as PaginatedQuery<UserReview[]>;
}