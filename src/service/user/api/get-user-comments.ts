import { env } from "@/env";
import { CommentParams, CommentParamsSchema } from "@/lib/schemas/comment-params-schema";
import { PaginatedQuery } from "@/types/pagination";
import { UserChapterComment } from "@/types/threaded-comment";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";
import { buildQueryString } from "@/utils/string-utils";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getUserComments = async (params: CommentParams, session?: RequestCookie): Promise<PaginatedQuery<UserChapterComment[]>> => {
  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const parsed = CommentParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/users/comments${queryString}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, { headers: myHeaders });

  if (!res.ok) {
    throw new Error("Failed to fetch user comments")
  };

  return await res.json() as PaginatedQuery<UserChapterComment[]>;
}