import { env } from "@/env";
import { ChapterCommentParams, CommentParams, CommentParamsSchema, NovelReviewParams } from "@/lib/schemas/comment-params-schema";
import { buildQueryString } from "@/lib/utils";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment, UserChapterComment, UserReview } from "@/types/threaded-comment";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getChapterComments = async (params: ChapterCommentParams): Promise<PaginatedQuery<ThreadedComment[]>> => {
  const parsed = CommentParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${params.novelSlug}/chapters/${params.chapterSlug}/reviews${queryString}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch novel reviews");
  return await res.json() as PaginatedQuery<ThreadedComment[]>;
}

export const getNovelReviews = async (params: NovelReviewParams): Promise<PaginatedQuery<ThreadedComment[]>> => {
  const parsed = CommentParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${params.novelSlug}/reviews${queryString}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch novel reviews");
  return await res.json() as PaginatedQuery<ThreadedComment[]>;
}

export const getUserReviews = async (params: CommentParams, session?: RequestCookie): Promise<PaginatedQuery<UserReview[]>> => {
  if (!session) throw new Error("Unauthorized: Missing or invalid session");
  
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

export const getUserComments = async (params: CommentParams, session?: RequestCookie): Promise<PaginatedQuery<UserChapterComment[]>> => {
  if (!session) throw new Error("Unauthorized: Missing or invalid session");

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